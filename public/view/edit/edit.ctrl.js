(function(){
	'use strict'
	angular
			.module('weblink')
			.controller('EditCtrl', editCtrl)

			editCtrl.$inject=['UserService','WeblinkService','$window','$rootScope', 'Upload','$cookieStore'];

			function editCtrl( UserService, WeblinkService, $window,$rootScope, Upload,$cookieStore) {

				var vm = this;
				vm.changePassword = changePassword;
				vm.deactivate = deactivate;
				vm.updateProfile= updateProfile;
				activate();

				function activate() {
					WeblinkService.getLoginUserDetail().then((res)=>{
											
						console.log("getting data to edit from server");
						console.log(res.data);
						var responseData = res.data;
						if(responseData.login) {
							vm.feedlist = responseData.user.createLink
							vm.user = responseData.user
							vm.userInfo ={
								webLinkShare:responseData.user.createLink.length, 
								followers:responseData.user.follower.length, 
								following:responseData.user.following.length, 
							}

						} else {
							$cookieStore.remove('globals');
							$window.location.href = '/#/login';
						}
					})

				 }

				function updateProfile(data) {
					UserService.UpdateUserPrfile(data).then((res)=>{
						console.log(res);
					})
				}


			
				/* change password method .............................................*/
				function changePassword(password) {					
					if(password && password.newPassword === password.confarm){

						UserService.changePass(password).then(function(pass){
							vm.message = pass.data.msg;
						}, function(err) {
							vm.message = "error in server"
						})
					} else{
						vm.message  = "password don't match "
					}
				}
				/* deactivate method .............................................*/
				function deactivate(password){
					if(password){
						UserService.deactivateAccount(password).then(function(res){
						 //$location.url("user/login");
						 var data = res.data;
						 if(data.update){
						 		vm.message = data.msg;
						 		$cookieStore.remove('globals');
								$window.location.href = '/#/login';
						 } else {
						 		vm.message = data.msg;
						 }
						 
						})
					} else {
						vm.message  = "Enter Your Password to continue ";
					}					
				}

				/* upload profile picture '''''''''''''''''''''''''''''''''''''''''''''''''''''*/
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
        		/* upload profile picture end .........  */ 
			}
			
}())