class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def current_user
    User.find(session[:user_id]) if session[:user_id]
  end

  helper_method :current_user

  def require_login
    redirect_to :root if session[:user_id] == nil
  end

  def require_correct_user
    if params[:user_id]
      user = User.find(params[:user_id])
    else  
      user = User.find(params[:id])
    end
    redirect_to current_user if current_user != user
  end
end
