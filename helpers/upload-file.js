const { v4: uuidv4 } = require('uuid');
const path = require('path');

const uploadFile = ( files, validExtensions = ['jpeg', 'png', 'jpg', 'gif'], folder = '' ) => {

    return new Promise((resolve, reject) => {

        // Extraer archivo, nombre y extension
        const { file } = files;
        const fileSplitedName = file.name.split('.');
        const extension = fileSplitedName[ fileSplitedName.length - 1 ];
    
        // Validar extension
        if ( !validExtensions.includes( extension ) ) {
            reject(`Invalid extension. Valid extensions: ${ validExtensions }`);
        }
    
        // Renombrar archivo
        const tempName = uuidv4() + '.' + extension;
    
        // Path donde se guardaran el archivo
        const uploadPath = path.join(__dirname, '../uploads/', folder, tempName);
    
        file.mv(uploadPath, (error) => {
            if (error) {
               reject( error );
            }

            resolve( tempName );
        });

    });


};

module.exports = {
    uploadFile
};