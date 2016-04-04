class AssociationsController < ApplicationController
	def show
		render_team_players params[:id]
	end

	private
		def render_team_players id
			render :json => Team.find(id).players
		end
end