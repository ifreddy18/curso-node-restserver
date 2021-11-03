const { request, response } = require("express");
const { ObjectId } = require('mongoose').Types;

// Models
const { User, Category, Product } = require('../models');

const availableCollections = [
    'categories',
    'products',
    'roles',
    'users',
];

const searchUsers = async (query = '', res = response) => {

    // Validar si la query es un MongoID
    const isMongoId = ObjectId.isValid( query );
    
    if ( isMongoId ) {
        const user = await User.findById( query );
        return res.status(200).json({ 
            results: ( user ) ? [ user ] : [] 
        });
    }

    // Expresion Regular para hacer que la busqueda sea insensible
    // a las mayusculos y minusculas
    const regex = RegExp( query, 'i');

    const totalResults = await User.count({
        $or: [{ name: regex }, { email: regex }],
        $and: [{ status: true }]
    });

    const users = await User.find({
        $or: [{ name: regex }, { email: regex }],
        $and: [{ status: true }]
    });

    res.status(200).json({
        totalResults,
        results: users 
    });
};

const searchCategories = async(query = '', res = response) => {

    // Validar si la query es un MongoID
    const isMongoId = ObjectId.isValid( query );
    
    if ( isMongoId ) {
        const category = await Category.findById( query ).populate('user', 'name');
        return res.status(200).json({ 
            results: ( category ) ? [ category ] : [] 
        });
    }

    // Expresion Regular para hacer que la busqueda sea insensible
    // a las mayusculos y minusculas
    const regex = RegExp( query, 'i');
    const totalResults = await Category.count({ name: regex, status: true });
    const categories = await Category.find({ name: regex, status: true })
                                    .populate('user', 'name');

    res.status(200).json({
        totalResults,
        results: categories 
    });
};

const searchProducts = async(query = '', res = response) => {

    // Validar si la query es un MongoID
    const isMongoId = ObjectId.isValid( query );
    
    if ( isMongoId ) {
        const products = await Product.findById( query )
                                    .populate('category', 'name')
                                    .populate('user', 'name');
        return res.status(200).json({ 
            results: ( products ) ? [ products ] : [] 
        });
    }

    // Expresion Regular para hacer que la busqueda sea insensible
    // a las mayusculos y minusculas
    const regex = RegExp( query, 'i');

    const totalResults = await Product.count({
        $or: [{ name: regex }, { description: regex }],
        $and: [{ status: true }]
    });

    const products = await Product.find({
        $or: [{ name: regex }, { description: regex }],
        $and: [{ status: true }]
    })
    .populate('category', 'name')
    .populate('user', 'name');

    res.status(200).json({
        totalResults,
        results: products 
    });
};

const generalSearch = async(req = request, res = response) => {

    const { collection, query } = req.params;

    // Verificar si la collection existe
    if ( !availableCollections.includes( collection )) {
        return res.status(400).json({
            msg: `Invalid collection name. Available collections: ${ availableCollections }`
        });
    }

    switch ( collection ) {
        case 'users':
            searchUsers(query, res);
            break;
        
        case 'categories':
            searchCategories(query, res);
            break;
        
        case 'products':
            searchProducts(query, res);
            break;    
        
        default:
            res.status(500).json({
                msg: 'This collection is not developed yet'
            });
            break;
    }

};

module.exports = {
    generalSearch
};

