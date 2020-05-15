class CreateTasks < ActiveRecord::Migration[5.1]
  def change
    create_table :tasks do |t|
      t.string :title
      t.boolean :completed
      t.references :project, foreign_key: true, null: false

      t.timestamps
    end
  end
end
