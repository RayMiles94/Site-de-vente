var PouchDB = require('pouchdb');
var db = new PouchDB('site_de_vente');

/*
@for insert product data in database@
for (let index = 0; index < 30; index++) {
  db.put({
    _id: "P" + index.toString(),
    ref : "P" + index.toString(),
    name : "Product " + "N" +   index.toString(),
    description : "description...",
    price : ((index * 10) - (index * 2)).toString() + "$"
  }, function(err, response) {
    if (err) { return console.log(err); }
   console.log('add' + index.toString())
  });
 
}
*/

function inseruser(user) {
  db.put({
    login : user.login,
    mail : user.mail,
    password : user.password
  }, function (err, response) {
    if(err) { return console.log(err); }
     console.log('insert data in databse is done!!!')
  });
}

  function displaydocs() {
    var data = [];
    db.allDocs({
      include_docs: true,
      attachments: false
    }, function(err, response) {
      if (err) { return console.log(err); }
      
    }).then(function (result) {
      var array = [];
      for (let index = 0; index < result.rows.length; index++) {
        array.push(result.rows[index].doc);  
      }
      return array;
    });
    console.log(data);
    return data;
  }


  module.exports = {
    fetch: displaydocs,
    insert : inseruser
  }
  