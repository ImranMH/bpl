(function(){
	'use strict'
	angular
			.module('weblink')
			.controller('ProfileCtrl', ProfileCtrl)
			.controller('ProfileCtrl', ProfileCtrl)
			.controller('ProfileBookmarkCtrl', ProfileBookmarkCtrl)
			.controller('ProfileRegCtrl', ProfileRegCtrl)
			.controller('ProfileFollowerCtrl', ProfileFollowerCtrl)
			.controller('ProfileFollowingCtrl', ProfileFollowingCtrl)

			ProfileCtrl.$inject = ['$location','UserService','$stateParams','$rootScope','WeblinkService','$window'];
			ProfileFeedCtrl.$inject = ['WeblinkService',];
			ProfileBookmarkCtrl.$inject = ['UserService','$stateParams','WeblinkService',];
			ProfileRegCtrl.$inject = ['UserService','$stateParams','WeblinkService',];
			ProfileFollowerCtrl.$inject = ['UserService','$stateParams','WeblinkService',];
			ProfileFollowingCtrl.$inject = ['UserService','$stateParams','WeblinkService',];

			function ProfileCtrl($location,UserService, $stateParams,$rootScope,WeblinkService,$window) {

				var vm = this;
				vm.makeFollowing = makeFollowing;
				vm.makeUnfollow= makeUnfollow
				vm.following = false;
				vm.showContwxtMenu - showContwxtMenu
				var id =$stateParams.id
				 //var user =$rootScope.globals.currentUser.user;
				
				activate();

				function activate() {

					UserService.getUserProfileById(id).then((res)=>{

						var responseData = res.data;
						var user =responseData.user
						var followers = res.data.followers;
						var time = responseData.user.join_at;
						console.log(responseData);
						vm.join_at = moment(time).format("MMMM  YYYY")
						//vm.join_at = new Date(time).toDateString('MM-YYYY')
							vm.feedlist = user.createLink
							vm.loginProfile = false
							vm.user = user
							vm.topFollowers = responseData.followers
							vm.topFollowing = responseData.following
							vm.userInfo ={
								webLinkShare: user.createLink.length, 
								weblinkRegisterList: user.weblinkRegisterList.length, 
								followers: user.follower.length, 
								following: user.following.length, 
							}
						if($rootScope.globals.currentUser) {
							var loginUser = $rootScope.globals.currentUser._id;
							var following = user.follower;
							var i;
							for (i=0; i < following.length; i++) {
								if(following[i] === loginUser){
									vm.following = true;
								}
							}

							if(loginUser === user._id) {
								vm.loginProfile = true
							}
						}
					})

				
					$rootScope.$on('search', function (event, data) {
		        vm.searchList = data.result;
		        vm.searchString = data.searchString;
		      });
				}

				function makeFollowing(following_id) {
					UserService.startFollowing({following_id}).then((res)=>{
						if(!res.data.follower) {
							$window.location.href = '/#/login';
						}						
						vm.following = true;
					})
				}	
				function makeUnfollow(id) {
					UserService.endFollowing({id}).then((res)=>{
						vm.following = false;
					})
				}	
				function showContwxtMenu( $event) {
					console.log('id hai');
				}


			} /* end of controller*/

			function ProfileFeedCtrl(WeblinkService) {

				var vm = this;
				var id =$stateParams.id
				 //var user =$rootScope.globals.currentUser.user;
				
				activate();

				function activate() {

					UserService.getUserProfileById(id).then((res)=>{
						var responseData = res.data;
							vm.feedlist = responseData.createLink
							vm.user = responseData					
					})
				}

			} /* end of controller*/


			/* register site view .........................*/
			function ProfileBookmarkCtrl(UserService, $stateParams,WeblinkService) {

				var vm = this;	
				var id =$stateParams.id

				activate();
				function activate() {

					UserService.getProBookmarkLink(id).then((res)=>{
						vm.bookmarks = res.data;
											
					})
				}
			}
					/* register site view .........................*/
			function ProfileRegCtrl(UserService, $stateParams,WeblinkService) {

				var vm = this;	
				var id =$stateParams.id

				activate();
				function activate() {

					UserService.getRegisterLink(id).then((res)=>{
						vm.registered = res.data;
											
					})
				}
			}
			function ProfileFollowerCtrl(UserService, $stateParams,WeblinkService) {

				var vm = this;	
				var id =$stateParams.id

				activate();





				function activate() {

					UserService.getFollowerUser(id).then((res)=>{
						vm.followers = res.data;
											
					})
				}
			}
			function ProfileFollowingCtrl(UserService, $stateParams,WeblinkService) {

				var vm = this;	
				var id =$stateParams.id

				activate();

				function activate() {

					UserService.getFollowingUser(id).then((res)=>{
						vm.followings = res.data;
											
					})
				}
			}

}())