const { request, response } = require('express');
const { Category } = require('../models');

const getCategories = async(req = request, res = response) => {

    const { limit = 5, from = 0 } = req.query;
    const query = { status: true };

    const [ totalResults, categories ] = await Promise.all([
        Category.countDocuments( query ),
        Category.find( query ) // Para regresar todos las Categories
            .populate('user', ['name', 'email'])
            .skip(Number( from )) // Desde que numero lo regresa
            .limit(Number( limit )) // Cantidad de resultados
    ]);
    
    res.status(200).json({
        totalResults,
        categories
    });
};

const getCategoryById = async(req = request, res = response) => {

    const { id } = req.params;

    const category = await Category.findById( id ).populate('user', 'name');

    if ( !category ) {
        return res.status(404).json({
            msg: 'Doesn\'t exist a category with this ID'
        });
    }

    res.status(200).json({
        category
    });
};

const createCategory = async(req = request, res = response) => {

    const name = req.body.name.toUpperCase();

    const categoryDB = await Category.findOne({ name });

    // Verificar si ya existe una categoria con ese nombre
    if ( categoryDB ) {
        return res.status(400).json({
            msg: `Already exist a category with this name: ${ name }`
        });
    }

    // Generar la data a guardar
    const data = {
        name,
        user: req.user._id
    };

    const category = new Category( data );

    // Guardar en DB
    await category.save();

    res.status(201).json({
        msg: `Category '${ name }' was created successfully`,
        category
    });

};

const updateCategory = async(req = request, res = response) => {

    const { id } = req.params;
    const { status, user, ...data } = req.body;

    data.name = data.name.toUpperCase();
    data.user = req.user._id;

    const category = await Category.findByIdAndUpdate(id, data, { new: true });

    res.status(200).json({ category });
};

const deleteCategory = async(req = request, res = response) => {

    const { id } = req.params;

    // Cambiar el status para que no aparezca activo
    const category = await Category.findByIdAndUpdate(id, { status: false });

    res.status(200).json({ category });
};

module.exports = {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};
