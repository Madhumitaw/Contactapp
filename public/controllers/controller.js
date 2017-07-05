var myApp=angular.module('myApp',[]);
myApp.controller('AppCtrl',['$scope','$http',
	function($scope,$http) {
		// body...
		
$http.get('/contactlist').then(function(response){

	console.log("recieved data dddd"+response.data);
	$scope.contactlist=response.data


});
$scope.addContact=function(){

		
		$http.post('/contactlist',$scope.contact).then(function(response){
			console.log("RESPONSE"+response);
			$scope.contactlist.push(response.data); 
		})




	};


	$scope.remove=function(id){

		console.log("IDD"+id);
		$http.delete('/contactlist/' + id).then(function(response){
			console.log("deleeeee");
		location.reload();

		})


	};

$scope.edit=function(id){

		console.log("ID EDIT"+id);
		$http.get('/contactlist/' + id).then(function(response){
		$scope.contact=response.data;
		console.log(response.data);

		})


	};


$scope.update=function(id){

		console.log("pdate"+$scope.contact._id);
		
	$http.put('/contactlist/' + $scope.contact._id,$scope.contact).then(function(response){
		location.reload();

		})

		


	};
	

		
		
	}]);

