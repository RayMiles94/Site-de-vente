var PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));
var db = new PouchDB('site_de_vente');

/*
    @string  insert product data in database
*/

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


/*
    @string  insert user data in database
*/
for (let index = 0; index < 10; index++) {
    db.put({
        _id: index.toString()+"a",
        login: 'login' + index.toString(),
        mail: 'mail' + index.toString() + '@mail.com',
        password: 'password'+index.toString()
    }, function (err, response) {
        if (err) {
            return console.log(err);
        }
        console.log('insert user data in databse is done!!!')
    });
  }


let done = 'Done!!!';
console.log(done);

module.exports = done;
