const mongoose = require('mongoose');
const { User, Role, Category, Product } = require('../models');

const userExistById = async( id ) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(`This isn't a valid Mongoose ID`);
    }
    
    const userExist = await User.findById(id);
    if ( !userExist ) {
        throw new Error(`The user with ID '${ id }' doesn't exist`);
    }
};

const emailExist = async(email = '') => {
    const emailExist = await User.findOne({ email });
    if ( emailExist ) {
        throw new Error(`The email '${ email }' already exist`);
    }
};

const isRoleValid = async(role = '') => {
    const roleExist = await Role.findOne({ role });
    if (!roleExist) {
        throw new Error(`The role '${ role }' doesn't exist`);
    }
};

const categoryExistById = async( id ) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(`This isn't a valid Mongoose ID`);
    }
    
    const categoryExist = await Category.findById(id);
    if ( !categoryExist ) {
        throw new Error(`The category with ID '${ id }' doesn't exist`);
    }
};

const productExistById = async( id ) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(`This isn't a valid Mongoose ID`);
    }
    
    const productExist = await Product.findById(id);
    if ( !productExist ) {
        throw new Error(`The product with ID '${ id }' doesn't exist`);
    }
};


module.exports = {
    userExistById,
    emailExist,
    isRoleValid,
    categoryExistById,
    productExistById
};