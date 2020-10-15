var MySQL = require('mysql');

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
  password: "bX9!iX9%"
});

Con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
