class AddUserImageToComments < ActiveRecord::Migration[6.0]
  def change
    add_column :comments, :user_image, :string
  end
end
