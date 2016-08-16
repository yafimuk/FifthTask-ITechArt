//main service for message App for retrieving and storing message on to localstorage
(function(){
    angular.
        module('messageApp').
        factory('messageFactory',['$window', '$rootScope' , '$localStorage', function($window, $rootScope , $localStorage) {
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
      }]);
})();