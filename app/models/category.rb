class Category < ActiveRecord::Base
  validates_uniqueness_of :name
  has_many :targets
  #attr_accessor :targetList
  
  def self.loadRunning()
    category = Category.find_by_
  end
  
  def as_json(options={})
    super(:only => [:id, :desc, :image, :name])
  end
  
  #def as_json(options={})
  #  super(:only => [:id, :desc, :image, :name], :include => { :target => { :only => :target_count }})
  #end
  
end
