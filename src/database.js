var PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));
var db = new PouchDB('site_de_vente');

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

 
function inseruser(user) {
    db.put({
        _id: makeid(5),
        login: user.login,
        mail: user.mail,
        password: user.password
    }, function (err, response) {
        if (err) {
            return console.log(err);
        }
        console.log('insert data in databse is done!!!')
    });
}

function checkuser(res, data){
    db.allDocs({
        include_docs: true,
        attachments: false
    }, function (err, response) {
        if (err) {
            return console.log(err);
        }

    }).then(function (result) {
        var array = [];
        for (let index = 0; index < result.rows.length; index++) {
            array.push(result.rows[index].doc);
        }

        var finduser = [];
        var ok = false;
        for (let index = 0; index < array.length; index++) {
            if ('login' in array[index]){
                finduser.push(array[index]);
            }
        }

        for (let index = 0; index < finduser.length; index++) {
            if (finduser[index].login==data){
                ok=true;
            }
        }

        
        res.setHeader('Content-Type', 'application/json');
        if (ok){
            res.end(JSON.stringify({ reponse:'found' }));
        }
        else {
            res.end(JSON.stringify({ reponse: 'not'}))
        }
    });
}


function displaydocs(state, res, page) {
    db.allDocs({
        include_docs: true,
        attachments: false
    }, function (err, response) {
        if (err) {
            return console.log(err);
        }

    }).then(function (result) {
        var array = [];
        for (let index = 0; index < result.rows.length; index++) {
            if ('name' in result.rows[index].doc) {
                array.push(result.rows[index].doc);
            }
        }
        res.render(page, {
            account: state,
            products: array
        });
    });

}

function findrecord(page, state, x, res) {
    db.allDocs({
        include_docs: true,
        attachments: false
    }, function (err, response) {
        if (err) {
            return console.log(err);
        }

    }).then(function (result) {
        var array = [];
        for (let index = 0; index < result.rows.length; index++) {
            array.push(result.rows[index].doc);
        }
        var find;
        for (let index = 0; index < array.length; index++) {
            if (x == array[index].ref) {
                find = array[index];
            }
        }
        res.render(page, {
            data: find,
            account: state
        });
    });
}

function createuser(user, res, req) {
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

module.exports = {
    fetch: displaydocs,
    insert: inseruser,
    checkuser: checkuser,
    findrecord: findrecord,
    createuser: createuser,
}
