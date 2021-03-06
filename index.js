
/* jabri raouf :site du vente en ligne ecrire en javascript */
/* version 1.1 */
/* master branch */
const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const bwip = require('bwip-js');
const logger = require('./src/logger.js');

const database = require('./src/database.js');

const {whenonline, whenoffline} = require('./src/account.js');


const productsdata = require('./src/data.js');
const secret = require('./src/secret.js');

app.disable('x-powered-by');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: secret.mail, saveUninitialized: true, resave: true}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', function(req, res) {
  logger(req);
  const online = req.session;
  if (online.account) {
    database.fetch(whenonline, res, 'index');
  } else {
    database.fetch(whenoffline, res, 'index');
  }
});

app.get('/products', function(req, res) {
  logger(req);
  const online = req.session;
  if (online.account) {
    database.fetch(whenonline, res, 'products');
  } else {
    database.fetch(whenoffline, res, 'products');
  }
});

app.get('/products/:product', function(req, res) {
  logger(req);
  const online = req.session;
  if (online.account) {
    database.findrecord('product', whenonline, req.params.product, res);
  } else {
    database.findrecord('product', whenoffline, req.params.product, res);
  }
});

app.get('/login', function(req, res) {
  logger(req);
  res.render('login');
});

app.get('/signup', function(req, res) {
  logger(req);
  res.render('signup');
});

app.get('/getlogin', function(req, res) {
  logger(req);
  const online = req.session;
  if (online.account) {
    database.fetch(whenonline, res, 'index');
  } else {
    database.fetch(whenoffline, res, 'index');
  }
});

app.get('/logout', function(req, res) {
  logger(req);
  const online = req.session;
  online.destroy();
  res.render('index', {
    account: whenoffline,
    products: productsdata,
  });
});

app.get('/signformsend', function(req, res) {
  logger(req);
  const online = req.session;
  secret.login = req.query.login;
  secret.mail = req.query.email;
  secret.password = req.query.password;
  online.account = secret;
  const user = {
    login: secret.login,
    mail: secret.mail,
    password: secret.password,
  };
  database.insert(user);
  if (online.account) {
    database.fetch(whenonline, res, 'index');
  } else {
    database.fetch(whenoffline, res, 'index');
  }
});


app.get('/usercheck', function(req, res) {
  logger(req);
  database.checkuser(res, req.query.login);
});

app.get('/userchecklogin', function(req, res) {
  logger(req);
  database.checkuserlogin(res, req.query);
});

app.get('/loginsucc', function(req, res) {
  logger(req);
  const online = req.session;
  secret.login = req.query.login;
  secret.mail = req.query.email;
  secret.password = req.query.password;
  online.account = secret;
  const user = {
    login: secret.login,
    mail: secret.mail,
    password: secret.password,
  };
  database.insert(user);
  if (online.account) {
    database.fetch(whenonline, res, 'index');
  } else {
    database.fetch(whenoffline, res, 'index');
  }
});

app.get('/myaccount', function(req, res) {
  logger(req);
  const online = req.session;
  console.log(online.account);
  if (online.account) {
    res.render('myaccount', {account: whenonline, user: online.account} );
  } else {
    res.render('404');
  }
});

app.get('/barcode', function(req, res) {
  logger(req);
  bwip.toBuffer({
    bcid: 'datamatrix', // Barcode type
    text: req.query.text, // Text to encode
    scale: 3, // 3x scaling factor
    height: 10, // Bar height, in millimeters
    includetext: true, // Show human-readable text
    textxalign: 'center', // Always good to set this
  }, function(err, png) {
    if (err) {
      console.log(err);
      res.send('error');
    } else {
      res.end(png, 'binary');
    }
  });
});

app.get('/insertcontact', function(req, res) {
  database.insertcontact(res, req);
});

app.get('/addproduct', function(req, res) {
  logger(req);
  const online = req.session;
  if (online.account) {
    res.render('addproduct', {account: whenonline});
  } else {
    res.render('addproduct', {account: whenoffline});
  }
});

app.get('/saveproductindb', function(req, res) {
  logger(req);
  database.saveproductdb(req, res);
});

/* 404 not found route */
app.use(function(req, res, next) {
  logger(req);
  res.status(404);
  res.render('404');
});

const server = http.createServer(app);
const PORT = process.env.PORT || 4500;

server.listen(PORT, function() {
  console.log('Server work fine!!! in PORT:', PORT);
});
