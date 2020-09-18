const stomp = require("stompit");
const util = require("util");

class Stomp {
 static async init() {
  const s = util.promisify(stomp.connect);
  this.client = await s({ host: "localhost", port: 61613, connectHeaders: { login: "admin", passcode: "admin", host: "/" }});
 }

 static subscribe(destination) {
  this.client.subscribe({ destination, ack: "client-individual" }, (err, message) => {
   if (err)
    throw err;
   message.readString("utf-8", (err, body) => {
    if (err)
     throw err;
    console.log("Message Received: ", body);
   });
   this.client.ack(message);
  });
 }

 static sendMessage(destination, message = {}, contentType = "text/plain") {
  const frame = this.client.send({ destination, "content-type": contentType});
  frame.write(JSON.stringify(message));
  frame.end();
 }
}

module.exports = Stomp;
