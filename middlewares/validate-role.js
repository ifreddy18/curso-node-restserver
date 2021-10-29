

const isAdmin = (req, res, next) => {

    // Verificar que se haya usado el middleware validateJWT antes de isAdmin
    if ( !req.user ) {
        res.status(500).json({
            msg: 'You try to verify the user role without verifying the token'
        });
    }

    
    // Verificar si tiene ADMIN_ROLE
    const { role, name } = req.user;
    
    if ( role !== 'ADMIN_ROLE' ) {
        res.status(401).json({
            msg: `${ name } is not an ADMIN`
        });
    }

    next();

};

const hasRole = (...roles) => {
    return (req, res, next) => {

        // Verificar que se haya usado el middleware validateJWT antes de isAdmin
        if ( !req.user ) {
            res.status(500).json({
                msg: 'You try to verify the user role without verifying the token'
            });
        }

        // Verificar si tiene algun role de los solicitados
        if ( !roles.includes( req.user.role ) ) {
            res.status(401).json({
                msg: `${ req.user.name } don't have any of these roles: [${ roles }]`
            });
        }

        console.log(roles);
        next();
    };
};

module.exports = {
    isAdmin,
    hasRole
};
