// 3rd party imports
require('dotenv').config();

// My imports
const Server = require('./models/server');

const server = new Server(); 

server.listen();
