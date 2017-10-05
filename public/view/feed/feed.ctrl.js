
(function(){
	'use strict'
	angular
			.module('weblink')
			.controller('feedCtrl', feedCtrl)

			feedCtrl.$inject=['$window','$rootScope','WeblinkService','UserService','moment'];

			function feedCtrl($window,$rootScope,WeblinkService,UserService,moment) {

				var vm = this;
				vm.following = false;
				vm.makeFollowing = makeFollowing;
				vm.getAllUser = getAllUser;
				vm.searchUser = searchUser;
				vm.moments = new moment(); 
				vm.searchList = null
				activate();
				vm.message = {
				   text: 'hello world!',
				   time: new Date()
				};
				function activate() {

					UserService.whoToFollow().then(function(res){
						vm.follows = res.data					
					})
					WeblinkService.getAllWebLink().then((res)=>{
						var feed = res.data.weblink
						vm.feed = true
						vm.feedlist = feed
					})

					$rootScope.$on('search', function (event, data) {
		        vm.searchList = data.result;
		        vm.feed = false;
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
				function getAllUser() {
					UserService.getAllUsers().then((res)=>{
						vm.followAll= res.data
					})
				}	

				function searchUser(user) {
					UserService.searchUser(user).then((res)=>{
						vm.searchUsers = res.data
						console.log(vm.searchUsers);
					}, (err)=>{
						console.log(err);
					})
				}	

			}
			
}())


// (function(){
// 	'use strict'
// 	angular
// 			.module('weblink')
// 			.controller('feedCtrl', feedCtrl)

// 			feedCtrl.$inject=['$rootScope','WeblinkService','UserService','moment'];

// 			function feedCtrl($rootScope,WeblinkService,UserService,moment) {

// 				var vm = this;
// 				vm.makeFollowing = makeFollowing;
// 				vm.getAllUser = getAllUser;
// 				vm.searchUser = searchUser;
				
// 				vm.moments = new moment(); 
// 				vm.searchList = null
// 				activate();
// 				var skip


// 				function activate() {

// 						WeblinkService.getAllWebLink().then((res)=>{
// 						var feed = res.data.weblink
// 						vm.feedlist = feed
// 						var last = vm.feedlist[vm.feedlist.length-1]
// 						vm.loadMore = loadMore;

// 						function loadMore() {
// 								//var last = vm.feedlist[vm.feedlist.length-1]
// 								skip = vm.feedlist.length;
// 								WeblinkService.getAllWebLinkSkip(skip).then((res)=>{
// 								var resdata = res.data.weblink;
// 								resdata.map((loadLink)=> {
// 									vm.feedlist.push(loadLink)
// 								})
								
// 								console.log(res.data.weblink);
// 								console.log(vm.feedlist);
// 							})
// 							console.log('load more');
// 						}

						
// 					})

// 					UserService.whoToFollow().then(function(res){
// 						vm.follows= res.data
// 					})


// 					$rootScope.$on('search', function (event, data) {
// 		        vm.searchList = data.result;
// 		        vm.searchString = data.searchString;
// 		      });
// 				}
				

// 				function makeFollowing(following_id) {
// 					UserService.startFollowing({following_id}).then((res)=>{
// 						vm.following = true;
// 					})
// 				}
// 				function getAllUser() {
// 					UserService.getAllUsers().then((res)=>{
// 						vm.follows= res.data
// 					})
// 				}	
			
// 				function searchUser(user) {
// 					console.log(user);
// 					UserService.searchUser(user).then((res)=>{
// 						vm.follows= res.data
// 						console.log(res);
// 					}, (err)=>{
// 						console.log(err);
// 					})
// 				}	

// 			}
			
// }())
