const mysql      = require('mysql');
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'me',
    password : 'secret',
    database : 'my_db'
});

connection.connect();

function Sql() {
    this.inBlacklist = function (address) {
        return false;
    }
    this.queryAllWords = function () {
        return 0;
    }
    this.addWords = function (words){

    }
    this.addBlacklist = function (address) {

    }
    this.removeBlacklist = function (address) {

    }
}
module.exports = Sql