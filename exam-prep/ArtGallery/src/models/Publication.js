const mongoose = require('mongoose');

const publicationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 6,
    },
    paintingTech: {
        type: String,
        required: true,
        maxlength: 15,
    },
    picture: {
        type: String,
        required: true,
        validate: /^https?:\/\/.+/
    },
    certificate: {
        type: String,
        enum: ['Yes', 'No'],
        required: true,
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    usersShared: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        }
    ],
}, {
    timestamps: true
});

// publicationSchema.method('getTenants', function() {
//     return this.tenants.map(x => x.name).join(', ');
// });

let Publication = mongoose.model('Publication', publicationSchema);

module.exports = Publication;
