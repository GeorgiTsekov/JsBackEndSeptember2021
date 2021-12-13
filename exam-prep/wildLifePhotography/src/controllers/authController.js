const router = require('express').Router();

const authService = require('../services/authService');
const { AUTH_COOKIE_NAME } = require('../constants');
const { isGuest, isAuth } = require('../middlewares/authMiddleware');

router.get('/login', isGuest, (req, res) => {
    res.render('auth/login');
});

router.post('/login', isGuest, async (req, res) => {
    const { email, password } = req.body;

    try {
        let token = await authService.login({
            email,
            password,
        });

        res.cookie(AUTH_COOKIE_NAME, token);

        res.redirect('/');
    } catch (error) {
        res.render('auth/login', { error: error.message })
    }
});

router.get('/register', isGuest, (req, res) => {
    res.render('auth/register');
});

router.post('/register', isGuest, async (req, res) => {
    const { firstName, lastName, email, password, repeatPassword } = req.body;

    if (password !== repeatPassword) {
        res.locals.error = 'Password missmatch';

        return res.render('auth/register');
    }

    try {
        await authService.register({
            firstName,
            lastName,
            email,
            password,
        });

        let token = await authService.login({
            email,
            password
        });

        res.cookie(AUTH_COOKIE_NAME, token);

        res.redirect('/');

    } catch (error) {
        res.render('auth/login', { error: error.message })
    }
});

router.get('/logout', isAuth, (req, res) => {
    res.clearCookie(AUTH_COOKIE_NAME);

    res.redirect('/');
});

module.exports = router;