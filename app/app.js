var messageApp = angular.module('messageApp', ['ui.bootstrap', 'ngStorage']);

//main Controller for the message App
(function(){
messageApp.controller('indexController', function ($scope, $uibModal , $window , $rootScope , messageFactory) {  
    
    
   
   //getting global message data
   $rootScope.allMessages = messageFactory.retriveMessage();
    
   //getting global latest message
   $rootScope.latestData = function() {
         return messageFactory.retriveMessage();
       }
    
   //triggring "on" storage event to sync localstorage between different tabs
    angular.element($window).on('storage', function(event) {
    $rootScope.$apply(function() {
        $rootScope.allMessages = messageFactory.retriveMessage();
        $rootScope.latestData = function() {
              return messageFactory.retriveMessage();
           }
        });
      });
   //open a new message Box instance to star message
    $scope.Messenger = function () {
            var messenger = $uibModal.open({
				    controller: 'messageController',
                    templateUrl: 'app/views/messageDialog.html',
                    resolve: {
                    userName: function () {
                    return $scope.user;
                    }
                 }
             });
          $scope.user = "";
     }
   });

 
    
//main service for message App for retrieving and storing message on to localstorage
messageApp.factory("messageFactory", function($window, $rootScope , $localStorage) {
      var allMessages = new Array();
      return {
        setData: function(msg) {
          $localStorage.message = msg;
          return this;
        },
        retriveMessage: function() {
           allMessages = $localStorage.message;                 
           return allMessages ? allMessages : []; 
         }
      };
  });


//controller for message Box
messageApp.controller("messageController", function(messageFactory , $uibModalInstance , userName ,$scope , $rootScope) {
    
     //add a new message from particular user
     $scope.addMessage = function() {
        var message = {
        user: userName,
        message: $scope.message
    }
    $rootScope.allMessages.push(message);  
    messageFactory.setData($rootScope.allMessages);
    $scope.message = "";
  };
    
    //close the message box and delete all the current message
    $scope.close = function () {
        $uibModalInstance.dismiss('cancel');
        $rootScope.allMessages.splice(0,$rootScope.allMessages.length)
      };
   });
})();