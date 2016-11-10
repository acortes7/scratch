var myApp = angular.module('myApp',[]);

myApp.controller('AppCtrl',['$scope','$http',
  function($scope,$http){
  console.log("Hello World from controller");
//$http.get('/contactList');
  var refresh = function(){
    $http.get('/contactList').success(function(response){
      console.log("Got data!");
      $scope.contactList = response;
    });
  };
  refresh();

  $scope.addContact = function(){
    $http.post('/contactlist', $scope.contact).success(function(response){
      console.log(response);
      refresh();
    });
  };

  $scope.remove = function(id){
    console.log(id);
    $http.delete('/contactlist/' + id).success(function(response){
    refresh();
  });
};
  $scope.edit = function(id){
    console.log(id);
    $http.get('contactlist/' + id).success(function(response){
      $scope.contact = response;
    });
  };

  $scope.update = function(){
    console.log(id);
    $http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(response){
      refresh();
    });
  };
  // person1={
  //   name: "Fin",
  //   email: "fin@hello.com",
  //   number: "111-111-1111"
  // };
  // person2={
  //   name: "John",
  //   email: "John@hello.com",
  //   number: "111-111-2222"
  // };
  // person3={
  //   name: "Ana",
  //   email: "Ana@hello.com",
  //   number: "111-222-1111"
  // };
  // var contactList =[person1,person2,person3];
  //
  // $scope.contactList = contactList;
}]);
