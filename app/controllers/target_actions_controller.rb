class TargetActionsController < ApplicationController
  before_filter :find_target
  
  def index
    @activities = @target.activities.all
    
  end
  
  def show
    @activity = @target.activities.find(params[:id])
  end
  
  def new
     @activity = @target.activities.build

   end
   
   def create
     @activity = @target.activities.build(params[:activity])
     @activity.metadata = Metadata.find_by_name("hour")
     @activity.user_id = session[:user_id]
     
     @last = @target.activities.order("id desc").first
     if(@last != nil && @last.sequence_no != nil)
       @activity.sequence_no = @last.sequence_no + 1
     else
       @activity.sequence_no = 1
     end

     if @activity.save
       redirect_to target_activities_url(@target)
     else
       render :action => :new
     end

   end
   
   def destroy
     @activity = @target.activities.find(params[:id])
     @activity.destroy

     redirect_to target_activities_url(@target)
   end
   
   protected

   def find_target
     @target = Target.find(params[:target_id])
   end
end
