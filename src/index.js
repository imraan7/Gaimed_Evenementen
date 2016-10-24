'use strict';

const app = require('./app');
const port = app.get('port');
const server = process.env.PORT || app.listen(port);

server.on('listening', () =>
  console.log(`Feathers application started on ${app.get('host')}:${port}`)
);
