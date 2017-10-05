var devDBName =  'angularJs-chat';
var ProDBName = 'testapp';
var dbUser = 'admin';
var dbPassword = 't_R99JE_VF4t';

// var options = {
//   server: { poolSize: 1 }
// }	

module.exports = {
	//inDev : 'mongodb://127.0.0.1:27017/movie-gassip',
	inPro: 'mongodb://$OPENSHIFT_MONGODB_DB_HOST:$OPENSHIFT_MONGODB_DB_PORT/',
	dev : 'mongodb://127.0.0.1:27017/'+devDBName,
	pro: 'mongodb://'+dbUser+':'+dbPassword+'@ds139817.mlab.com:39817/'+ProDBName,
	options : {
	  server: { poolSize: 1 }
	}	
}



/*


MongoDB 2.4 database added.  Please make note of these credentials:

   Root User:     admin
   Root Password: t_R99JE_VF4t
   Database Name: testapp

Connection URL: mongodb://$OPENSHIFT_MONGODB_DB_HOST:$OPENSHIFT_MONGODB_DB_PORT/

*/


/* rockmongo details

Please make note of these MongoDB credentials:
  RockMongo User: admin
  RockMongo Password: t_R99JE_VF4t
URL: https://testapp-malhub.rhcloud.com/rockmongo/

*/