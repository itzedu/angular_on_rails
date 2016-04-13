class UsersController < ApplicationController
	def index
	end

	def create
		user = User.new(user_params)
		if user.save
			redirect_to "/nba"
		else
			redirect_to :back
		end
	end

	private
		def user_params
			params.require(:user).permit(:email, :name, :password, :password_confirmation)
		end
end