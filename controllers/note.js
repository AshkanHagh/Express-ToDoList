const { validationResult } = require('express-validator');

const Note = require('../models/note');
const User = require('../models/user');


exports.addTodo = async (req, res, next) => {

    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {

            const error = new Error('invalid data from your data, please check your value');
            error.statusCode = 422;
            throw error;
        }

        const user = await User.findById(req.userId);
        if(!user) {

            const error = new Error('Sorry. requested user could not found');
            error.statusCode = 404;
            throw error;
        }

        const { note } = req.body;

        const task = new Note({ note, author : user._id });

        await task.save();

        res.status(201).json({message : 'New task added to list', tasks : task});

    } catch (error) {
        
        if(!error) {

            error.statusCode = 500;
        }
        next(error);
    }

}


exports.getUserList = async (req, res, next) => {

    try {
        const user = await User.findById(req.userId);
        if(!user) {

            const error = new Error('Sorry. requested user could not found');
            error.statusCode = 404;
            throw error;
        }

        const note = await Note.find({author : user._id}).populate('author', 'email');
        if(!note) {

            const error = new Error('Sorry. requested notes could not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({message : 'Your list is ready', list : note});

    } catch (error) {
        
        if(!error) {

            error.statusCode = 500;
        }
        next(error);
    }

}


exports.editTodo = async (req, res, next) => {

    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {

            const error = new Error('invalid data from your data, please check your value');
            error.statusCode = 422;
            throw error;
        }

        const { note } = req.body;

        const task = await Note.findById(req.params.id);
        if(!task) {

            const error = new Error('Sorry. requested Note could not found');
            error.statusCode = 404;
            throw error;
        }

        if(task.author.toString() != req.userId) {

            const error = new Error('Access denied. You are not authorized to access this resource.'); 
            error.statusCode = 401;
            throw error;
        }

        await task.updateOne({
            $set : { note }
        });

        await task.save();

        res.status(201).json({message : 'Todo updated', Todo : task._id});

    } catch (error) {
        
        if(!error) {

            error.statusCode = 500;
        }
        next(error);
    }

}


exports.deleteTodo = async (req, res, next) => {

    try {
        const task = await Note.findById(req.params.id);
        if(!task) {

            const error = new Error('Sorry. requested todo could not found');
            error.statusCode = 404;
            throw error;
        }

        if(task.author.toString() != req.userId) {

            const error = new Error('Access denied. You are not authorized to access this resource.'); 
            error.statusCode = 401;
            throw error;
        }

        await task.deleteOne();

        res.status(200).json({message : 'Todo deleted', Todo : task._id});

    } catch (error) {
        
        if(!error.statusCode) {

            error.statusCode = 500;
        }
        next(error);
    }

}