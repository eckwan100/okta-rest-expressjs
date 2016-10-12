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

app.post('/create_user', urlencodedParser, function (req, res) {

  var options = {
      host: 'https://edwindemo.oktapreview.com',
      port: 443,
      path: '/api/v1?activate=false',
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'SSWS 00seiYOZWjGKD0vTgY4a5l0ZGNPaEeA2Sg8WSrUXYk'
      },
      body: JSON.stringify({
        profile: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          login: req.body.email
        }
      })
  };

   // Prepare output in JSON format
   /*response = {
      firstName:req.body.firstName,
      lastName:req.body.lastName
   };
   console.log(response);
   res.end(JSON.stringify(response));
  */
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