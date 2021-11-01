const { request, response } = require('express');
const bcrypt = require('bcryptjs');

// Models
const User = require('../models/user');

// Helpers
const { generateJWT } = require('../helpers/generate-jwt');
const { googleVerify } = require('../helpers/google-verify');

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

const googleSignIn = async(req = request, res = response) => {

    const { id_token } = req.body;

    try {
        
        const { name, email, img } = await googleVerify( id_token );

        let user = await User.findOne({ email });

        if ( !user ) {
            const data = {
                name,
                email,
                password: 'google', 
                img,
                google: true,
                role: 'USER_ROLE'
            };

            user = new User(data);
            await user.save();

        }

        // Si el user esta en DB
        if ( !user.status ) {
            return res.status(401).json({
                msg: 'Talk to the admin, the user is blocked'
            });
        }

        // Generar el JWT
        const token = await generateJWT( user.id );

        res.status(200).json({
            user,
            token
        });


    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'The token can\'t be verified',
            error
        });
    }


};

module.exports = {
    authLogin,
    googleSignIn
};