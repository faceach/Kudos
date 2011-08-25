class CategoriesController < ApplicationController
  
  def hot
    #@result = Category.find_by_sql("select c.name, count(t.id) as tac from categories as c left join targets as t on c.id = t.category_id group by c.name").limit(10)    
    @result = Category.find(:all, :select => 'categories.name, count(targets.id) as tac',:joins => 'left outer join targets on targets.category_id = categories.id', :group => 'categories.name',:order => 'count(targets.id) DESC', :limit => 10)
    respond_to do |format|
      format.json do
        render :json => {:result => "success", :category => @result.as_json}
      end
      format.html do
      end
    end
  end
end
