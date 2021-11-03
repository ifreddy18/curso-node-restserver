const { request, response } = require('express');
const { Product, Category } = require('../models');

const getProducts = async(req = request, res = response) => {

    const { limit = 5, from = 0 } = req.query;
    const query = { status: true };

    const [ totalResults, product ] = await Promise.all([
        Product.countDocuments( query ),
        Product.find( query ) // Para regresar todos las Categories
            .populate('user', ['name', 'email'])
            .skip(Number( from )) // Desde que numero lo regresa
            .limit(Number( limit )) // Cantidad de resultados
    ]);
    
    res.status(200).json({
        totalResults,
        product
    });
};

const getProductById = async(req = request, res = response) => {

    const { id } = req.params;

    const product = await Product.findById( id )
                            .populate('user', 'name')
                            .populate('category', 'name');

    if ( !product ) {
        return res.status(404).json({
            msg: 'Doesn\'t exist a product with this ID'
        });
    }

    res.status(200).json({
        product
    });
};

const createProduct = async(req = request, res = response) => {

    const name = req.body.name.toUpperCase();
    const { status, user, ...body } = req.body;

    // Verificar si ya existe un producto con ese nombre
    const productDB = await Product.findOne({ name });

    if ( productDB ) {
        return res.status(400).json({
            msg: `Already exist a product with this name: ${ name }`
        });
    }

    // Generar la data a guardar
    const data = {
        ...body,
        name,
        user: req.user._id
    };

    const product = new Product( data );

    // Guardar en DB
    await product.save();

    res.status(201).json({
        msg: `Product '${ name }' was created successfully`,
        product
    });

};

const updateProduct = async(req = request, res = response) => {

    const { id } = req.params;
    const { status, user, ...data } = req.body;
    
    data.user = req.user._id;

    if ( data.name ) {
        data.name = data.name.toUpperCase();
    }

    // Si viene una categoria en la data se verifica que exista
    // dicha category
    if ( data.category ) {

        const categoryDB = await Category.findById(data.category);

        if ( !categoryDB ) {
            return res.status(400).json({
                msg: `Doesn't exist a category with ID: ${ category }`
            });
        }

    }

    const product = await Product.findByIdAndUpdate(id, data, { new: true })
                                .populate('user', 'name')
                                .populate('category', 'name');

    res.status(200).json({ product });
};

const deleteProduct = async(req = request, res = response) => {

    const { id } = req.params;

    // Cambiar el status para que no aparezca activo
    const product = await Product.findByIdAndUpdate(id, { status: false }, { new: true});

    res.status(200).json({ product });
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};