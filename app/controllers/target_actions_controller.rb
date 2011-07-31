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
     #@activity = @target.activities.build(params[:activity])
     @activity = Activity.new
     @activity.target = @target
     @activity.count = params[:count]
     @activity.metadata = Metadata.find_by_name("minitue")
     @activity.user_id = session[:user_id]
     
     @last = @target.activities.last
     if(@last != nil && @last.sequence_no != nil)
       @activity.sequence_no = @last.sequence_no + 1
     else
       @activity.sequence_no = 1
     end
     
     respond_to do |format|
       format.json do
         if @activity.save
           render :json => {result: "success"}
           #render :json => @activity.to_json
         else
           render :json => {result: "fail"}
         end
       end
       format.html do
         if @activity.save
           redirect_to target_activities_url(@target)
         else
           render :action => :new
         end
       end
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
