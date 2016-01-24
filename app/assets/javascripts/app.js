var app = angular.module('nbaApp', ['ngRoute']);

app.config(function($routeProvider) {
	$routeProvider
		.when("/partial1", {
			templateUrl: "/partials/partial1.html",
			controller: "playersController"
		})
		.when("/partial2", {
			templateUrl: "/partials/partial2.html",
			controller: "teamsController"
		})
});

// ------------------------------------- FACTORIES ------------------------------------- //
app.factory("playerFactory", function($http){
	var factory = {};
	factory.index = function(callback){
		$http.get("/players").success(function(output){
			callback(output);
		})
	}
	factory.create = function(playerInfo, callback){
		$http.post("/players", playerInfo).success(function(output){
			callback(output);
		})
	}
	factory.delete = function(id, callback){
		$http.delete("/players/" + id).success(function(output){
			callback(output);
		})
	}
	return factory;
})

app.factory("teamFactory", function($http){
	var factory = {};
	factory.index = function(callback){
		$http.get("/teams").success(function(output){
			callback(output);
		})
	}
	factory.create = function(teamInfo, callback){
		$http.post("/teams", teamInfo).success(function(output){
			callback(output);
		})
	}
	factory.delete = function(id, callback){
		$http.delete("/teams/" + id).success(function(output){
			callback(output);
		})
	}
	return factory;
	return factory;
})

// ------------------------------------- CONTROLLERS ------------------------------------- //
app.controller("playersController", function($scope, playerFactory){
	playerFactory.index(function(json){
		$scope.players = json;
	})
	$scope.createPlayer = function(){
		playerFactory.create($scope.newPlayer, function(json){
			$scope.players = json;
			$scope.newPlayer = {};

		});
	}
	$scope.deletePlayer = function(playerId){
		playerFactory.delete(playerId, function(json){
			$scope.players = json;
		})
	}
})

app.controller("teamsController", function($scope, teamFactory){
	teamFactory.index(function(json){
		$scope.teams = json;
	})
	$scope.createTeam = function(){
		teamFactory.create($scope.newTeam, function(json){
			$scope.teams = json;
			$scope.newTeam = {};
		})
	}
	$scope.deleteTeam = function(teamId){
		teamFactory.delete(teamId, function(json){
			$scope.teams = json;
		})
	}
})