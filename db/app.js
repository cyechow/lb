const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const emailer = require('./emailer')
var http = require('http');
var cors = require('cors');
const dotenv = require('dotenv')
dotenv.config()

// Change local_port and current_ip as needed.
var local_port = '3201'
var current_ip = 'localhost' // Get this information from ipconfig.

app.use(cors())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (req, res) => {
  this.response.json({info: 'LB Database API (Node.js, Express, and PostgreSQL)'})
})

app.get('/testget', db.testGet)
app.post('/createAccount', db.createAccount)
app.get('/securityCheck', db.securityCheck)
app.get('/sendEmail', emailer.sendEmail)
app.get('/sendInquiry', emailer.sendInquiry)
app.post('/createClient', db.createClient)
app.get('/getClientList', db.getClientList)

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || local_port);
app.set('port', port);
/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, current_ip);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('DB API listening on ' + bind);
}