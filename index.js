var express = require('express');
var app = express();
var http = require('http');
var path = require('path')
const bodyParser = require('body-parser');
const session = require('express-session');

var database = require('./src/database.js');

var { whenonline, whenoffline } = require('./src/account.js');


var productsdata = require('./src/data.js');
var secret = require('./src/secret.js');

app.disable('x-powered-by');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: secret.mail , 
                  saveUninitialized: true , 
                  resave : true })
        );

app.set('view engine', 'hbs');
app.set("views", path.join(__dirname, 'views'));

app.get('/', function (req, res) {
    var online = req.session;
    if (online.account){
        database.fetch(whenonline, res, 'index');
    }
    else {
        database.fetch(whenoffline, res, 'index'); 
    }
});

app.get('/products', function (req, res) {
    var online = req.session;
    if (online.account){
        database.fetch(whenonline, res, 'products'); 
   }
   else {
    database.fetch(whenoffline, res, 'products');
   }
});

app.get('/products/:product', function (req, res) {
    var online = req.session;
    if (online.account){ 
        database.findrecord('product',whenonline, req.params.product, res);
    }
    else {
        database.findrecord('product', whenoffline, req.params.product, res);
    }
});

app.get('/login', function (req, res) {
    var online = req.session;
    res.render('login')
});

app.get('/signup', function (req, res) {
    var online = req.session;  
    res.render('signup');
});

app.get('/getlogin', function (req, res) {
    var online = req.session;
    if (online.account){
        database.fetch(whenonline, res, 'index');
    }
    else {
        database.fetch(whenoffline, res, 'index'); 
    }
});

app.get('/logout', function (req, res) {
   var online = req.session;
   online.destroy();
   res.render('index', { account : whenoffline, products: productsdata }) 
});

app.get('/signformsend', function (req, res) {
   var online = req.session;
   secret.login = req.query.login;
   secret.mail = req.query.email;
   secret.password = req.query.password;
   online.account =  secret;
    if (online.account){
        database.fetch(whenonline, res, 'index');
    }
    else {
        database.fetch(whenoffline, res, 'index'); 
    }
});


app.use(function (req, res, next) {
   res.status(404);
   res.render('404'); 
});

var server = http.createServer(app);
const PORT = process.env.PORT || 3500;
server.listen(PORT, function () {
    console.log("Server work fine!!!");
})