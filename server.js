//'use strict';


const express = require('express');
const { Server } = require('ws');

const PORT = process.env.PORT || 3000;

const server = express()
  .use((req, res) => res.send('godot-noeud'))
	.listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new Server({ server });

wss.on('connection', (ws) => {
	
	console.log('Client connected');
	
	ws.on('message', function incoming(message) {
//		if message.includes("ui")
			console.log('received: ' + message);
			wss.clients.forEach(function(client) {       
				if (client !== ws) client.send(message);
				else client.send('ack: ' + message);
			});
	});
	
	ws.on('close', () => {
		console.log('Client disconnected')
	});
	
	ws.send('connected');
});

setInterval(() => {
	//console.log(wss.clients);
  wss.clients.forEach((client) => {
    client.send('.');
  });
}, 5000);

