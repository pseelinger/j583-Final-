var express = require('express');
var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');
var pages = require('./controllers/pages');

app.get('/', pages.knowledge);
app.get('/credits', pages.credits);
app.get('/spending', pages.bubble);

//start the server
app.listen(8080, function(){
  console.log("Express server started");
});
