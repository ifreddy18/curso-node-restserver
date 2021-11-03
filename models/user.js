const { Schema, model } = require("mongoose");

const UserSchema = Schema(
	{
		name: {
			type: String,
			required: [true, "The name is required"],
		},
		email: {
			type: String,
			required: [true, "The email is required"],
			unique: true,
		},
		password: {
			type: String,
			required: [true, "The password is required"],
		},
		img: {
			type: String,
		},
		role: {
			type: String,
			required: true,
			enum: ["ADMIN_ROLE", "USER_ROLE"],
		},
		status: {
			type: Boolean,
			default: true,
		},
		google: {
			type: Boolean,
			default: false,
		},
	},
	{
		toObject: {
			transform: function (doc, ret) {
				ret.uid = ret._id;
				delete ret._id;
				delete ret.__v;
			},
		},
	},
);

/**
 * Eso se usa para modificar lo que hacen los metodos de mongoose.
 * En este caso en particular, modifica el formato JSON en el que se imprimen
 * los usuarios.
 * Es importante usar function() en lugar de () => para poder
 * usar el operador 'this', dado que es necesario poderlo usar para
 * el UserSchema
 */
UserSchema.methods.toJSON = function () {
	const { __v, password, _id, ...restUser } = this.toObject();
	restUser.uid = _id; // Esta linea cambia visualmente el '_id' por 'uid'
	return restUser;
};

// UserSchema.methods.toObject = function() {
//     const { __v, password, _id, ...restUser } = this.toObject();
//     restUser.uid = _id; // Esta linea cambia visualmente el '_id' por 'uid'
//     return restUser;
// };

module.exports = model("User", UserSchema);
