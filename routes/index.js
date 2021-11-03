const AuthRoutes = require('./auth.routes');
const CategoriesRoutes = require('./categories.routes');
const ProductshRoutes = require('./products.routes');
const UsersRoutes = require('./users.routes');
const SearchRoutes = require('./users.routes');

module.exports = {
    ...AuthRoutes,
    ...CategoriesRoutes,
    ...ProductshRoutes,
    ...UsersRoutes,
    ...SearchRoutes
};
