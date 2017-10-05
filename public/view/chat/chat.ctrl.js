(function(){
	'use strict'
	angular
			.module('weblink')
			.controller('ChatCtrl', chatCtrl)

			chatCtrl.$inject=['SocketService','ChatService','$rootScope'];

			function chatCtrl(SocketService,ChatService,$rootScope) {

				var vm = this;
				var userId =$rootScope.globals.currentUser.id
				vm.chating = chating;

				activate();

				function activate() {

						
						//SocketService.init()
						ChatService.socketInitialization(userId, function(res){
							console.log(res);
						})
						ChatService.connection('connect', function(){
							console.log('connected');
						})
						ChatService.disconnect(function(msg){
							console.log(msg);
						})
						ChatService.recieveMessage( function(msg){
							console.log(msg);
						})
				}
				
				function chating(data) {
					console.log('chat');
					ChatService.sendMessage(data, function(someting){
						console.log(someting);
					})
				}		

			}
			
}())