class Target < ActiveRecord::Base
  belongs_to :category
  belongs_to :user
  has_many :activities
  belongs_to :metadata
  
  
end
