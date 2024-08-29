// add dependencies
const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');
const moment = require('moment');

// Idea Service

const app = express(feathers());

// Parse JSON
app.use(express.json());
// Config Socket.io raltime APIs
app.configure(socketio());
// Enable REST services
app.configure(express.rest());
// Register services
app.use('/ideas', new IdeaService());

// New connections connect to stream channel
app.on('connection', conn => app.channel('stream'.join(conn)));
// Publish events to stream
app.publish(data => app.channel('stream'));