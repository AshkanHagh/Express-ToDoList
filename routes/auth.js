const router = require('express').Router();
const { body } = require('express-validator');

const authControl = require('../controllers/auth');


router.post('/signup', body('username').trim().notEmpty(), authControl.signup);

router.post('/login', body('username').trim().notEmpty(), authControl.login);


module.exports = router;