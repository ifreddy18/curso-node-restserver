const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const { dbConnection } = require('../db/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            categories: '/api/categories',
            products: '/api/products',
            searchs: '/api/searchs',
            uploads: '/api/uploads',
            users: '/api/users',
        };

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

        // Carga de archivos (express-fileupload)
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true, // Permite crear carpetas si no existen
        }));
    }

    routes() {
        this.app.use( this.paths.auth , require('../routes/auth.routes') );
        this.app.use( this.paths.categories , require('../routes/categories.routes') );
        this.app.use( this.paths.products , require('../routes/products.routes') );
        this.app.use( this.paths.searchs , require('../routes/searchs.routes') );
        this.app.use( this.paths.uploads , require('../routes/uploads.routes') );
        this.app.use( this.paths.users , require('../routes/users.routes') );

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Working on port: ', this.port);
        });
    }
    
}

module.exports = Server;