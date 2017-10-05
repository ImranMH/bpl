(function(){
	'use strict'
	angular
			.module('weblink')
			.controller('homeCtrl', homeController)
			.controller('NewLinkCtrl', NewLinkCtrl)
			.controller('HomeFeedCtrl', HomeFeedCtrl)
			.controller('HomeBookmarkCtrl', HomeBookmarkCtrl)
			.controller('HomeRegCtrl', HomeRegCtrl)
			.controller('HomeFollowingCtrl', HomeFollowingCtrl)
			.controller('HomeFollowerCtrl', HomeFollowerCtrl)
			.controller('HomeRegDetailCtrl', HomeRegDetailCtrl)

			homeController.$inject= ['$location','UserService','WeblinkService','$window','$rootScope'];
			NewLinkCtrl.$inject= ['$location','WeblinkService','$window'];
			HomeFeedCtrl.$inject= ['$location','WeblinkService','$window'];
			HomeBookmarkCtrl.$inject= ['UserService','WeblinkService'];
			HomeRegCtrl.$inject= ['UserService','WeblinkService'];
			HomeFollowingCtrl.$inject= ['UserService','WeblinkService'];
			HomeFollowerCtrl.$inject= ['UserService','WeblinkService'];
			HomeRegDetailCtrl.$inject= ['UserService','$stateParams','WeblinkService'];



			function homeController($location,UserService, WeblinkService,$window,$rootScope) {
				var vm = this;

				activate();

				function activate() {
					WeblinkService.getLoginUserDetail().then((res)=>{

						var responseData = res.data;
						console.log(responseData);
						if(responseData.login) {
							vm.feedlist = responseData.user.createLink
							vm.user = responseData.user
							var time = responseData.user.join_at;
							vm.join_at = moment(time).format("MMMM  YYYY")
							vm.userInfo ={
								webLinkShare:responseData.user.createLink.length, 
								weblinkRegisterList:responseData.user.weblinkRegisterId.length, 
								followers:responseData.user.follower.length, 
								following:responseData.user.following.length, 
							}
							vm.topFollowers = responseData.followers
							vm.topFollowing = responseData.following
							$rootScope.$on('search', function (event, data) {
				        vm.searchList = data.result;
				        vm.searchString = data.searchString;
				      });

						} else {
							$window.location.href = '/#/login';
						}
					})
				}
			} /*end homeController*/

			function NewLinkCtrl($location, WeblinkService,$window) {

				var vm = this;	
				vm.addNewLink = addNewLink;
				activate();
				function activate() {				
				}

				function addNewLink(link) {
					console.log(link);
					return WeblinkService.addNewLink(link).then(function(res){
						$window.location.href = '/#/home';
					})
				}
			}

			function HomeFeedCtrl($location, WeblinkService,$window) {
				var vm = this;

				activate();

				function activate() {
					WeblinkService.getLoginUserDetail().then((res)=>{

						var responseData = res.data;



						if(responseData.login) {
							vm.feedlist = responseData.user.createLink
							vm.user = responseData.user
							vm.userInfo ={
								webLinkShare:responseData.user.createLink.length, 
								weblinkRegisterList:responseData.user.weblinkRegisterId.length, 
								followers:responseData.user.follower.length, 
								following:responseData.user.following.length, 
							}

						} else {
							$window.location.href = '/#/login';
						}
					})
				}

			} /*end homeController*/

				/* website bookmark list  view .........................*/
			function HomeBookmarkCtrl(UserService, $stateParams,WeblinkService) {

				var vm = this;	
				
				activate();
				function activate() {

					UserService.getHomeBookmarkLink().then((res)=>{
						console.log(res.data);
						vm.bookmarks = res.data;											
					})
				}
			}
			function HomeRegCtrl(UserService, $stateParams,WeblinkService) {

				var vm = this;	
				
				activate();
				function activate() {

					UserService.getHomeRegisterLink().then((res)=>{
						console.log(res.data);
						vm.registered = res.data;
											
					})
				}
			}

			function HomeFollowingCtrl(UserService, $stateParams,WeblinkService) {
				var vm = this;	
				activate();
				function activate() {

					UserService.getHomeFollowing().then((res)=>{
						console.log(res.data);
						vm.following = res.data;
											
					})
				}
			}



			function HomeFollowerCtrl(UserService, $stateParams,WeblinkService) {

				var vm = this;	


				activate();
				console.log('HERE');
				function activate() {

					UserService.getHomeFollower().then((res)=>{
						console.log(res.data);
						vm.followers = res.data;
											
					})
				}
			}

			function HomeRegDetailCtrl(UserService, $stateParams,WeblinkService) {

				var vm = this;
				vm.msg = 'hello'
				var data = {
					weblinkId :$stateParams.weblinkId,
					username :$stateParams.username
				}	
				// var weblinkId =$stateParams.weblinkId
				// var username =$stateParams.username
				activate();
				function activate() {
					
					UserService.getweblinkDetailById(data).then((res)=>{
						console.log(res);
						vm.registered = res.data;
											
					})
				}
			}

}())