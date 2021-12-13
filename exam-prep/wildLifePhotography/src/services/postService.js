const Post = require('../models/Post');

exports.create = (postData) => Post.create(postData);

exports.getAll = () => Post.find().lean();

exports.getOne = (postId) => Post.findById(postId);

exports.getMine = (userId) => Post.find({ author: userId }).lean();

// exports.getTopHouses = () => Post.find().sort({ createdAt: -1 }).limit(3).lean();

exports.voteUp = async (postId, userId) => {
    let post = await this.getOne(postId);

    post.votesOnPost.push(userId);

    post.ratingOfPost++;

    return post.save();
}

exports.voteDown = async (postId, userId) => {
    let post = await this.getOne(postId);

    post.votesOnPost.push(userId);

    post.ratingOfPost--;

    return post.save();
}

exports.delete = (postId) => Post.findByIdAndDelete(postId);

exports.edit = (postId, data) => Post.findByIdAndUpdate(postId, data, { runValidators: true });

// exports.search = (searchedText) => Housing.find({ type: searchedText }).lean();
// exports.search = (searchedText) => Post.find({ type: { $regex: searchedText, $options: 'i' } }).lean();