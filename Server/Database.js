var MySQL = require("mysql");

/*
Database info for future:
Server: sql2.freemysqlhosting.net
Database/username: sql2369364
password:bX9!iX9%
portNm: 3306
table name: Logins

*/

var Con = MySQL.createConnection({
  host: "sql2.freemysqlhosting.net",
  user: "sql2369364",
  password: "bX9!iX9%",
  database:"sql2369364"
});
/*
Con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});
*/
module.exports = {
  // here we will check input the signup form into our database
  // we need see if username is already taken if it has send back error
  // if not enter the username and password into the database
  SignUpTo: function SignUpTo(Username, Password) {
    /*validation
    var QuerySearch = `SELECT * FROM Logins WHERE Username= ${MySQL.escape(
      Username
    )}`;
    */
    var QueryInsert = `INSERT INTO Logins(Username, Password, HighScore) VALUES ('`+
      Username+`','`+
      Password+`','0')`;
    //(${MySQL.escape(Username)},${MySQL.escape(Password)},0)

    Con.connect(function (err) {
      if (err) throw err;
      console.log("Connected!");

      Con.query(QueryInsert, function (err, result) {
        if (err) throw err;
        console.log(result);
        return true;
      });
      /* validation
      Con.query(QuerySearch, function (err, result) {
        if (err) throw err;
        if (result != null) {
          console.log("username taken");
          return "Error: " + Username + " is already Taken";
        } else {

          // here if there was no results for that Username

        }
      });
      */
    });
  }
};
