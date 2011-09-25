class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :encryptable, :confirmable, :lockable, :timeoutable and :omniauthable
  #devise :database_authenticatable, :registerable,
  #       :recoverable, :rememberable, :trackable, :validatable

  # Setup accessible (or protected) attributes for your model
  #attr_accessible :email, :password, :password_confirmation, :remember_me
  validates_presence_of :password, :email
  validates_uniqueness_of :email
  has_many :targets
  
  def self.authenticate(email, password)
    user = self.find_by_email(email)
    if user
      if user.password != password
        user = nil
      end
    end
    user
  end
  
end
