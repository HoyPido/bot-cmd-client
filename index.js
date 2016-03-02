var server = 'localhost:5000'
//var server = 'hoypido-slackbot.herokuapp.com'
, WebSocket = require('ws')
, ws = new WebSocket('ws://'+server)
, colors = require('colors')
, readline = require('readline')
, marked = require('marked')
, TerminalRenderer = require('marked-terminal')
, rl = readline.createInterface({
  input: process.stdin,
  output: null,
  terminal: false
});

function getMessage(str){
  try {
    var json = JSON.parse(str);
    return json.attachments[0].title
  } catch (e) {
    return str;
  }
}

marked.setOptions({ renderer: new TerminalRenderer() });

ws.on('open', function(){ console.log("\nHoyPido: ".bold, 'Hola capo', '\n'); });
ws.on('close', function(){ console.log("\nHoyPido: ".bold, 'Se cayó la conexión :P intenta nuevamente', '\n'); process.exit(); });
ws.on('message', function(data, flags){
  var message = getMessage(data);
  console.log("\nHoyPido: ".bold, marked(message), '\n');
});

rl.on('line', function(line) {
  if(!line){ return; };
  ws.send(JSON.stringify({
    "text":line,
    "user":{
      "id":"pepe",
      "profile":{
        "email":"fabri@tuosto.com"
      }
    }
  }));
});
