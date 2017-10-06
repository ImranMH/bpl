
const express = require('express')
    ,cookieParser = require('cookie-parser')
    ,bodyParser   = require('body-parser')
    ,session      = require('express-session')
    //,RedisStore = require('connect-redis')(session)
    ,flash           = require('connect-flash')
    ,mongoose       = require('mongoose')    
    ,passport       = require('passport');

    // var redis = require("redis"),
    // client = redis.createClient();
const MongoStore = require('connect-mongo')(session);
const app     = express()
const env     = process.env;
// const port    = env.NODE_PORT || 8080
// const ip    = env.NODE_IP || '0.0.0.0'
//var register = require('./register')
var configDB = require('./server/config/database');
var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
    mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL,
    mongoURLLabel = "";

if (mongoURL == null && process.env.DATABASE_SERVICE_NAME) {
  var mongoServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase(),
      mongoHost = process.env[mongoServiceName + '_SERVICE_HOST'],
      mongoPort = process.env[mongoServiceName + '_SERVICE_PORT'],
      mongoDatabase = process.env[mongoServiceName + '_DATABASE'],
      mongoPassword = process.env[mongoServiceName + '_PASSWORD']
      mongoUser = process.env[mongoServiceName + '_USER'];

  if (mongoHost && mongoPort && mongoDatabase) {
    mongoURLLabel = mongoURL = 'mongodb://';
    if (mongoUser && mongoPassword) {
      mongoURL += mongoUser + ':' + mongoPassword + '@';
    }
    // Provide UI label that excludes user id and pw
    mongoURLLabel += mongoHost + ':' + mongoPort + '/' + mongoDatabase;
    mongoURL += mongoHost + ':' +  mongoPort + '/' + mongoDatabase;

  }
}



 var connectingString = configDB.dev
 if (env.OPENSHIFT_MONGODB_DB_URL) {
  connectingString = mongoURL
 }
 mongoose.connect(connectingString);

app.use('/lib', express.static(__dirname + '/node_modules'));
app.use( express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
/* creating static directory*/


//app.use(session({secret: 'supernova', saveUninitialized: false, resave: false}));
app.use(session({
  secret: 'hai you',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({
    mongooseConnection: mongoose.connection 
  })
  //store: new RedisStore({ host: 'localhost', port: 6379, client: client,ttl :  260}),
}))
//app.use(session({store: new RedisStore({ host: 'localhost', port: 6379, client: redis }),secret: 'supernova', saveUninitialized: false, resave: false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); // use connect-flash for flash messages stored in session

//require('./server/index')(app, passport);

//app.use('/register', register)
// client.on('connect', function() {
//   console.log('redis server connceted...');
// })
// client.on('error', function (er) {
//   console.dir(err);
// })
// app.get('/apis/data', (req,res)=>{
//   res.json(data)
// })
// app.get('/apis/st', (req,res)=>{
//   res.json(connectingString)
// })
// app.get('/apis/data/:index', (req,res)=>{
//   res.json(data[req.params.index])
// })
// app.get('/apis/process', (req,res)=>{
//   res.json(process.env)
// })
// app.get('/', function (req, res) {
//   res.send('Hello World!')
// })

//require('./server/app/app')(app)
//require('./server/index')(app, passport);

  var UserModel = require('./server/app/models/index.model').user;
  var WeblinkModel = require('./server/app/models/index.model').weblink;
  var RegWeblinkModel = require('./server/app/models/index.model').registerWeblink;

  var userApis = require('./server/app/controller/user.ctrl')(passport)
  var weblink = require('./server/app/controller/weblink.ctrl')

  var passportInit = require('./server/config/passport');
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

  app.use('/user', userApis)
  app.use('/weblink', weblink)
  app.listen(port, ip, function () {
  console.log(`Application worker ${process.pid} started on ${port}..........`)
})



