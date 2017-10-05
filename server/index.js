module.exports = function(app, passport) {
	/*exparimental db call here*/
	var UserModel = require('./app/models/index.model').user;
  var WeblinkModel = require('./app/models/index.model').weblink;
	var RegWeblinkModel = require('./app/models/index.model').registerWeblink;

	var userApis = require('./app/controller/user.ctrl')(passport)
	var weblink = require('./app/controller/weblink.ctrl')

	var passportInit = require('./config/passport');
	passportInit(passport)
	

	app.get('/home/:username/registered/:id', function(req, res){
		var username = req.params.username;
		var linkId = req.params.id;
		var user= req.user;
		if(username === user.username) {
			 RegWeblinkModel.getRegisteredLinkDetail(linkId ).then(function(regWeblink){
       //  RegWeblinkModel.getRegisterLinkData(regWeblink).then(function(data){
       //  res.json(data)
       // })
        res.json(regWeblink)
      }, function(err) {
        res.json(err)
      })
		}
	})
	function isLoggedIn (req, res, next) {
		if ( req.isAuthenticated())
			return next();

		res.json('please Login first')
	}
	//app.use('/user', user)
	app.use('/user', userApis)
	app.use('/weblink', weblink)
	
}