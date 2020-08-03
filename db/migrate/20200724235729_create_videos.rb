class CreateVideos < ActiveRecord::Migration[6.0]
  def change
    create_table :videos do |t|
      t.string :title
      t.string :desc
      t.string :trailer
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
