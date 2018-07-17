var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database : 'node_mysql_connection'
});

app.get( '/', function(rqst, resp) {
    var q = 'SELECT * FROM users order by created_at desc';
    connection.query(q, function (error, results) {
        if (error) throw error;
        resp.render("home", {data: results});
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
}); */

app.get("/signUp", function(req, res) {
    res.render("register");
})

app.post("/register", function(req, res){
    var person = {
        email: req.body.email
    };
    connection.query('INSERT INTO users SET ?', person, function(err, result) {
        if (err) throw err;
        res.redirect("/");
    });
});

app.listen(9090, function () {
    console.log('App listening on port 9090!');
});