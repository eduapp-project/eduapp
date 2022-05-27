class UserRolesController < ApplicationController
  before_action :set_user_role, only: [:show, :update, :destroy]
  before_action :authenticate_user!
  before_action :check_role!

  # GET /user_roles
  def index
    if params[:role_name]
      if !check_perms_query!(get_user_roles.perms_roles)
        return
      end
      @user_roles = UserRole.where(name: params[:role_name])
    elsif params[:user_id]
      if !check_perms_query_self!(get_user_roles.perms_roles, params[:user_id])
        return
      end
      @user_roles = UserRole.find(UserInfo.where(user_id: params[:user_id]).first.user_roles_id)
    else
      if !check_perms_all!(get_user_roles.perms_roles)
        return
      end
      @user_roles = UserRole.all
    end

    if params[:page]
      @user_roles = query_paginate(@user_roles, params[:page])
    end

    render json: @user_roles
  end

  # GET /user_roles/1
  def show
    if !check_perms_query!(get_user_roles.perms_roles)
      return
    end
    render json: @user_role
  end

  # POST /user_roles
  def create
    if !check_perms_write!(get_user_roles.perms_roles)
      return
    end
    @user_role = UserRole.new(user_role_params)

    if @user_role.save
      render json: @user_role, status: :created, location: @user_role
    else
      render json: @user_role.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /user_roles/1
  def update
    if !check_perms_update!(get_user_roles.perms_roles, false, :null)
      return
    end

    if @user_role.update(user_role_params)
      render json: @user_role
    else
      render json: @user_role.errors, status: :unprocessable_entity
    end
  end

  # DELETE /user_roles/1
  def destroy
    if !check_perms_delete!(get_user_roles.perms_roles, false, :null)
      return
    end
    @user_role.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_user_role
    @user_role = UserRole.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def user_role_params
    params.require(:user_role).permit(:name, :description, :perms_institution, :perms_course, :perms_subjects, :perms_resources, :perms_sessions, :perms_events, :perms_teachers, :perms_users, :perms_roles, :perms_tuitions, :perms_jti_matchlist, :perms_chat, :perms_chat_participants, :perms_message, :perms_app_views)
  end
end
