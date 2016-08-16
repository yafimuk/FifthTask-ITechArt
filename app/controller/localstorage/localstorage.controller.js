(function(){
    angular.module('messageApp').controller('indexController', function ($scope, $uibModal , $window , $rootScope , messageFactory, notify) {

   $rootScope.allMessages = messageFactory.retriveMessage();

   $rootScope.latestData = function() {
         return messageFactory.retriveMessage();
       };

    angular.element($window).on('storage', function(event) {
    $rootScope.$apply(function() {
        $rootScope.allMessages = messageFactory.retriveMessage();
        var length = $rootScope.allMessages.length;
        var name = $rootScope.allMessages[length-1].user;
        var message = $rootScope.allMessages[length-1].message;
        notify(name + ' send: \n' + message);
        $rootScope.latestData = function() {
              return messageFactory.retriveMessage();
           }
        });
      });

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