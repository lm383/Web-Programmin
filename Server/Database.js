var MySQL = require("mysql");

/*
Database info:
Server: sql2.freemysqlhosting.net
Database/username: sql2369364
password:bX9!iX9%
portNm: 3306
table name: Logins

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
      console.log(result);
      return true;
    });

    }

  ,
  Check: function Check(Username){
    //validation
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
  LogInTo: function LogInTo(Username, Password) {
    var QuerySearch = `SELECT * FROM Logins WHERE Username= '`+
      Username+`' AND Password = '`+
      Password+`'`;

    // if the username does not exist we can succeffully address

    Con.query(QuerySearch, function (err, result) {
      if (err) throw err;
      // if successfully logged in
      if (result.length > 0){
        // then there was a response
        return true;
      }else{
        return false;
      };

    });

    }



};
