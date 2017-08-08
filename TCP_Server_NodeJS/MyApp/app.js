var net = require("net");
var colors = require("colors");

var server = net.createServer();

server.listen(9000, function(){

    console.log("Started listening at port 9000".green);
});

server.on("connection", function(socket){

    var remoteAddress = socket.remoteAddress + ":" + socket.remotePort ;
    console.log("new connection established at %s".blue,remoteAddress);

    socket.on("data", function(d){
        console.log(new Date().toTimeString().yellow);
        console.log("Data from the client is %s".white, d);

        socket.write("Hello Back" + d);
    });

    socket.once("close", function(){
        console.log("The connection from %s is closed now".red, remoteAddress);
    });

    socket.on("error", function(err){
        console.log ("connection %s error is %s".red, remoteAddress, err.message);
    });

})