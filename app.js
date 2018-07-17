const express = require('express');
const mysql = require('mysql');
const models = require('./models');
const bodyParser = require('body-parser');
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.get( '/', function(rqst, resp) {
    models.User.findAll({order: [['created_at', 'DESC']]}).then(users => {
        //console.log('xxxxx=>', users );
        resp.render("home",{data:users})
    }).catch(err => {
        throw err
    })
});

/* app.get("/register", function(req, res){
    var person = {
        email: req.query.email
    };
    connection.query('INSERT INTO users SET ?', person, function(err, result) {
        if (err) throw err;
        res.redirect("/");
    });
}); 

app.get("/signUp", function(req, res) {
    res.render("register");
})*/

app.post("/register", function(req, res){

    models.User.create({  
        email: req.body.email,
      })
      .then(newUser => {
        //console.log("new user--->",newUser);
        res.redirect("/");
      });
});

app.listen(9090, function () {
    console.log('App listening on port 9090!');
});