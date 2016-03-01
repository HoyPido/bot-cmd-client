var server = 'localhost:5000';
// server = 'hoypido-slackbot.herokuapp.com';
var WebSocket = require('ws');
var colors = require('colors');
var ws = new WebSocket('ws://'+server);
var colors = require('colors');
var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: null,
  terminal: false
});

ws.on('open', function open() {

});

ws.on('message', function(data, flags){
  console.log("HoyPido:", data);
});

rl.on('line', function(line) {
  var msg_in = "Me: "+line;
  console.log(msg_in.bold);
  var message = {"text":line,"user":{"id":"pepe","profile":{"email":"fabri@tuosto.com"}}};
  ws.send(JSON.stringify(message));
});
