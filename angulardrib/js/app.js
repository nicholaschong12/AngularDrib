var app = angular.module("dribApp",["ngRoute","ngResource"]);

app.filter("sanitize", ['$sce', function($sce) {
  return function(htmlCode){
    return $sce.trustAsHtml(htmlCode);
  }
}]);


app.factory("ShotFac",["$http",function($http){
		
	
	function load(path){
		
		return $http.jsonp("http://api.dribbble.com/shots/"+path+"?callback=JSON_CALLBACK");
		
	}
	
	return {
		everyone : function(path){return load(path);}
	}
	
}]);

app.controller("MainCtrl",["$scope","ShotFac",function($scope,ShotFac){
	
	ShotFac.everyone("popular").then(function(data){
		
		
		
		$scope.list = data.data;
		
	});
	
}]);

app.controller("PopularCtrl",["$scope","ShotFac","$http",function($scope,ShotFac,$http){
	
	ShotFac.everyone("everyone").then(function(data){
		
		
		
		$scope.list = data.data;
		
	});
	
		
	
}]);

app.controller("ShotCtrl",["$scope","ShotFac","$routeParams",function($scope,ShotFac,$routeParams){
	
	var id = $routeParams.id;
	
	ShotFac.everyone(id).then(function(data){
		$scope.shot = data.data;
		
	});
	
	
}]);



app.config(function($routeProvider,$locationProvider){
	
	$routeProvider.when("/",{
		templateUrl : "/views/main.html",
		controller : "MainCtrl"
	}).when("/popular",{
		templateUrl : "/views/main.html",
		controller : "PopularCtrl"
	}).when("/shot/:id",{
		templateUrl : "/views/shot.html",
		controller : "ShotCtrl"
	});
	
	//$locationProvider.html5Mode(true);
});

app.filter("dDate",function($filter){
	return function(value,format){
		if(value){
			value = Date.parse(value);
		}
		return $filter("date")(value,format);
	}
});