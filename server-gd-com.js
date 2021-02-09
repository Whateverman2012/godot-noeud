var gdCom = require('@gd-com/utils')
var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);
 
app.get('/', (req, res, next) =>{
  res.end();
});
 
app.ws('/', (ws, req) => {
  console.log('connected')
  ws.on('message', (msg) => {
    let recieve = new gdCom.GdBuffer(Buffer.from(msg))
    console.log(recieve.getVar())

    let buffer = new gdCom.GdBuffer()
    buffer.putVar(Math.random())
    ws.send(buffer.getBuffer())
  });
});
 
app.listen(process.env.PORT);