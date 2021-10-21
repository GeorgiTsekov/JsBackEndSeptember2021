const Housing = require('../models/Housing');

exports.create = (housingData) => Housing.create(housingData);

exports.getAll = () => Housing.find().lean();

exports.getTopHouses = () => Housing.find().sort({ createdAt: -1 }).limit(3).lean();