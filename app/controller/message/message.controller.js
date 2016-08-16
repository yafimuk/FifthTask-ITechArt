(function(){
    angular.module('messageApp').controller("messageController", function(messageFactory , $uibModalInstance , userName ,$scope , $rootScope) {
    $scope.date=new Date();
     $scope.addMessage = function() {
        var message = {
        time:$scope.date,    
        user: userName,
        message: $scope.message
    };
    $rootScope.allMessages.push(message);  
    messageFactory.setData($rootScope.allMessages);
    $scope.message = "";
  };

    $scope.close = function () {
        $uibModalInstance.dismiss('cancel');
        $rootScope.allMessages.splice(0,$rootScope.allMessages.length)
      };
   });

})();