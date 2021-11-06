const path = require('path');
const fs = require('fs');
const { request } = require("express");
const cloudinary = require('cloudinary').v2;
cloudinary.config( process.env.CLOUDINARY_URL );

const { uploadFile } = require("../helpers");
const { User, Product } = require("../models");

const uploads = async(req = request, res = response) => {
	
	try {
		
		const fileName = await uploadFile( req.files, undefined , 'textos' );
		res.json({ fileName });

	} catch ( msg ) {
		res.status(400).json({ msg });
	}
};

/**
 * Update imagen to folder
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const updateImagen = async(req = request, res = response) => {
	
	const { id, collection } = req.params;

	let model;

	switch ( collection ) {
		case 'users':
			model = await User.findById( id );			
			break;
	
		case 'products':
			model = await Product.findById( id );			
			break;

		default:
			res.status(500).json({ msg: 'Undeveloped collection' });
			break;
	}
	
	// Verificar que exista un elemento con ese ID
	if ( !model ) {
		return res.status(400).json({
			msg: `There is no element with id '${ id }' ` +
				 `in the collection '${ collection }'`
		});
	}

	// Eliminar imagen previa
	if ( model.img ) {
		const filePath = path.join(__dirname, '../uploads/', collection, model.img );
		if (fs.existsSync( filePath )) {
			fs.unlinkSync( filePath );
		}
	}

	try {
		// Subir archivo y obtener el nombre para asignarlo al modelo
		const fileName = await uploadFile(req.files, undefined, collection);
		model.img = fileName;
	
		// Guardar en base de datos
		await model.save();
		
		res.json({ model });

	} catch (msg) {
		return res.status(400).json( msg );
	}

};


/**
 * Update imagen to Cloudinary
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
 const updateImagenCloudinary = async(req = request, res = response) => {
	
	const { id, collection } = req.params;

	let model;

	switch ( collection ) {
		case 'users':
			model = await User.findById( id );			
			break;
	
		case 'products':
			model = await Product.findById( id );			
			break;

		default:
			res.status(500).json({ msg: 'Undeveloped collection' });
			break;
	}
	
	// Verificar que exista un elemento con ese ID
	if ( !model ) {
		return res.status(400).json({
			msg: `There is no element with id '${ id }' ` +
				 `in the collection '${ collection }'`
		});
	}

	console.log(model);
	// Eliminar imagen previa de Cloudinary
	if ( model.img ) {
		const nameArray = model.img.split('/');
		const nameWithExtension = nameArray[ nameArray.length - 1 ];
		const [ public_id ] = nameWithExtension.split('.');
		cloudinary.uploader.destroy( public_id );
	}

	try {
		// Extraer path temporal del archivo y subirlo a Cloudinary
		const { tempFilePath } = req.files.file;
		const { secure_url, ...rest } = await cloudinary.uploader.upload( tempFilePath );
		model.img = secure_url;
	
		// Guardar en base de datos
		await model.save();
		
		res.json( model );

	} catch (msg) {
		return res.status(400).json( msg );
	}

};

const getImagen = async(req = request, res = response) => {

	const { id, collection } = req.params;

	let model;

	switch ( collection ) {
		case 'users':
			model = await User.findById( id );			
			break;
	
		case 'products':
			model = await Product.findById( id );			
			break;

		default:
			res.status(500).json({ msg: 'Undeveloped collection' });
			break;
	}
	
	// Verificar que exista un elemento con ese ID
	if ( !model ) {
		return res.status(400).json({
			msg: `There is no element with id '${ id }' ` +
				 `in the collection '${ collection }'`
		});
	}

	// Enviar imagen actual
	if ( model.img ) {
		const filePath = path.join(__dirname, '../uploads/', collection, model.img );
		if (fs.existsSync( filePath )) {
			return res.sendFile( filePath );
		}
	}

	// Enviar imagen substituta
	const filePath = path.join(__dirname, '../assets/no-image.png');
	res.status(400).sendFile( filePath );

};

module.exports = {
	uploads,
	updateImagen,
	updateImagenCloudinary,
	getImagen,
};
