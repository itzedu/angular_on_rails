class PlayersController < ApplicationController
	def index
		render_players
	end

	def create
		Player.create(player_params)
		render_players
	end

	def destroy
		Player.find(params[:id]).destroy
		render_players
	end

	private
		def render_players
			render :json => Player.joins(:team).select("players.id as id", :first_name, :last_name, "name as team_name")
		end

		def player_params
			params.require(:player).permit(:first_name, :last_name, :team_id)
		end
end