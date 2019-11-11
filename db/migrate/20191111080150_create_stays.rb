class CreateStays < ActiveRecord::Migration[5.2]
  def change
    create_table :stays do |t|
      t.integer :user_id,    nil: false, foreign_key: true
      t.integer :person,    nil: false
      t.integer :stay_days,  nil: false
      t.timestamps
    end
  end
end
