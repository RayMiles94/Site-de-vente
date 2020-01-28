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
        res.render('index',{ account : whenonline, products: database.fetch() } );
    }
    else {
        res.render('index', { account : whenoffline, products: database.fetch() }); 
    }
});

app.get('/products', function (req, res) {
    var online = req.session;
    if (online.account){
        res.render('products', { account : whenonline, products: productsdata }); 
   }
   else {
    res.render('products', { account : whenoffline, products: productsdata });
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

app.get('/getlogin', function (req, res, next) {
    var online = req.session;
    res.render('index', { products: productsdata });
    var data = req.query;
    next();
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
   //res.status(200).json(req.query);
   res.render('index', { account : whenonline ,  products: productsdata});
});

app.get('/products/:product', function (req, res) {
    var online = req.session;
    var find = {}
    for (let index = 0; index < productsdata.length; index++) {
        if (req.params.product == productsdata[index].ref){
            find = productsdata[index];
        } 
    }
    if (online.account){
        res.render('product', { data  : find, account : whenonline}); 
    }
    else {
        res.render('product', { data : find , account: whenoffline});
    }
});

var server = http.createServer(app);
const PORT = process.env.PORT || 3500;
server.listen(PORT, function () {
    console.log("Server work fine!!!");
})