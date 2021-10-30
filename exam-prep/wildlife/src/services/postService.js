const Post = require('../models/Post');

exports.create = (postData) => Post.create(postData);

exports.getAll = () => Post.find().lean();

exports.getMine = (userId) => Post.find({ author: userId }).lean();

exports.getOne = (postId) => Post.findById(postId);

exports.addVotesOnPost = async (postId, userId, isPositive) => {
    let post = await this.getOne(postId);

    await post.votesOnPost.push(userId);

    if (isPositive) {
        await post.ratingOnPost++;
    } else{
        await post.ratingOnPost--;
    }
    return await post.save();
}

exports.delete = (postId) => Post.findByIdAndDelete(postId);

exports.edit = (postId, data) => Post.findByIdAndUpdate(postId, data, { runValidators: true });