const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: [ true, 'The name is required']
    },
    email: {
        type: String,
        required: [ true, 'The email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [ true, 'The password is required'],
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
    
});

/**
 * Eso se usa para modificar lo que hacen los metodos de mongoose.
 * Es importante usar function() en lugar de () => para poder
 * usar el operador 'this', dado que es necesario poderlo usar para
 * el UserSchema
 */
UserSchema.methods.toJSON = function() {
    const { __v, password, ...restUser } = this.toObject();
    return restUser;
};

module.exports = model( 'User', UserSchema );