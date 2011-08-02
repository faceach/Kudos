class Target < ActiveRecord::Base
  belongs_to :category
  belongs_to :user
  has_many :activities
  belongs_to :metadata
  
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
  
end
