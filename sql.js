const mysql      = require('mysql');
const config = require('config')
const connection = mysql.createConnection(config.get('sql'));

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
    this.insertChat = function (msg) {

    }
}
module.exports = Sql