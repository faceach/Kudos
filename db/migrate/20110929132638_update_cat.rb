class UpdateCat < ActiveRecord::Migration
  def self.up
    alter_table :categories do |t|
      t.string :image
      t.string :desc
    end
  end

  def self.down
    #drop_table :categories
  end
end