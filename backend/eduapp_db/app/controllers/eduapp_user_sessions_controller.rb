class EduappUserSessionsController < ApplicationController
  before_action :set_eduapp_user_session, only: [:show, :update, :destroy]
  before_action :authenticate_user!
  before_action :check_role!

  # GET /eduapp_user_sessions
  def index
    if params[:subject_id]
      @eduapp_user_sessions = EduappUserSession.where(subject_id: params[:subject_id])
    else
      @eduapp_user_sessions = EduappUserSession.all
    end

    render json: @eduapp_user_sessions
  end

  # GET /eduapp_user_sessions/1
  def show
    render json: @eduapp_user_session
  end

  # POST /eduapp_user_sessions
  def create
    @eduapp_user_session = EduappUserSession.new(eduapp_user_session_params)
    if @eduapp_user_session.save
      render json: @eduapp_user_session, status: :created, location: @eduapp_user_session
    else
      render json: @eduapp_user_session.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /eduapp_user_sessions/1
  def update
    if @eduapp_user_session.update(eduapp_user_session_params)
      render json: @eduapp_user_session
    else
      render json: @eduapp_user_session.errors, status: :unprocessable_entity
    end
  end

  # DELETE /eduapp_user_sessions/1
  def destroy
    @eduapp_user_session.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_eduapp_user_session
    @eduapp_user_session = EduappUserSession.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def eduapp_user_session_params
    params.require(:eduapp_user_session).permit(:session_name, :session_start_date, :session_end_date, :streaming_platform, :resources_platform, :session_chat_id, :subject_id)
  end
end
