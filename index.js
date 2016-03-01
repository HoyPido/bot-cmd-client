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
  console.log("\nHoyPido: ".bold, data, '\n');
});

rl.on('line', function(line) {
	if(!line){
		return;
	};
  
  var msg_in = "\nMe: ".bold + line;
  //console.log(msg_in);
  var message = {"text":line,"user":{"id":"pepe","profile":{"email":"fabri@tuosto.com"}}};
  ws.send(JSON.stringify(message));
});
