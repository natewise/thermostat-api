import json, time, socket, random, datetime

sock = socket.socket()
ai = socket.getaddrinfo("127.0.0.1", 8125)
addr = ai[0][-1]
sock.connect(addr)
count = 0
while True:
    if(count >= 5):
        break
    data = str(sock.recv(4064))
    print(data)
    count = count +1
sock.send(str.encode(json.dumps({"event": "update_register", "temp": random.randint(80,89), "timestamp": str(datetime.datetime.now())})))
sock.close()