/*login module complited*/

(function(){
	'use strict'
	angular
			.module('weblink')
			.controller('loginCtrl', loginCtrl)

			loginCtrl.$inject = ['$window', '$rootScope','UserService','$http','$cookieStore'];

			function loginCtrl($window, $rootScope, UserService,$http,$cookieStore) {
				
				var vm = this;
				vm.login = login;
				vm.message = ''
				$rootScope.current_user ;
				activate()
				function activate() {
					

				}
					
				function login(user) {
					if (user && user.username && user.password) {
						UserService.getLogedIn(user).then(function(loginUser){
							
						 if (loginUser.data.state ==="success") {
						 			vm.message = "Successfully login As "+ loginUser.data.user.username;
						 			//$rootScope.current_user = loginUser.data.user; 
						 			//console.log('$rootScope.globals'+$rootScope.globals);   
                   $rootScope.globals = {
                   		currentUser:loginUser.data.user
			                // currentUser: {
			                //     username: loginUser.data.user.username,
			                //     id: loginUser.data.user._id,
			                //     user: loginUser.data.user,
			                //     //authdata: authdata
			                // }
			            };
			            console.log($rootScope.globals.currentUser);
			            $http.defaults.headers.common['Authorization'] = 'Basic ' ; // jshint ignore:line
            			$cookieStore.put('globals', $rootScope.globals);
                  $window.location.href = '/#/home/'+loginUser.data.user.username;
              } else {
              	vm.message = loginUser.data.message[0]
              	$window.location.href = '/#/login';
              }
						})
					} else {
						vm.message="Plase Fills all the fields first";
					}
				}
					
			}
			
}())

