class PlayersController < ApplicationController
	def index
		render_players
	end

	team = [{first_name: 'Carmelo', last_name: 'Anthony', team_id: 4}, {first_name: 'Kristaps', last_name: 'Porzingis', team_id: 4}, {first_name: 'Arron', last_name: 'Afflalo', team_id: 4}]
	team.each { |t| Player.create(t) }

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
			render :json => Player.all
		end

		def player_params
			params.require(:player).permit(:first_name, :last_name)
		end
end