(function(){
	'use strict'
	angular
			.module('weblink')
			.factory('UserService', UserService)

			UserService.$inject= ['$http'];
			
			function UserService($http) {
				
				var service = {
					testdata : testdata,
					register: register,
					getLogedIn: getLogedIn,
					//loginUser: loginUser,
					getAllUsers: getAllUsers,
					searchUser: searchUser,
					checkUserAvailablity:checkUserAvailablity,
					getUserPrfile: getUserPrfile,
					UpdateUserPrfile: UpdateUserPrfile,
					getUserProfileById: getUserProfileById,
					getProBookmarkLink: getProBookmarkLink,
					getRegisterLink: getRegisterLink,
					getweblinkDetailById: getweblinkDetailById,
					//showFollowing: showFollowing,
					
					changePass: changePass,
					logout: logout,
					deactivateAccount: deactivateAccount,
					startFollowing: startFollowing,
					getFollowingUser: getFollowingUser,
					getFollowerUser: getFollowerUser,
					getHomeBookmarkLink: getHomeBookmarkLink,
					getHomeRegisterLink: getHomeRegisterLink,
					getHomeFollowing: getHomeFollowing,
					getHomeFollower: getHomeFollower,
					whoToFollow: whoToFollow,
					endFollowing: endFollowing,
					getTopFollower: getTopFollower

					// getUserActionById: getUserActionById,
					 
				}
				return service;
				/* test 	service ...........................*/
				function testdata() {
					return $http.get("/apis/data")
				}
				/* Register 	service ...........................*/
				function register(user) {
					console.log(user , 'in service');
					return $http.post("/user/register", user)
				}
				/* LOG IN 	service ...........................*/
				function getLogedIn(user) {

					return $http.post("/user/login", user)
				}

				// function loginUser() {
					
				// 	return $http.get("/user/profile")
				// }
				
				function getAllUsers() {
					
					return $http.get("/user/all")
				}
				/* LOG OUT 	service ...........................*/
				function logout() {
					return $http.post("/user/logout")
				}

				function searchUser(user) {
					var data = {
						 user:user
						};

					return $http.get("/user/search", {params: data} )
				}
				/* get register site detail ..........................*/
				function getweblinkDetailById(data){

					return $http.get('/home/'+data.username+'/registered/'+ data.weblinkId)
				}
				/* user name avability check ..........................*/
				function checkUserAvailablity(username){

					return $http.post('/user/username', username)
				}
				/* profile page route	service ...........................*/
				function getUserPrfile(user) {
					return $http.get("/user/"+user.username +"/profile")
				}
				function getProBookmarkLink(userId) {
					return $http.get("/user/"+userId +"/bookmark")
				}
				function getRegisterLink(userId) {
	
					return $http.get("/user/"+userId +"/registeredlink")
				}
				function UpdateUserPrfile(user) {

					return $http.put("/user/profile/edit", user)
				}

				/* currently implemented ...............................*/
				function getUserProfileById(id) {

					return $http.get("/user/"+id)
				}
				/* add register details to user*/
				function registerSiteToUser(userId,weblink_id, data) {
					
					return $http.post("/user/"+userId+ "/weblink/"+weblink_id, data)
				}
				function startFollowing(userId) {
	
					return $http.post('/user/follow',userId)
				}
				function getFollowingUser(userId) {
					var url = "/user/"+userId+"/following";
					return $http.get(url)
				}
				function getFollowerUser(id) {

					return $http.get("/user/"+id+"/follower")
				}
				/* login user homepage data*/
				function getHomeRegisterLink() {
					return $http.get("/user/home/registered")
				}
				function getHomeFollowing() {
					return $http.get("/user/home/following")
				}
				function getHomeFollower() {
					return $http.get("/user/home/follower")
				}
				function getHomeBookmarkLink() {
					return $http.get("/user/home/bookmark")
				}
				function whoToFollow() {
					return $http.get("/user/feed/whotofollow")
				}
				function endFollowing(user) {
					return $http.put("/user/unfollow", user)
				}
				function getTopFollower() {
					return $http.get("/user/home/follower/top")
				}

				/* change password ...............................*/
				function changePass(pass) {
					return $http.put("/user/changePassword", pass)
				}
				function deactivateAccount(pass) {
					console.log(pass);
					return $http.delete("/user/deactivateUser", {data: {pass:pass}, headers:{"Content-Type": "application/json;charset=utf-8"}})
				}
			}
			
}())