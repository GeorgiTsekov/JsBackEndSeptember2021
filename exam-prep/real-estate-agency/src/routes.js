const router = require('express').Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const housingController = require('./controllers/housingController');
const { isAuth } = require('./middlewares/authMiddleware')

router.use(homeController);
router.use('/auth', authController);
router.use('/housing', isAuth, housingController);

module.exports = router;