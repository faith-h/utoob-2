class User < ActiveRecord::Base
  extend Devise::Models
  
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  include DeviseTokenAuth::Concerns::User

  has_many :videos, dependent: :destroy

end
