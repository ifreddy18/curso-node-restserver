
const existFiles = (req, res, next) => {

    if ( !req.files || Object.keys(req.files).length === 0 || !req.files.file ) {
        res.status(500).json({
            msg: 'No files were uploaded'
        });
    }

    next();

};

module.exports = {
    existFiles
};