class TargetActionsController < ApplicationController
  before_filter :find_target
  
  def index
    @actions = @target.actions.all
    
  end
  
  def show
    @action = @target.actions.find(params[:id])
  end
  
  def new
     @action = @target.actions.build

   end
   
   def create
     @action = @target.actions.build(params[:action])
     @action.metadata = Metadata.find_by_name("hour")
     @action.user_id = session[:user_id]
     
     @last = @target.actions.order("id desc").first
     if(@last != nil && @last.sequence_no != nil)
       @action.sequence_no = @last.sequence_no + 1
     else
       @action.sequence_no = 1
     end

     if @action.save
       redirect_to target_actions_url(@target)
     else
       render :action => :new
     end

   end
   
   def destroy
     @action = @target.actions.find(params[:id])
     @action.destroy

     redirect_to target_actions_url(@target)
   end
   
   protected

   def find_target
     @target = Target.find(params[:target_id])
   end
end
