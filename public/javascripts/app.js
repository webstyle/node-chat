var NodeChat = angular.module('NodeChat', []);
var appUrl = 'http://localhost:3000/api/v1';

/**
 * Message Controller.
 */
NodeChat.controller('MsgCtrl', function($scope, $http) {

  /**
   * Get messages list.
   */
  $scope.loadMessages = function() {
    $http.get(appUrl + '/message').success(function(data) {
      console.log('Message data response', data);
      $scope.messages = data;
    });
  }

  $scope.loadMessages();

  /**
   * Delete message by id.
   */
   $scope.deleteMessage = function (id) {
     $http.delete(appUrl + '/message/' + id).success(function (data) {
       $scope.loadMessages();
       console.log(data);
     });
   }

  /**
   * Save messages list.
   */
  $scope.save = function() {
    $http.post(appUrl + '/message', {content:$scope.content, user:'Farrukh'}).success(function(data) {
      console.log('Message save data response');
      $scope.loadMessages();
      $scope.content = null;
    });
  }


});
