(function(){
    //controller for message Box
    angular.module('messageApp').controller("messageController", function(messageFactory , $uibModalInstance , userName ,$scope , $rootScope) {
    $scope.date=new Date();
     //add a new message from particular user
     $scope.addMessage = function() {
        var message = {
        time:$scope.date,    
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