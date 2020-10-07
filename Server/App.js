const Http = require('http')
const Port = 3000

const Server = Http.createServer(function(req,res){

})

Server.listen(Port, function(Error){
  if (Error){
    console.log('something Went wrong :(', Error);
  }else{
    console.log('Server is listening on port '+Port);
  }
})
