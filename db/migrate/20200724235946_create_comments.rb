class CreateComments < ActiveRecord::Migration[6.0]
  def change
    create_table :comments do |t|
      t.string :body
      t.integer :user_id
      t.string :user_name
      t.belongs_to :video, null: false, foreign_key: true

      t.timestamps
    end
  end
end
