#!/usr/bin/env node

// var server = 'localhost:5001'
var server = 'hoypido-slackbot.herokuapp.com'

, WebSocket = require('ws')
, fs = require('fs')
, ws = new WebSocket('ws://'+server)
, uuid = require('node-uuid')
, colors = require('colors')
, readline = require('readline')
, marked = require('marked')
, TerminalRenderer = require('marked-terminal')
, rl = readline.createInterface({
  input: process.stdin,
  output: null,
  terminal: false
});

function get_user(){
  try{
    return JSON.parse(fs.readFileSync(process.env.HOME + '/.hoypidorc', 'utf-8'));
  }catch(e){
    return {
      "id": uuid.v1(),
      "profile":{
        "email": process.env.USER + "@bot_cmd_client.com"
      }
    }
  }
}

function save_user(user){
  fs.writeFileSync(process.env.HOME + '/.hoypidorc', JSON.stringify(user), 'utf8');
  return user;
}

// Init user
user = save_user(get_user());
function getMessage(str){
  try {
    var json = JSON.parse(str);
    return '';
  } catch (e) {
    return str;
  }
}

function getMarked(str){
  return marked(str).replace(/\n\n/g, '\n').replace(/<br>/g, '\n')
}

marked.setOptions({
  renderer: new TerminalRenderer({
    tableOptions: {
      reflowText: true,
      style: {
        head: ['white', 'italic']
      }
    }
  })
});

ws.on('open', function(){
  ws.send(JSON.stringify({
    "text": "pedir",
    "user": user
  }));

  setInterval(function(){
    ws.send(JSON.stringify({
      type: 'ping'
    }));
  }, 1000);

});
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
    "user": user
  }));
});
