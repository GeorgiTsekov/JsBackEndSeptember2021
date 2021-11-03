const router = require('express').Router();

const userService = require('../services/userService');

router.post('/register', async (req, res, next) => {
    let { email, password } = req.body;
    try {
        await userService.register({ email, password });
        let { user, token } = await userService.login({ email, password });

        res.json({
            _id: user._id,
            email: user.email,
            accessToken: token,
        });
    } catch (error) {
        next(error)
    }
});

router.post('/login', async (req, res) => {
    let { email, password } = req.body;
    let { user, token } = await userService.login({ email, password });

    res.json({
        _id: user._id,
        email: user.email,
        accessToken: token,
    });
});

router.get('/logout', (req, res) => {
    res.json({ ok: true });
});

module.exports = router;