'use strict';

const express = require('express');
const { Server } = require('ws');

const PORT = process.env.PORT || 3000;

const server = express()
//  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new Server({ server });

wss.on('connection', (ws) => {
	
  console.log('Client connected');
	
	ws.on('message', function incoming(message) {
//		if message.includes("ui")
			console.log('received: %s', message);
			wss.clients.forEach(function(client) {       
				if (client !== ws) client.send(message);
			});
  });
	
  ws.on('close', () => {
		console.log('Client disconnected')
	});
});

/*	
setInterval(() => {
  wss.clients.forEach((client) => {
    client.send(new Date().toTimeString());
  });
}, 1000);
*/