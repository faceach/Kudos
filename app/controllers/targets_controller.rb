class TargetsController < ApplicationController
  
  before_filter :find_user, :only => [ :index, :show, :create]
  
  def index 
    @targets = @user.targets.all
    
  end
  
  def new
    @target = Target.new()
    
  end
  
  def show
     @targets = @user.targets.all
    
  end
  
  
  def create
    @target = Target.new(params[:target])
    @target.category = Category.find_by_name("running")
    @target.metadata = Metadata.find_by_name("hour")
    @target.user_id = session[:user_id]
    @target.status = "active"
    @last = @user.targets.last
    
    if(@last != nil && @last.sequence_no != nil)
      @target.sequence_no = @last.sequence_no + 1
    else
      @target.sequence_no = 1
    end
    
    if @target.save
      redirect_to targets_url
    else
      render :action => :new
    end
    
  end
  
  def destroy
    @target = Target.find(params[:id])
    @target.destroy

    redirect_to targets_url
  end
  
  protected

  def find_user
    @user = User.find(session[:user_id])
  end
  
end
