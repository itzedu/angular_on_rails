class PlayersController < ApplicationController
	skip_before_action :verify_authenticity_token

	def index
		render_players
	end

	def create
		Player.create(first_name: params[:first_name], last_name: params[:last_name])
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
end