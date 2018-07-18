const express = require('express');
const mysql = require('mysql');
const models = require('./models');
const bodyParser = require('body-parser');
const async = require('async');
const app = express();

const env = 'redis'; //process.env.NODE_ENV || 'development';
const config = require('./config/config.js')[env];
const redis = require("redis");
// Add your cache name and access key.
const client = redis.createClient(config.port, config.host);
client.auth(config.password);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

client.on('connect', function(o) {
    console.log("success connection");
});

app.get( '/', function(rqst, resp) {
    models.User.findAll({order: [['created_At', 'DESC']]}).then(users => {
        resp.render("home",{data:users})
    }).catch(err => {
        resp.render("error",{data:err})
        //throw err
    })
});

app.get( '/getData', function(rqst, resp) {
    var jobs = [];
    client.keys('*', function (err, keys) {
        if (err) return console.log(err);
        if(keys){
            async.map(keys, function(key, cb) {
               client.hgetall(key, function (error, value) {
                    if (error) return cb(error);
                    var job = {};
                    job['userId']=key;
                    job['data']=value;
                     cb(null, job);
                 }); 
            }, function (error, results) {
               if (error) {
                 console.log(error);
                 resp.render("error",{data:error})
               }else{
                resp.render("getRedisData",{data:results})
               }
            });
        }
    });
});


function addData (key, data){
//app.get( '/addData', function(rqst, resp) {
	client.hmset(key, {"email":data ,"time":new Date()}, function(error, reply) {
		if (error) {
            console.log("error",error);
            //resp.render("error",{data:error})
            return error;
		} else {
            console.log("success",reply);
            //resp.render("postRedisData",{data:reply})
            return reply;
		}
    });
//});
} 

function deleteData (key){
    //app.get( '/addData', function(rqst, resp) {
        client.del(key, function(error, reply) {
            if (error) {
                console.log("error",error);
                //resp.render("error",{data:error})
                return error;
            } else {
                console.log("success",reply);
                //resp.render("postRedisData",{data:reply})
                return reply;
            }
        });
    //});
    } 



app.post("/register", function(req, res){

    models.User.create({  
        email: req.body.email,
      })
      .then(newUser => {
       let response = addData(newUser.userId,req.body.email);
       console.log(response);
        res.redirect("/getData");
       
      })
      .catch(err => {
            res.render("error",{data:err})
      })
});

app.post("/deleteUser", function(req, res){

    models.User.destroy({ 
        where: {
            userId: req.body.userId,
        } 
      })
      .then(newUser => {
       let response = deleteData(req.body.userId);
       console.log(response);
        res.redirect("/getData");
       
      })
      .catch(err => {
            res.render("error",{data:err})
      })
});

app.listen(8080, function () {
    console.log('App listening on port 8080!');
});