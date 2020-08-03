Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'

  resources :users do
    resources :videos
  end

    resources :videos do
      resources :comments
    end

    get '*other', to: 'static#index'
end
