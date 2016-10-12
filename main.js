var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  //response.render('index');
  response.render('index');
});

app.post('/process_get', function (req, res) {
   // Prepare output in JSON format
   response = {
      firstName:req.body.firstName,
      lastName:req.body.lastName
   };
   console.log(response);
   res.end(JSON.stringify(response));
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});