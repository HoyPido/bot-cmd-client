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
    return '';
  } catch (e) {
    return str;
  }
}

function getMarked(str){
  return marked(str).replace(/\n\n/g, '\n')
}

marked.setOptions({ 
  renderer: new TerminalRenderer({
    tableOptions: {
      style: {
        head: ['white', 'italic']
      }
    }
  })
});

ws.on('open', function(){ console.log("HoyPido: ".bold, getMarked('Hola capo :smiley:'), '\n'); });
ws.on('close', function(){ console.log("HoyPido: ".bold, getMarked('Se cayó la conexión :stuck_out_tongue: intenta nuevamente'), '\n'); process.exit(); });
ws.on('message', function(data, flags){
  var message = getMessage(data);
  if(message)
    console.log("HoyPido: ".bold, getMarked(message));
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
