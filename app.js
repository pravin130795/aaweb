var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
let userDetails = [{username: 'Alan', version: 1.0}];

app.get( '/api/userDetail', function(reqst, resp) {
    resp.json({data: userDetails});
});

app.post( '/api/userDetail', function(reqst, resp) {
    let userDetail = {username: reqst.body.username, version: reqst.body.version}
    userDetails.push(userDetail);
    resp.json({data: userDetails});
});

app.listen(8000, function () {
    console.log('App listening on port 8000!');
});