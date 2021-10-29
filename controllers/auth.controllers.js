const { request, response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/generate-jwt');

const authLogin = async(req = request, res = response) => {

    const { email, password } = req.body;

    try {

        // Verificar si email existe
        const user = await User.findOne({ email });

        if ( !user ) {
            return res.status(400).json({
                msg: 'Wrong email or password'
            });
        }

        // Verificar si el user esta activo en la DB (status: true)
        if ( !user.status ) {
            return res.status(400).json({
                msg: 'Wrong email or password'
            });
        }

        // Verificar contraseña
        const validPassword = bcrypt.compareSync(password, user.password);
        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'Wrong email or password'
            });
        }

        // Generar el JWT
        const token = await generateJWT( user.id );
        
        res.status(200).json({
            user,
            token
        });

    } catch(error) {
        console.log(error);
        res.status(500).json({
            msg: 'Talk to the admin'
        });
    }


};

module.exports = {
    authLogin
};