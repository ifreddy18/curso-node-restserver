// Esta response se usa para que aparezca la ayuda de VS Code con las res
const { request, response } = require('express');


const usersGet = (req = request, res = response) => {

    res.status(200).json({
        msg: 'usersGet API'
    });
};

const usersPost = (req = request, res = response) => {

    res.status(200).json({
        msg: 'usersPost API',
    });
};

const usersPut = (req = request, res = response) => {

    const { id } = req.params;

    res.status(200).json({
        msg: 'usersPut API',
        id
    });
};

const usersPatch = (req = request, res = response) => {
    res.status(200).json({
        msg: 'usersPatch API'
    });
};

const usersDelete = (req = request, res = response) => {
    res.status(200).json({
        msg: 'usersDelete API'
    });
};


module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete,
};