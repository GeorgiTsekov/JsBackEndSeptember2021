const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 6,
    },
    keyword: {
        type: String,
        required: true,
        minlength: 6,
    },
    location: {
        type: String,
        required: true,
        maxlength: 10,
    },
    image: {
        type: String,
        required: true,
        validate: /^https?:\/\/.+/
    },
    description: {
        type: String,
        required: true,
        minlength: 8,
    },
    date: {
        type: String,
        required: true,
        maxlength: 10,
        minlength: 10,
    },
    votesOnPost: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        }
    ],
    ratingOfPost: {
        type: Number,
        default: 0
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true
});

// postSchema.method('getTenants', function() {
//     return this.tenants.map(x => x.name).join(', ');
// });

let Post = mongoose.model('Post', postSchema);

module.exports = Post;
