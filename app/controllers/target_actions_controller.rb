class TargetActionsController < ApplicationController
  before_filter :find_target
  before_filter :find_user_id, :only => [:create]
  
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
     @activity.metadata = Metadata.find_by_name("minute")
     @activity.user_id = find_user_id
     
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

   def find_user_id
     respond_to do |format|
       format.json do
         @user_id = params[:user_id]
       end
       format.html do
         @user_id = session[:user_id]
       end
     end
   end
end
