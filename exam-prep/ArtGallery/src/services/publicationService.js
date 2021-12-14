const Publication = require('../models/Publication');

exports.create = (publicationData) => Publication.create(publicationData);

exports.getAll = () => Publication.find().lean();

exports.getOne = (publicationId) => Publication.findById(publicationId);

exports.getMyPublications = (userId) => Publication.find({ author: userId }).lean();
exports.getMySharedPublications = (userId) => Publication.find({ usersShared: userId }).lean();

exports.share = async (publicationId, userId) => {
    let publication = await this.getOne(publicationId);

    publication.usersShared.push(userId);

    return publication.save();
}

exports.delete = (publicationId) => Publication.findByIdAndDelete(publicationId);

exports.edit = (publicationId, data) => Publication.findByIdAndUpdate(publicationId, data, { runValidators: true });