(function(){
	'use strict'
	angular
			.module('weblink')
			.controller('WebLinkDetailsCtrl', WebLinkDetailsCtrl)
			.controller('WebLinkEditCtrl', WebLinkEditCtrl)
			.controller('WebLinkRegisterCtrl', WebLinkRegisterCtrl)

			WebLinkDetailsCtrl.$inject = ['$location','$rootScope','WeblinkService','UserService','$stateParams'];
			WebLinkEditCtrl.$inject = ['WeblinkService','UserService','$stateParams'];
			WebLinkRegisterCtrl.$inject = ['$window','WeblinkService','UserService','$stateParams'];

			function WebLinkDetailsCtrl( $location,$rootScope, WeblinkService,UserService, $stateParams) {

				var vm = this;
				vm.btn_title = 'Register Now'
				//vm.showLinkEdit = showLinkEdit;
				//vm.register_link = register_link;
				var id =$stateParams.id
				vm.findtype = findsameType;
				//var userId = $rootScope.globals.currentUser._id;
				activate();

				function activate() {
					WeblinkService.getLinkById(id).then(function(link){
						
						vm.data= link.data;
						vm.author = link.author;
						vm.bookmarked = link.data.bookmarked;
						console.log(link);
						vm.addToBookmark= addToBookmark;
						var link = link.data;
						vm.similar = link.similar

						if(link.user) {
							vm.link_detail = link.weblink;

						} else {

							vm.message = link.msg
							vm.similar = link.similar
							vm.link_detail = link.weblink;
							vm.ShowRegisterLink = false
							vm.user = link.user
							console.log(link);
						}
								 
					})

				 }
					function findsameType(type){
						var data = {
							type:type
						}
						WeblinkService.test(data).then((res)=>{
							console.log(res);
						})
					}
				function addToBookmark(id) {
				 	WeblinkService.addToBookmark(id).then((res)=> {
				 		vm.bookmarked = true;
				 	})
				 }
				 function showLinkEdit() {

				 	if(!vm.ShowRegisterLink) {
				 			
				 			vm.btn_title = 'Cancel'
				 			vm.ShowRegisterLink = true
				 	} else {
				 		vm.btn_title = 'Register Now'
				 		vm.ShowRegisterLink = false
				 	}
				 }

			}

			/* Edit a Webblink*/
			function WebLinkEditCtrl(WeblinkService,UserService,$stateParams) {
				var vm = this;
				
				vm.EditWebLink = EditWebLink;
				var id =$stateParams.id;

				activate();

				function activate() {
					WeblinkService.getLinkById(id).then(function(link){
						
						vm.data= link.data
						vm.author = link.author
				 
					})

				 }
				function EditWebLink(data) {
					console.log(data);

					return WeblinkService.editWebLink(id,data).then(function(res){
						vm.message = res.data.msg;						
					})
				}
			}


			/*  Weblink REGISTER as userList.............*/
			function WebLinkRegisterCtrl($window, WeblinkService,UserService,$stateParams) {

				var vm = this;
				
				vm.register_link = register_link;
				var id =$stateParams.id;

				activate();

				function activate() {
					WeblinkService.getLinkById(id).then(function(link){
						console.log(link);
						vm.data= link.data;
						vm.author = link.author;				 
					})

				 }
				function register_link(link) {

					return WeblinkService.registerSiteToUser(id, link).then(function(res){
						console.log(res);
						var resdata = res.data; 
						$window.location.href = '/#/home/'+resdata.user.username+'/registered/'+resdata.regLink._id;						
					})
				}
				
			}
}())