const PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));
const db = new PouchDB('site_de_vente');

/**
 * makeid function.
 * @param {number} length length of string.
 * @return {number} The sum of the two numbers.
 */
function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for ( let i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}


function checkuserlogin(res, data) {
  db.allDocs({
    include_docs: true,
    attachments: false,
  }, function(err, response) {
    if (err) {
      return console.log(err);
    }
  }).then(function(result) {
    const array = [];
    for (let index = 0; index < result.rows.length; index++) {
      array.push(result.rows[index].doc);
    }

    const finduser = [];
    let ok = false;
    for (let index = 0; index < array.length; index++) {
      if ('login' in array[index]) {
        finduser.push(array[index]);
      }
    }
    let userdata = {};
    console.log('started for looking');
    for (let index = 0; index < finduser.length; index++) {
      if ((finduser[index].mail==data.login) && (finduser[index].password==data.password)) {
        ok=true;
        userdata = finduser[index];
        console.log('found');
      }
    }

    res.setHeader('Content-Type', 'application/json');
    if (ok) {
      res.end(JSON.stringify({reponse: 'found', data: userdata}));
    } else {
      res.end(JSON.stringify({reponse: 'not'}));
    }
  });
}

function inseruser(user) {
  db.put({
    _id: makeid(5),
    login: user.login,
    mail: user.mail,
    password: user.password,
  }, function(err, response) {
    if (err) {
      return console.log(err);
    }
    console.log('insert data in databse is done!!!');
  });
}

function checkuser(res, data) {
  db.allDocs({
    include_docs: true,
    attachments: false,
  }, function(err, response) {
    if (err) {
      return console.log(err);
    }
  }).then(function(result) {
    const array = [];
    for (let index = 0; index < result.rows.length; index++) {
      array.push(result.rows[index].doc);
    }

    const finduser = [];
    let ok = false;
    for (let index = 0; index < array.length; index++) {
      if ('login' in array[index]) {
        finduser.push(array[index]);
      }
    }

    for (let index = 0; index < finduser.length; index++) {
      if (finduser[index].login==data) {
        ok=true;
      }
    }

    res.setHeader('Content-Type', 'application/json');
    if (ok) {
      res.end(JSON.stringify({reponse: 'found'}));
    } else {
      res.end(JSON.stringify({reponse: 'not'}));
    }
  });
}


function displaydocs(state, res, page) {
  db.allDocs({
    include_docs: true,
    attachments: false,
  }, function(err, response) {
    if (err) {
      return console.log(err);
    }
  }).then(function(result) {
    const array = [];
    for (let index = 0; index < result.rows.length; index++) {
      if ('name' in result.rows[index].doc) {
        array.push(result.rows[index].doc);
      }
    }
    res.render(page, {
      account: state,
      products: array,
    });
  });
}

function findrecord(page, state, x, res) {
  db.allDocs({
    include_docs: true,
    attachments: false,
  }, function(err, response) {
    if (err) {
      return console.log(err);
    }
  }).then(function(result) {
    const array = [];
    for (let index = 0; index < result.rows.length; index++) {
      array.push(result.rows[index].doc);
    }
    let find;
    for (let index = 0; index < array.length; index++) {
      if (x == array[index].ref) {
        find = array[index];
      }
    }
    res.render(page, {
      data: find,
      account: state,
    });
  });
}

function createuser(user, res, req) {
  db.put({
    _id: index.toString()+'a',
    login: 'login' + index.toString(),
    mail: 'mail' + index.toString() + '@mail.com',
    password: 'password'+index.toString(),
  }, function(err, response) {
    if (err) {
      return console.log(err);
    }
    console.log('insert user data in databse is done!!!');
  });
}

function insertcontact(res, req) {
  const data = {
    mail: req.query.emaildata,
    subject: req.query.subjectdata,
  };
  db.put({
    _id: makeid(10),
    emaildata: data.mail,
    subjectdata: data.subject,
  }, function(err, response) {
    if (err) {
      res.end(JSON.stringify({reponse: 'not save'}));
      return console.log(err);
    }
    res.end(JSON.stringify({reponse: 'save'}));
  });
}

function saveproductdb(req, res) {
  const data = {
    productname: req.query.productname,
    price: req.query.price,
  };
  db.put({
    _id: makeid(10),
    ref: makeid(10),
    name: 'Product ' + 'N' + data.productname.toString(),
    price: data.price + '$',
  }, function(err, response) {
    if (err) {
      res.end(JSON.stringify({reponse: 'not save'}));
      return console.log(err);
    }
    res.end(JSON.stringify({reponse: 'save'}));
  });
}

module.exports = {
  checkuserlogin: checkuserlogin,
  fetch: displaydocs,
  insert: inseruser,
  checkuser: checkuser,
  findrecord: findrecord,
  createuser: createuser,
  insertcontact: insertcontact,
  saveproductdb: saveproductdb,
};
