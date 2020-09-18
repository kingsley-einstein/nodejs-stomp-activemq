const express = require("express");
const STOMP = require("./stomp");

const app = express();

app.use(express.json());

app.post("/message", (req, res) => {
 STOMP.sendMessage("node-queue2", {
  ...req.body
 });
 return res.status(200).json({
  ...req.body
 });
});

app.listen(2000, async () => {
 await STOMP.init();
 STOMP.subscribe("node-queue2");
 console.log("Express server running on 2000");
});
