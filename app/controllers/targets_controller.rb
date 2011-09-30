class TargetsController < ApplicationController
  
  before_filter :find_user_id, :only => [:create, :index]
  
  def index 
    @user = User.find_by_id(@user_id)
    respond_to do |format|
      format.json do
        if @user
          #@targets = @user.targets.all
          @targets = Target.includes(:metadata, :category).find_all_by_user_id(@user_id)
          @categories = []
          for target in @targets
            @category = target.category
            if !@categories.include?(target.category)
              @categories << @category
            end
            @category.targets << target
          end
          
          if @targets
            render :json => {:result => "success", :detail =>@targets}
          else
            render :json => {:result => "fail"}
          end
        else
          render :json => {:result => "fail"}
        end
      end
      format.html do
        @targets = @user.targets.all
        render :action => :index
       end
    end
    
  end
  
  def new
    @target = Target.new()
    
  end
  
  def show
     @targets = @user.targets.all
    
  end
  
  
  def create
    @target = Target.new(params[:target])
    #@target.category = Category.find_by_name("running")
    @target.metadata = Metadata.find_by_name("hour")
    @target.user_id = @user_id
    @target.status = "active"
    @user = User.find_by_id(@user_id)
    if @user == nil
      render :json => {:result => "fail",:msg => @user_id + "can not find login user"}
      return
    end
    @last = @user.targets.last
    
    if(@last != nil && @last.sequence_no != nil)
      @target.sequence_no = @last.sequence_no + 1
    else
      @target.sequence_no = 1
    end
    
    if @target.save
      respond_to do |format|
        format.json do
          render :json => {:result => "success", :target =>@target}
        end
      end
    else
      respond_to do |format|
        format.json do
          render :json => {:result => "fail"}
        end
      end
    end
    
  end
  
  def destroy
    @target = Target.find(params[:id])
    @target.destroy

    redirect_to targets_url
  end

  
  protected

  def find_user_id
    respond_to do |format|
      format.json do
        #@user_id = session[:user_id]
        @user_id = params[:user_id]
      end
      format.html do
        @user_id = session[:user_id]
        #@user_id = 1
      end
    end
  end
  
end
