class CategoriesController < ApplicationController
  
  def index
    @categories = Category.all
    
    respond_to do |format|
      format.json do
        render :json => {:result => "success", :categoryList =>@categories}
      end
    end
  end

  def create
    @category = Category.new(params[:category])
    if @category.save
      respond_to do |format|
        format.json do
          render :json => {:result => "success", :category =>@category}
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
  
  
  def hot
    #@result = Category.find_by_sql("select c.name, count(t.id) as tac from categories as c left join targets as t on c.id = t.category_id group by c.name").limit(10)    
    @result = Category.find(:all, :select => 'categories.name,categories.id, count(targets.id) as tac',:joins => 'left outer join targets on targets.category_id = categories.id', :group => 'categories.id',:order => 'count(targets.id) DESC', :limit => 10)
    respond_to do |format|
      format.json do
        render :json => {:result => "success", :categoryList => @result}
      end
      format.html do
      end
    end
  end
end
