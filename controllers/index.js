const AuthController = require('./auth.controllers');
const CategoriesController = require('./categories.controllers');
const ProductsController = require('./products.controllers');
const SearchsController = require('./searchs.controllers');
const UploadsController = require('./uploads.controllers');
const UsersController = require('./users.controllers');

module.exports = {
    ...AuthController,
    ...CategoriesController,
    ...ProductsController,
    ...SearchsController,
    ...UploadsController,
    ...UsersController
};
