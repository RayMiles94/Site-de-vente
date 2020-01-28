var PouchDB = require('pouchdb');
var db = new PouchDB('my_database');

 db.put({
    _id: 'mydoc1',
    title: 'Heroes'
  }, function(err, response) {
    if (err) { return console.log(err); }
   console.log('add')
  }); 

  db.put({
    _id: 'mydoc2',
    title: 'Heroes'
  }, function(err, response) {
    if (err) { return console.log(err); }
   console.log('add')
  }); 

  db.put({
    _id: 'mydoc3',
    title: 'Heroes'
  }, function(err, response) {
    if (err) { return console.log(err); }
   console.log('add')
  }); 

  db.get('mydoc', function(err, doc) {
    if (err) { return console.log(err); }
    console.log(doc)
  });

  db.allDocs({
    include_docs: true,
    attachments: false
  }, function(err, response) {
    if (err) { return console.log(err); }
    console.log(response)
  });