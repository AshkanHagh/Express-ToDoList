const { body } = require('express-validator');
const router = require('express').Router();

const authController = require('../controllers/auth');


router.post('/signup', [body('username').trim().notEmpty(), body('email').trim().isEmail().notEmpty(), 
body('password').trim().isLength({min : 6}).notEmpty(), body('gender').trim().notEmpty()], authController.signup);

router.post('/login', [body('email').trim().isEmail().notEmpty(), body('password').trim().isLength({min : 6}).notEmpty()], authController.login);


module.exports = router;