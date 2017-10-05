(function(){
	'use strict'
	angular
			.module('expariment')
			.controller('ProfileCtrl', ProfileCtrl)

			ProfileCtrl.$inject = ['OmdbService','UserService','MovieService','$rootScope','$routeParams','$location','SocketService','ChatService','Upload','$window'];

			function ProfileCtrl(OmdbService,UserService, MovieService,$rootScope,$routeParams,$location,SocketService,ChatService,Upload,$window) {

				var vm = this;
				/*vm.GetMovie = GetMovie;
				vm.addMovie = addMovie;*/
				vm.ShowEditProfile = true;
				vm.deactivate = deactivate;
				vm.changePassword = changePassword;
				vm.updateUser = updateUser;
				 var user =$rootScope.globals.currentUser.user;
				activate();

				 vm.submit = function(){ //function to call on form submit
	            console.log('sub');
	            if (vm.upload_form.file.$valid && vm.file) { //check if from is valid
	                vm.upload(vm.file); //call upload function
	            }
	        }

	        vm.upload = function (file) {
	        	Upload.upload({
	            url: 'user/avatar',
	            data: {profileAvater: file, }
			        }).then(function (resp) {
			            //console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
			            console.log(resp);
			        }, function (resp) {
			            console.log('Error status: ' + resp.status);
			        }, function (evt) {
			            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
			            //console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
			        });
        	};

				function activate() {
					// var socket = io.connect();

					// 	SocketService.init()
					// 	ChatService.connection('connect', function(){
					// 		console.log('connected');
					// 	})

					UserService.getUserPrfile(user).then(function(user){
					  console.log('getUserPrfilefrom here');

						
						// $rootScope.current_user = user.data.sessionUser;
						 //$rootScope.current_user = user.data.user;
						 vm.sessionUser = user.data.sessionUser;
						  console.log(vm.sessionUser);
						return vm.sessionUser;
						
					})
					
					 // UserService.getUserActionBySession(user).then(function(user){
					 // 	console.log('getUserActionBySession');
						// console.log(user);					 
						//  vm.movieWatch = user.data.user.relational.watch;
						//  vm.movieInterest = user.data.user.relational.interest;
						//  vm.movieAdded = user.data.user.relational.addMovie;
						//  vm.movieLike = user.data.user.relational.like;
						//  vm.followingUser = user.data.user.relational.following;
						//  vm.followerUser = user.data.user.relational.follower;
						
					 // })

				}
			
				function updateUser(user) {
					
					UserService.UpdateUserPrfile(user).then(function(user) {
						console.log(user);
						//vm.ShowEditProfile = false;
						vm.updateStatus = " Profile successfully Updated"
					})
					
				}
				function changePassword(doc) {
					if(doc.newPassword === doc.confarm){
						UserService.changePass(doc).then(function(pass){
							console.log(pass);
							vm.status= "password successfully Changed "
						}, function(err) {
							vm.status= "error in change password"
						})
					} else{
						vm.status = "password don't match "
					}
				}
				function deactivate(id){
					UserService.deactivateAc(id).then(function(doc){
						 $location.url("user/login");
					})
				}

			}
			
}())