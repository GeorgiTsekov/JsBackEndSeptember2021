const Housing = require('../models/Housing');

exports.create = (housingData) => Housing.create(housingData);

exports.getAll = () => Housing.find().lean();

exports.getOne = (housingId) => Housing.findById(housingId).populate('tenants');

exports.getTopHouses = () => Housing.find().sort({ createdAt: -1 }).limit(3).lean();

exports.addTenant = async (housingId, userId) => {
    let housing = await this.getOne(housingId);

    housing.tenants.push(userId);

    housing.availablePieces--;

    return housing.save();

    // return Housing.findOneAndUpdate({ _id: housingId }, { $push: { tenants: userId }, $inc: { availablePieces: -1 } });
}

exports.delete = (housingId) => Housing.findByIdAndDelete(housingId);