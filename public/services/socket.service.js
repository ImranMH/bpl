
(function(){
	'use strict'
	angular
			.module('weblink')
			.factory('SocketService', socketService)

			socketService.$inject = ['$rootScope', '$window'];
			
		function socketService($rootScope, $window) {
				
				var socket;
		    var services = {
		      on: on,
		      emit: emit,
		      init: init
		    };

    		return services;
				
	    	function init(userId,callback) {
	    		var socket = io.connect();

		      //var ioRoom = $window.location.origin + '/' + $window.localStorage.code;
		      var ioRoom = $window.location.origin + '/' ;
		      $window.socket = io(ioRoom, {query: `userId = ${userId}`});
		      callback($window.socket)
		    }
				function on(eventName, callback) {
		      $window.socket.on(eventName, function() {
		        var args = arguments;
		        $rootScope.$apply(function() {
		          callback.apply($window.socket, args);
		        });
		      });
		    }

		    function emit(eventName, data, callback) {
		      $window.socket.emit(eventName, data, function() {
		        var args = arguments;
		        $rootScope.$apply(function() {
		          if (callback) {
		            callback.apply($window.socket, args);
		          }
		        });
		      });
		    }
		}
			
}())


