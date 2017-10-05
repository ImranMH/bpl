
(function(){
	'use strict'
	angular
			.module('weblink')
			.factory('WeblinkService', weblinkService)

			//weblinkService.$inject['$http'];
			
			function weblinkService($http) {
				
				var service = {
					addNewLink: addNewLink,
					getAllWebLink: getAllWebLink,
					getAllWebLinkSkip: getAllWebLinkSkip,
					getLoginUserDetail: getLoginUserDetail,
					registerSiteToUser: registerSiteToUser,
					getLinkById: getLinkById,
					editWebLink: editWebLink,
					getLinkByType: getLinkByType,
					addToBookmark: addToBookmark,
					searchLink: searchLink,
					unWatchMovie: unWatchMovie,
					addToInterestList: addToInterestList,
					addToUnInterestList: addToUnInterestList,
					test : test
				}
				return service;
				function test(type){
					return $http.post("/weblink/test", type)
				}
				function addNewLink(link) {
					return $http.post("/weblink/new", link)
				}

				function getAllWebLink() {

					return $http.get("/weblink/all")
				}
				function getAllWebLinkSkip(skip) {
					var data ={skip:skip}
					return $http.get("/weblink/skip",{ params:data})
				}
				function getLoginUserDetail(id) {

					return $http.get("/user/home")
				}

				function getLinkById(id) {

					return $http.get("/weblink/"+id)
				}
				function searchLink(item) {

					return $http.post("/weblink/search", item)
					//$http({method:'GET', url:'/weblink/search', params:{link: item}})
				}


				function registerSiteToUser(id,data) {

					return $http.post("/weblink/"+id+"/registeredlink", data)
				}
				function editWebLink(id, data) {
					console.log('reach');
					return $http.put("/weblink/"+id+"/edit", data)
				}

				function getLinkByType(type) {
					var sss = 'my name is imran';
					var req = {
					 method: 'GET',
					 url: "/weblink/type",
					 params: { query: {
					 	type: type
					 } }
					}
					return $http(req)
				}
				function addToBookmark(id) {

					return $http.post("/weblink/bookmark",{id})
				}
				function unWatchMovie(id) {

					return $http.put("/movie/"+id+"/watch")
				}
				function addToInterestList(id) {

					return $http.post("/movie/"+id+"/interest")
				}
					function addToUnInterestList(id) {

					return $http.put("/movie/"+id+"/interest")
				}


			}
			
}())