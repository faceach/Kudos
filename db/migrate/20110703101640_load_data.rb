class LoadData < ActiveRecord::Migration
  def self.up
    metadataHour = Metadata.find_by_name("hour")
    metadataMin = Metadata.find_by_name("minute")
    cateNew = Category.find_by_name("running")
    
    if metadataHour == nil
      metadataHour = Metadata.new
      metadataHour.name = "hour"
      metadataHour.data_type = 1
      metadataHour.save
    end
    
    if metadataMin == nil
      metadataMin = Metadata.new
      metadataMin.name = "minute"
      metadataMin.data_type = 1
      metadataMin.save
    end
      
    if cateNew == nil
      cateNew = Category.new
      cateNew.name = "running"
      cateNew.save
    end
    
  end

  def self.down
  end
end
