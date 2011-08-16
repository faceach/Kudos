class Target < ActiveRecord::Base
  belongs_to :category
  belongs_to :user
  has_many :activities, :dependent => :destroy
  belongs_to :metadata
  validates_numericality_of :target_count, :only_integer => true, :greater_than => 0  
  
  def Target.calPer(target)
    
    if target.activities != nil
      @total_count = 0.0
      
      target.activities.each do |activity|
        if activity.metadata.name == "hour"
          @total_count += activity.count
        elsif activity.metadata.name == "minute"
          @total_count += activity.count / 60.0 
        else
          @total_count += 0
        end
      end
      return format("%.7f", @total_count / target.target_count).to_f 
    end
    
    return 0.0
      
  end
  
  def as_json(options={})
    super(:only => [:target_count, :status], :include => { :category => { :only => :name }, :metadata => {:only => :name} })
  end
  
end
