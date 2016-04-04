var app = angular.module('nbaApp', ['ngRoute']);

app.config(function($routeProvider, $httpProvider) {
	$routeProvider
		.when("/partial1", {
			templateUrl: "/partials/partial1.html",
			controller: "playersController"
		})
		.when("/partial2", {
			templateUrl: "/partials/partial2.html",
			controller: "teamsController"
		})
		.when("/partial3", {
			templateUrl: "/partials/partial3.html",
			controller: "associationsController"
		})
	$httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
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
})

app.factory("associationFactory", function($http){
	var factory = {};
	factory.show = function(callback, teamId){
		$http.get("/associations/" + teamId).success(function(output){
			callback(output);
		})
	}
	return factory;
})

// ------------------------------------- CONTROLLERS ------------------------------------- //
app.controller("playersController", function($scope, playerFactory, teamFactory){
	$scope.newPlayer = {
		player: {}
	};

	playerFactory.index(function(json){
		$scope.players = json;
	})
	teamFactory.index(function(json){
		$scope.teams = json;
		$scope.newPlayer.player.team_id = $scope.teams[0].id;
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

app.controller("associationsController", function($scope, teamFactory, associationFactory) {
	teamFactory.index(function(json){
		$scope.teams = json;
		$scope.selectedTeam = $scope.teams[0];

		associationFactory.show(function(json){
			$scope.teamPlayers = json;
		}, $scope.selectedTeam.id)
		
	})

	$scope.selectedTeamChanged = function() {
		associationFactory.show(function(json){
			$scope.teamPlayers = json;
		}, $scope.selectedTeam.id)
	}
})