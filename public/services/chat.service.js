(function(){
	'use strict'
	angular
			.module('weblink')
			.factory('ChatService', chatService)

			chatService.$inject = ['SocketService'];
			
		function chatService(SocketService) {
				
				var socket;
		    var services = {
		      connection: connection,
		      disconnect: disconnect,
		      sendMessage: sendMessage,
		      recieveMessage: recieveMessage,
		      showOnlineList: showOnlineList,
		      socketInitialization: socketInitialization,

		    };

    		return services;
				
    		function socketInitialization(userId,cb) {
		      SocketService.init(userId,function(socket) {
		   			if(socket){
		   				cb('socket initialize successfull');
		   			} else {
		   				cb('error socket initialize ');
		   			}
		      });
		    }
				function showOnlineList(eventName, callback) {
		      SocketService.on('add-message-response', function() {
		   			console.log('add-message-response');
		      });
		    }
		    function connection(eventName, callback) {
		    		console.log('chatservice');
		      SocketService.on(eventName, function() {
		   			console.log('connection ok');
		      });
		    }
		     function disconnect(callback) {
		    	
		      SocketService.on('disconnect', function(msg) {
		   			callback(msg);
		   			console.log('disconnect');
		      });
		    }  
		    function sendMessage(data, callback) {
		      SocketService.emit('send-message',data, function(res) {
		   			callback(res);
		      });
		    }
		     function recieveMessage( callback) {
		      SocketService.on('message-response', function(res) {
		      	console.log('message receive');
		   			callback(res);
		      });
		    }

		}
			
}())