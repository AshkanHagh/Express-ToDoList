const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const User = require('../models/user');


exports.signup = async (req, res, next) => {

    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {

            const error = new Error('invalid data from your data, please check your value');
            error.statusCode = 422;
            throw error;
        }

        const user = new User({

            username : req.body.username
        });

        const result = await user.save();

        res.status(201).json({message : 'Account has been created', user : result});

    } catch (error) {
        
        if(!error.statusCode) {

            error.statusCode = 500;
        }
        next(error);
    }

}

exports.login = async (req, res, next) => {

    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {

            const error = new Error('invalid data from your data, please check your value');
            error.statusCode = 422;
            throw error;
        }

        const user = await User.findOne({username : req.body.username});
        if(!user) {

            const error = new Error('Wrong username, please check your username');
            error.statusCode = 404;
            throw error;
        }

        const token = jwt.sign({username : user.username, userId : user._id}, 'ToDoList', {expiresIn : '1h'});

        res.status(201).json({message : 'Welcome', userId : user._id, token : token});

    } catch (error) {
        
        if(!error.statusCode) {

            error.statusCode = 500;
        }
        next(error);
    }

}