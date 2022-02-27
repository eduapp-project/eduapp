class ResourcesController < ApplicationController
  before_action :set_resource, only: [:show , :update, :destroy]

  # GET /resources
  def index
		if !params[:course_id]
			@resources = Resource.all
		else
			@resources = Resource.order(created_at: :desc).where(course_id: params[:course_id])
		end

    render json: @resources
  end

  # GET /resources/1
  def show
    render json: @resource
  end

  # POST /resources
  def create
    @resource = Resource.new(resource_params)

    if @resource.save
      render json: @resource, status: :created, location: @resource
    else
      render json: @resource.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /resources/1
  def update
    if @resource.update(resource_params)
      render json: @resource
    else
      render json: @resource.errors, status: :unprocessable_entity
    end
  end

  # DELETE /resources/1
  def destroy
    @resource.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_resource
      @resource = Resource.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def resource_params
      params.permit(:name, :description, :firstfile , :secondfile , :thirdfile , :createdBy , :course_id)
    end
end