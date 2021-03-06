var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");

var refresh=function(){
$http.get('/contactlist').success(function(response){
console.log("Dobio sam zahtjev koji sam trazio");
$scope.contactlist=response;
$scope.contact="";
});
};
refresh();

 var refreshBook=function()
 {
 $http.get('/books').success(function(response){
        console.log("Ispis knjiga");
        $scope.books=response;
        $scope.book="";
    });
};
    refreshBook();
        
    
//    $scope.zajedno=function()
//    {
//        $http.post('/zajedno',$scope.user).success(function(response){
//            console.log(response);
//        });
//    }
    
    var refreshZajedno=function(){
    $http.get('/zajedno').success(function(response){
        console.log("Zajedno");
        $scope.user=response;
        $scope.user="";
    });
    };
    
                             
$scope.addBook=function(){
console.log($scope.book);
$http.post('/books',$scope.book).success(function(response){
    console.log(response);
        refreshBook();
         });
          };
    
    
$scope.addContact=function(){
console.log($scope.contact);
$http.post('/contactlist', $scope.contact).success(function(response){
	console.log(response);
	refresh();
});
};
    $scope.addZajedno=function(id){
        console.log($scope.book);
        $http.post('/zajedno/'+id,$scope.book).success(function(response){
            console.log(response);
           // refreshZajedno();
        });
    };
$scope.remove=function(id){
	console.log(id);
	$http.delete('/contactlist/' +id).success(function(response){
		refresh();
	});
};

$scope.edit = function(id) {
  console.log(id);
  $http.get('/contactlist/' + id).success(function(response) {
    $scope.contact = response;
  });
};  
$scope.update =function(){
console.log($scope.contact._id);
$http.put('/contactlist/' + $scope.contact._id,$scope.contact).success(function(response){

	refresh();
})
};

}]);﻿