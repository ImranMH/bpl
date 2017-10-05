/*const express = require('express')
const mongoose = require('mongoose')
//const mongoose = require('mongoose')

const router = express.Router()


//var bcrypt = require('bcryptjs')


	var Schema = mongoose.Schema;

	UserSchema = new Schema({
		username: {type:String, lowercase: true, unique: true},				
		name: {type:String },
		password: String,
		email: {type:String, lowercase: true, unique: true},
		join_at: {type: Date, default: Date.now},	
	})

	

var User = mongoose.model('User', UserSchema);
router.route('/all')
		.get((req,res)=>{
			User.find({}, function(err, user){
				res.json(user)
			})
		})
router.route('/')
		.get((req,res)=>{
			User.find({}, function(err, user){
				res.json(user)
			})
		})
		.post((req,res)=>{
			if (req.body) {
				var newUser = new User({})
				newUser.username = req.body.username;
				newUser.password = req.body.password;
				newUser.name = req.body.name;

				newUser.save((err, res)=>{
					if (err) throw err
					console.log(res);	
				console.log(newUser);
				})
			}
			
			
		})

module.exports = router;*/