class UsersController < ApplicationController
  #before_filter :authenticate_user!, :only => [:login]
  layout :resolve_layout 
  def new
    @user = User.new()
    
  end
  
  def create
    @user = User.new(params[:user])
    
    respond_to do |format|
       format.json do
         if @user.save
           session[:user_id] = @user.id
           render :json => {:result =>"success", :user_id => @user.id }
         else
           render :json => {:result => "fail", :user_id => -1}
         end
       end
       format.html do
         if @user.save
           session[:user_id] = @user.id

           if @user.targets.count == 0
             redirect_to new_target_path
           else
             redirect_to targets_path
           end
         else
           render :action => :new
         end
       end
     end 
  end
  
  #def sign_up
  
  def login2
    user = current_user
    
    respond_to do |format|
       format.json do
         if user
           render :json => {:result =>"success", :user_id => user.id }
         else
           render :json => {:result => "fail", :user_id => -1}
         end
       end
       format.html do
         if user
           session[:user_id] = user.id

           if user.targets.count == 0
             redirect_to new_target_path
           else
             redirect_to targets_path
           end
         end
       end
     end
  end
  
  
  def login

    session[:user_Id] = nil
    if request.post?
      user = User.authenticate(params[:email], params[:password])
      
      respond_to do |format|
         format.json do
           if user
             session[:user_id] = user.id
             render :json => {:result =>"success", :user_id => user.id }
           else
             render :json => {:result => "fail", :user_id => -1}
           end
         end
         format.html do
           if user
             session[:user_id] = user.id

             if user.targets.count == 0
               redirect_to new_target_path
             else
               redirect_to targets_path
             end
           end
         end
       end
      
      
    end
  end
  
  def resolve_layout
    case action_name
    when "login"
      "blank"
    else
      "application"
    end
  end

  
end
