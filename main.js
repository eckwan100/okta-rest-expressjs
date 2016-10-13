//var https = require('https');
var request = require('request-promise');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
// create application/json parser 
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser 
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('index');
});

app.post('/get_user', urlencodedParser, function(req, res) {

  var options = {
    uri: 'https://edwindemo.oktapreview.com/api/v1/users/' + req.body.login,
    method: 'GET',
    json: true,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'SSWS 00seiYOZWjGKD0vTgY4a5l0ZGNPaEeA2Sg8WSrUXYk'
    }
  };

  request(options).then(function (response){
      res.status(200).json(response);
  })
  .catch(function(err){ // if rp.get rejects (e.g. 500), do this:
    should.throw.error.to.console(); // test if something is thrown (but nothing has been!)
    var respErr  = JSON.parse(err.error);
    var errorResult = {
        origUrl: respErr.origUrl,
        error: respErr
    };
    results.push(errorResult); // push an object with some of the error info into results
});



});

app.post('/create_user', urlencodedParser, function (req, res) {

  var options = {
      uri: 'https://edwindemo.oktapreview.com/api/v1/users?activate=false',
      method: 'POST',
      json: true,
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'SSWS 00seiYOZWjGKD0vTgY4a5l0ZGNPaEeA2Sg8WSrUXYk'
      },
      body: {
        profile: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          login: req.body.email
        }
      }
  };

  request(options).then(function (response){
      res.status(200).json(response);
  })
  .catch(function (err) {
      console.log(err);
  })

});



app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});