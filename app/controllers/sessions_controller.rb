class SessionsController < ApplicationController
	def create
		user = User.find_by(:email => params[:email])
		if user && user.authenticate(params[:password])
			redirect_to "/nba"
		else
			redirect_to :back
		end
	end
end