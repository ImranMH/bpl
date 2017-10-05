(function(){
	'use strict'
	angular
			.module('weblink')
			.controller('navCtrl', navCtrl)

			navCtrl.$inject = ['$location','UserService','$rootScope', '$window','$cookieStore','$http','WeblinkService'];

			function navCtrl($location, UserService,$rootScope,$window,$cookieStore,$http,WeblinkService) {

				var vm = this;
				vm.name = "search";
				vm.searchLink = searchLink;
				vm.logout = logout
				activate()
				  // function ClearCredentials() {
      //       $rootScope.globals = {};
      //       $cookieStore.remove('globals');
      //       $http.defaults.headers.common.Authorization = 'Basic';
      //   }
      //console.log($root.globals.currentUser);
				function activate() {

				}
				function searchLink(item) {
					var data= {
						item: item
					}
					WeblinkService.searchLink(data).then((res)=>{
						
						var data = res.data
						console.log(data);
						$rootScope.$emit('search', data);
					})
				}
				function logout(user, $event){
					console.log(user.username+"logout in process");
					UserService.logout().then(function(logOutUser){
						// console.log('logOutUser');
						// console.log(logOutUser);
						$rootScope.globals = {};
            $cookieStore.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic';
						//$rootScope.current_user = logOutUser.data.user;
						$window.location.href ='/#/login';
						//$location.url('/login')
					})
				}
			}
			
}())