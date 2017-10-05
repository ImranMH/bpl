(function() {
	'use strict';

	angular
		.module('weblink')
		.config(config)
		.run(run)

		config.$inject = ['$stateProvider', '$urlRouterProvider'];

		function config($stateProvider, $urlRouterProvider) {
			$urlRouterProvider.otherwise('/');

			$stateProvider
				.state('feed', {
					url: '/',
					templateUrl: '/view/feed/feed.html',
					controller: 'feedCtrl',
					controllerAs: 'vm'
				})
				.state('home', {
					abstract: true,
					url:'/home/:username',
					templateUrl: '/view/home/home.html',
					controller: 'homeCtrl',
					controllerAs: 'vm'
				})
				.state('home.feed', {
					url:'',
					templateUrl: '/view/home/feed.html',
					controller: 'HomeFeedCtrl',
					controllerAs: 'vm'
				})
				.state('home.new', {
					url:'/new',
					templateUrl: '/view/home/new.html',
					controller: 'NewLinkCtrl',
					controllerAs: 'vm'
				})
				.state('home.bookmarked', {
					url:'/bookmark',
					templateUrl:'/view/home/bookmarked.html',
					controller: 'HomeBookmarkCtrl',
					controllerAs: 'vm'
				})
				.state('home.weblinkRegisterList', {
					url:'/registered',
					templateUrl:'/view/home/registered.html',
					controller: 'HomeRegCtrl',
					controllerAs: 'vm'
				})
				.state('home.weblinkRegisterDetails', {
					url:'/registered/:weblinkId',
					templateUrl:'/view/home/registeredlink-detail.html',
					controller: 'HomeRegDetailCtrl',
					controllerAs: 'vm'
				})
				.state('home.following', {
					url:'/following',
					templateUrl:'/view/home/following.html',
					controller: 'HomeFollowingCtrl',
					controllerAs: 'vm'
				})
				.state('home.followers', {
					url:'/followers',
					templateUrl:'/view/home/follower.html',
					controller: 'HomeFollowerCtrl',
					controllerAs: 'vm'
				})
				.state('register', {
					url: '/register',
					templateUrl: '/view/register/register.html',
					controller: 'registerCtrl',
					controllerAs: 'vm'
				})
				.state('login', {
					url: '/login',
					templateUrl: '/view/login/login.html',
					controller: 'loginCtrl',
					controllerAs: 'vm'
				})
				.state('user', {
					url: '/user',
					templateUrl: '/view/user/user.html',
					controller: 'UserCtrl',
					controllerAs: 'vm'
				})
				.state('singleUser', {
					abstract: true,
					url: '/user/:id',
					templateUrl: '/view/profile/profile.html',
					controller: 'ProfileCtrl',
					controllerAs: 'vm'
				})
				.state('singleUser.feed', {
					url: '',
					templateUrl: '/view/profile/feed.html',
					controller: 'ProfileCtrl',
					controllerAs: 'vm'
				})
				.state('singleUser.bookmarked', {
					url: '/bookmark',
					templateUrl: '/view/home/bookmarked.html',
					controller: 'ProfileBookmarkCtrl',
					controllerAs: 'vm'
				})
				.state('singleUser.weblinkRegisterList', {
					url: '/registered',
					templateUrl: '/view/profile/registered.html',
					controller: 'ProfileRegCtrl',
					controllerAs: 'vm'
				})
				.state('singleUser.followers', {
					url: '/followers',
					templateUrl: '/view/profile/follower.html',
					controller: 'ProfileFollowerCtrl',
					controllerAs: 'vm'
				})
				.state('singleUser.following', {
					url: '/following',
					templateUrl: '/view/profile/following.html',
					controller: 'ProfileFollowingCtrl',
					controllerAs: 'vm'
				})
				.state('edit', {
					url: '/edit/:username',
					templateUrl: '/view/edit/edit.html',
					controller: 'EditCtrl',
					controllerAs: 'vm'
				})
				.state('/chat', {
					templateUrl: '/view/chat/chat.html',
					controller: 'ChatCtrl',
					controllerAs: 'vm'
				})
				.state('/movie/:id', {
					templateUrl: '/view/details/details.html',
					controller: 'MovDetailsCtrl',
					controllerAs: 'vm'
				})
				
				
				.state('weblinkDetail', {
					url: '/weblink/:id',
					templateUrl: '/view/webLinkDetails/webLinkDetails.html',
					controller: 'WebLinkDetailsCtrl',
					controllerAs: 'vm'
				})
				.state('weblinkDetail.edit', {
					url: '/edit',
					templateUrl: '/view/webLinkDetails/webLinkedit.html',
					controller: 'WebLinkEditCtrl',
					controllerAs: 'vm'
				})
				.state('weblinkDetail.registerWeblink', {
					url: '/registerWeblink',
					templateUrl: '/view/webLinkDetails/webLinkregister.html',
					controller: 'WebLinkRegisterCtrl',
					controllerAs: 'vm'
				})
				.state('/home/search', {
					templateUrl: '/view/search/search.html',
					controller: 'searchCtrl',
					controllerAs: 'vm'
				})
				//.otherwise({ redirectTo:'/home'})
		}


		run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
    function run($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser; // jshint ignore:line
        }
 
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
           
        });
    }
} ());


