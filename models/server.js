const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

        // Middelwares
        this.middlewares();


        // Rutas
        this.routes();
    }

    middlewares() {
        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );
        
        // Directorio publico
        this.app.use( express.static('public') );
    }

    routes() {
        this.app.use( this.usersPath, require('../routes/users.routes') );
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Trabajando en puerto: ', this.port);
        });
    }
    
}

module.exports = Server;