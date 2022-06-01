class Users::PasswordsController < Devise::PasswordsController
  # When the auth is implemented use this
  # before_action :authenticate_user! , only: [:get_reset_password_token,:do_reset_password]


  # Function to send confirmation code to user
  def send_change_password_instructions
    old_password = params[:old_password]
    @user = User.find_by(email: params[:email])
    # When the auth is implemented use this
    # @user = current_user
    if @user.present?
      if @user.valid_password?(old_password)
        PasswordMailer.with(user: @user).send_confirmation_email.deliver_now
        render json: {status: 'success' , message: 'email sent to '+ @user.email}
      else
        render json: {status: 'failure', message: 'Invalid old password'}
      end
    else
      render json: {status: 'failure', message: 'User not found'}
    end

  end

  # Function to change password using confirmation code
  def change_password
    # Use below when the auth is implemented
    # user = current_user
    # Instead use this, but you should pass the user email in the params
    user = User.find_by(email: params[:email])
    new_password = params[:new_password]
    confirm_password = params[:confirm_password]
    confirmation_code = params[:confirmation_code]
    if user.present?
      if new_password == confirm_password && user.confirmation_code == confirmation_code
        if user.confirmation_code_exp_time > DateTime.now
          user.password = new_password
          user.save
          render json: {status: "success" ,message: "Password changed successfully." }
        else
          render json: {status: "failure", message: "Expired code" }
        end
      else
        render json: { message: "Password change failed." }, status: :unprocessable_entity
      end
    else
      render json: { message: "User not found." }, status: :unprocessable_entity
    end
  end

  def do_reset_password
    user = User.find_by(email: params[:email]);
    if user.reset_password_token == params[:token]
      user.reset_password(params[:password],params[:password_confirmation])
      render json: {status: 'success', message: 'Password changed successfully.'}
    else
      render json: {status: 'failure', message: 'Invalid token'}
    end
  end

  def send_reset_password_link
    user = User.find_by(email: params[:email])
    if user.present?
      user.send(:set_reset_password_token) 
      user.save
      @token = user.reset_password_token
      if @token.present?
        PasswordMailer.with(user: user).send_reset_email.deliver_now
        render json: {message: 'email sent to '+ user.email,status: 'success', expires_in: 15.minutes.from_now}
      else
        render json: {message: 'email not sent',status: 'failure, no token'}
      end
    else
      render json: {status: 'failure', message: 'User not found'}
    end
  end

end
