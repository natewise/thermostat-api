const net = require("net");

function Main() {
    var register = new Register(JSON.stringify({ "temp": Math.round(Math.random() * 100), "timestamp": new Date() }))
    var generator = net.createConnection({ port: 8124 },() => {
        console.log("Connected to data generator! Beginning to populate register...")
    });
    const server = net.createServer((c) => {
        register.client_sock = c;
        console.log("Connection! Info:", c.address());
        c.setMaxListeners(20);
        c.on('error', (err) => { 
            console.log("Client error:",err);
            c.destroy();
            register.client_sock.destroy();
        });
        c.on('close', () => {
            c.destroy();
            register.client_sock.destroy();
            console.log('Closed connection');
        });
        c.on('data', async function(data){
            var parsedData = JSON.parse(data.toString("utf-8"))
            if(parsedData.event === "update_register"){
                var parsedObj = JSON.stringify({
                    "temp":parsedData.temp,
                    "timestamp":parsedData.timestamp
                });
                register.set_value(parsedObj);
                register.set_accept_changes(false);
            }
            
        });
    });
    server.listen(8125, () => {
        var addr = server.address()
        console.log("Listening on", addr);
    });
    server.on('error', (err) => { console.log("Server error:",err) });
    generator.on('data',(data) => {
        register.set_value(data.toString("utf-8"));
        console.log(register.get_value);
        if(register.client_sock != undefined)
            register.client_sock.write(register.get_value);
    });
    generator.on("close",() => {console.log("Closed connection.")});
    generator.on("error",(err) => { console.log("Generator error:",err) });
    function sleep(s) {
        var ms = s * 1000;
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
class Register {
    constructor(value) {
        this.value = value;
        this.history = new Array();
        this.history.push(value);
        this.accept_changes = true;
        this.client_sock = null;
    }
    get get_value() {
        return this.value;
    }
    set_value(value) {
        if(this.accept_changes){
            this.value = value;
            this.history.push(value);
        }
        
    }
    set_accept_changes(change){
        this.accept_changes = change;
    }
    get register_history() {
        return this.history;
    }
}
Main();