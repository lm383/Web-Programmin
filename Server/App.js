// imported the http library and set up the port for the server
const Http = require('http')
const Port = 3000
// the server all functionallity goes here
const Server = Http.createServer(function(req,res){

})
// this is checking that the server is up and listening if is it will output
// everything is working if not will output an error has happened
Server.listen(Port, function(Error){
  if (Error){
    console.log('something Went wrong :(', Error);
  }else{
    console.log('Server is listening on port '+Port);
  }
})
