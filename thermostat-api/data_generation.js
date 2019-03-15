const net = require('net');

var server = net.createServer(async function(c){
    console.log("Connection! Info:", c.address());
    c.setMaxListeners(20);
    c.on("close",() => {console.log("Closed connection.")});
    c.on("error",(e) => {throw e});
    while(true){
        var data = JSON.stringify({"temp": Math.round(Math.random() * 100), "timestamp": new Date()});
        console.log(data);
        c.write(data);
        await sleep(3);
    }
});
server.on('error', (err) => { throw err; });
server.listen(8124, () => {
    var addr = server.address()
    console.log("Listening on", addr);
});
function sleep(s) {
    var ms = s * 1000;
    return new Promise(resolve => setTimeout(resolve, ms));
}