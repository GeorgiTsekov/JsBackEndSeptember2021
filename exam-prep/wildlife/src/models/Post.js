const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        // minlength: 6,
    },
    keyword: {
        type: String,
        // enum: ['Apartment', 'Villa', 'House'],
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    date: {
        type: String, 
        required: true,
    },
    image: {
        type: String,
        required: true,
        // validate: [/^https?:\/\/.+/i, 'Invalid image url!'],
    },
    description: {
        type: String,
        required: true,
        // maxlength: 60,
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    votesOnPost: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        }
    ],
    ratingOnPost: {
        type: Number,
        default: 0,
    },
});

// postSchema.method('getTenants', function() {
//     return this.tenants.map(x => x.name).join(', ');
// });

let Post = mongoose.model('Post', postSchema);

module.exports = Post;
