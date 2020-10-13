// imported the http library and set up the port for the server
const Http = require('http');
const Port = 3000;
// the server all functionallity goes here
const Server = Http.createServer(function(req,res){
  res.writeHead(200, {'Content-Type':'text/html'}); //status code
  fs.readFile('index.html', function(Error, data){
    if(Error){
      res.writeHead(404);
      res.write('Error: File Not Found');
      }
    res.end(); // end command
    }
    );

  }
);
// this is checking that the server is up and listening if is it will output
// everything is working if not will output an error has happened
Server.listen(Port, function(Error){
  if (Error){
    console.log('something Went wrong :(', Error);
  }else{
    console.log('Server is listening on port '+Port);
    };
  }
);
/*
Database info for future:
Server: sql2.freemysqlhosting.net
Database/username: sql2369364
password:bX9!iX9%
portNm: 3306
table name: Logins

*/
