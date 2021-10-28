const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

        // Conectar DB
        this.conectDB();

        // Middelwares
        this.middlewares();

        // Rutas
        this.routes();
    }

    async conectDB() {
        await dbConnection();
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
            console.log('Working on port: ', this.port);
        });
    }
    
}

module.exports = Server;