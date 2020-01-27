var express = require('express');
var app = express();
var http = require('http');
var path = require('path')
const bodyParser = require('body-parser');

var productsdata = require('./src/data.js');

app.disable('x-powered-by');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'hbs');
app.set("views", path.join(__dirname, 'views'));

app.get('/', function (req, res) {
    res.render('index', { products: productsdata });
});

app.get('/products/:product', function (req, res) {
    var find = {}
    for (let index = 0; index < productsdata.length; index++) {
        if (req.params.product == productsdata[index].ref){
            find = productsdata[index];
        } 
    }
    res.render('product', { data  : find}); 
});

var server = http.createServer(app);
const PORT = process.env.PORT || 3500;
server.listen(PORT, function () {
    console.log("Server work fine!!!");
})