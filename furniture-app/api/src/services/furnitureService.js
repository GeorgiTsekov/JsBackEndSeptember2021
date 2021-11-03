const Furniture = require('../models/Furniture');

exports.create = (furnitureData) => Furniture.create(furnitureData);

exports.getAll = () => Furniture.find();

exports.getOne = (furnitureId) => Furniture.findById(furnitureId);

exports.getOwn = (userId) => Furniture.find({_ownerId: userId});

exports.edit = (furnitureId, furnitureUpdatedData) => Furniture.findByIdAndUpdate(furnitureId, furnitureUpdatedData);

exports.delete = (furnitureId) => Furniture.findByIdAndDelete(furnitureId);