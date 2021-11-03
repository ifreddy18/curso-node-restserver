const { Schema, model } = require('mongoose');

const CategorySchema = Schema({
    name: {
        type: String,
        required: [true, 'The name is required'],
        unique: true
    },
    status: {
        type: Boolean,
        default: true,
        require: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }
});

CategorySchema.methods.toJSON = function() {
    const { __v, status, ...restCategory } = this.toObject();
    return restCategory;
};

module.exports = model('Category', CategorySchema);