(function(){
    angular.module('messageApp').controller('indexController', function ($scope, $uibModal , $window , $rootScope , messageFactory) {  
   
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
        $rootScope.latestData = function() {s
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


})();