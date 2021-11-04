const cubeService = require('../services/cubeService');

exports.isOwnCube = async function (req, res, next) {
    let cube = await cubeService.getCurrent(req.params.cubeId);
    if (cube.creator == req.user._id) {
        req.cube = cube;

        next()
    } else {
        next(new Error('you are not authorised to make any changes on this cube!!!'));
    }
}