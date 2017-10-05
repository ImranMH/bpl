/* register controller complited*/
(function(){
	'use strict'
	angular
			.module('weblink')
			.controller('registerCtrl', registerCtrl)

			registerCtrl.$inject = ['$window', '$rootScope','UserService','$location'];

			function registerCtrl($window, $rootScope, UserService, $location) {

				var vm = this;
				vm.message = "";
				vm.UserNameMessage = ""
				vm.evalutePasswordMessage = ""
				vm.matchPasswordMessage = "";

				vm.checkUsername = checkUsername;
				vm.evalutePassword = evalutePassword;
				vm.matchPassword = matchPassword;
				vm.register = register;
				vm.cancelEvalute = cancelEvalute;
				
				var passwordOk = false;
				var PasswordMatch = false;
				var usernameAvailable = false;
				var typingTimer = '';
				activate()

				function activate() {

				}
				function register(user) {
					
					if(usernameAvailable && passwordOk && PasswordMatch) {
						console.log('usernameAvailable:'+ usernameAvailable +'passwordOk:'+passwordOk+'PasswordMatch:'+PasswordMatch);
						UserService.register(user).then(function(user){
							console.log(user);
							vm.message = "successfully register Redirect to ... login";
							//$rootScope.current_user = user.data;
							setTimeout(function(){				    
                   $window.location.href = '/#/login';
								}, 2000);
						}, function(err){
							vm.message = "there is something wrong with your registration"+ err;
						})
					}
				}

				function checkUsername(user) {
					if (user.username.length >= 3) {
						vm.UserNameMessage = "";
						UserService.checkUserAvailablity(user).then(function(user){
							if(!user.data.user){
								vm.UserNameMessage = user.data.message;
								setTimeout(function(){
									vm.UserNameMessage = "";
								}, 5000);
								usernameAvailable = true;
							} else {
								vm.UserNameMessage = user.data.message;
								usernameAvailable = false;
							}
						})
						
					} else {
						vm.UserNameMessage = "user name at least 3 word "
					}

				}
				function evalutePassword(user) {

					clearTimeout(typingTimer)
					vm.evalutePasswordMessage = "";
					 typingTimer = setTimeout(function(){
						if(user.password.length < 4) {
						vm.evalutePasswordMessage = "Password Too Short.Minimum 4 charcter"
						} else {
							vm.evalutePasswordMessage = ""
							passwordOk = true;
						}
					},2000)
					
				}


				function matchPassword(user) {

					clearTimeout(typingTimer)
					typingTimer = setTimeout(function(){
					if(user.passwordMach === user.password) {
						vm.matchPasswordMessage = ""
						PasswordMatch = true;
					} else {
						vm.matchPasswordMessage= "Password Dont Match";
					}
					},2000)
				}	

				function cancelEvalute(user) {
					clearTimeout(typingTimer)
				}

			}
		
			
}())