class ApiController < ApplicationController
    def index
        @tasks = Task.all
        render json: @tasks
    end

    def update
        @task = Task.find(params[:id])
        @task.completed = !@task.completed
        @task.save
        render json: @task
    end

    def create
        @project = Project.find_by(title: params[:project])
        @task = @project.tasks.create(:title => params[:title], :completed => false)
        render json: @task
    end
end
