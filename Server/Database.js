var MySQL = require("mysql");

/*
Database info:
Server: sql2.freemysqlhosting.net
Database/username: sql2378495
password:wB1!fZ3!
portNm: 3306
table name: Logins
table columns: Username, Password and HighScore
*/
// this is my database connection so I can access it
var Con = MySQL.createConnection({
  host: "sql2.freemysqlhosting.net",
  user: "sql2378495",
  password: "wB1!fZ3!",
  database:"sql2378495"
});

// this is where all actions that need done to the database e.g new player signup / login/ highscore update
module.exports = {
  // here we will check input the signup form into our database
  // we need see if username is already taken if it has send back error
  // if not enter the username and password into the database
  SignUpTo: function SignUpTo(Username, Password) {
    var QueryInsert = `INSERT INTO Logins(Username, Password, HighScore) VALUES ('`+
      Username+`','`+
      Password+`','0')`;

    // if the username does not exist we can succeffully address

    Con.query(QueryInsert, function (err, result) {
      if (err) throw err;
      return true;
    });

    }

  ,
  Check: function Check(Username){
    //validation check if the username was already taken
    var QuerySearch = `SELECT * FROM Logins WHERE Username= '`+Username+`'`;
    Con.query(QuerySearch, function (err, result) {
      // searches database for username if found return result false to say no go
      if (err) throw err;
      // add check if no results
      console.log(result.length);
      if (result.length > 0){
        // then there was a response
        return true;
      }else{
        // no response
        return false;
      };
    });
  },
  GetLog: function GetLog(Username, Password, callback){
    LogInTo(Username, Password, function (err, rows) {
     if (!err) {
        callback(null,rows);
     }
     else {
        callback(true,err);
     }
  });

  },
  //LogInTo: ,

  UpdateHighScore: function GetHighScore(Username, HighScore){
    // here at the end of a game / game closes the HighScore is checked and if
    // it was beaten it will update the HighScore
    var QuerySearch = `SELECT * FROM Logins WHERE Username= '`
    +Username+`' AND HighScore < '` + HighScore + `'`;
    Con.query(QuerySearch, function (err, result) {
      if (err) throw err;
      // if successfully found a smaller HighScore
      if (result.length > 0){
        // then there was a response so we can update the highscore
        UpdateHighScore(Username, HighScore, function(){
          if (!err) {
             callback(null,rows);
          }else {
             callback(true,err);
          };
        });
      };
    });
  }
};

function LogInTo(Username, Password, callback) {
  var QuerySearch = `SELECT * FROM Logins WHERE Username= '`+
    Username+`' AND Password = '`+
    Password+`'`;
  // if the username does not exist we can succeffully address
  Con.query(QuerySearch, function (err, result) {
    if (err) throw err;
    // if successfully logged in
    if (result.length > 0){
      // then there was a response
      return callback(null,true);;
    }else{
      // there was no response meaning user either never existed/ input error
      return callback(null,false);;
    };
  });
};

function UpdateHighScore(Username, HighScore, callback){
  var QueryUpdate = `UPDATE Logins SET HighScore = '`
  +HighScore+`' WHERE Username = '`+Username+`'`;
  Con.query(QueryUpdate, function(err, result){
    callback(null,true);;
  });

};
