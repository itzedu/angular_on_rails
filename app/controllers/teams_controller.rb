class TeamsController < ApplicationController
	skip_before_action :verify_authenticity_token

	def index
		render_teams	
	end

	def create
		Team.create(name: params[:name])
		render_teams
	end

	def destroy
		Team.find(params[:id]).destroy
		render_teams	
	end

	private
		def render_teams
			render :json => Team.all
		end
end