class AddGenderGorUser < ActiveRecord::Migration
  def up
    alter_table :users do |t|
      t.string :gender
    end
  end

  def down
  end
end
