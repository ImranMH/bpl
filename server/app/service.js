var Users = require('./schema')
module.exports = function(app) {
  app.route('/user')
      .get(function(req, res) {
        console.log('user');
        Users.find({}, function(err, user) {
          if(err) throw console.error();
            res.json(user)
        })

      })

  app.route('/user/register')
      .post(function(req, res) {
        console.log('here');
        var userbody = req.body;
        var user = new Users({
          username: userbody.username,
          password: userbody.password,
          name: userbody.name
        });
        user.save(function(err, doc) {
          if( err) throw err
          console.log("successfully add user");
          res.json(doc)
        })


      })

  app.route('/user/login')
      .post(function(req ,res) {
        var user = req.body;
        Users.findOne({username: user.username, password:user.password}, function(err, doc) {
          if(err) throw err;
          if (doc) {
            res.json(doc)
          } else {
            res.send(req.body)
          }
        });

      })
}
