Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'main#index'

  get '/api/tasks', to: 'api#index'

  put '/api/task/:id', to: 'api#update'

  post '/api/tasks', to: 'api#create'
end
