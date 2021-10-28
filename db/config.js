const mongoose = require('mongoose');

const dbConnection = async() => {
    
    mongoose.connect( process.env.MONGODB_CNN , {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err, resp) => {
        if (err) throw err;
        console.log('Database online');
    });


};

module.exports = {
    dbConnection,
};