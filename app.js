var express = require('express');
var exphbs = require('express-handlebars');
var port = process.env.PORT || 3000

var app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
});

app.use(express.static('assets'));

app.use('/assets', express.static(__dirname + '/assets'));

app.use(require('./routes'));

app.get('/', function(req, res) {
    res.render('home');
});

app.get('/success', function(req, res) {
    console.log(req.query);
    res.render('success', req.query);
});

app.get('/failure', function(req, res) {
    res.render('failure');
});

app.get('/pending', function(req, res) {
    res.render('pending');
});

app.get('/detail', function(req, res) {
    res.render('detail', req.query);
});

app.listen(port);