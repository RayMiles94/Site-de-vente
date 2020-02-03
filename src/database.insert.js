var PouchDB = require('pouchdb');
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
let done = 'Done!!!';
console.log(done);

module.exports = done;
