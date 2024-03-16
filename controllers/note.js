const { validationResult, Result } = require('express-validator');

const Note = require('../models/note');
const User = require('../models/user');


exports.createNote = async (req, res, next) => {

    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {

            const error = new Error('invalid data from your data, please check your value');
            error.statusCode = 422;
            throw error;
        }

        const note = new Note({
            
            note : req.body.text,
            user : req.userId
        });

        const result = await note.save();

        const user = await User.findById(req.userId);

        user.note.push(result);

        await user.save();

        res.status(201).json({message : 'Note saved...', note : result});

    } catch (error) {
        
        if(!error.statusCode) {

            error.statusCode = 500;
        }
        next(error);
    }

}

exports.findNote = async (req, res, next) => {

    try {
        const user = await User.findById(req.userId);
        if(!user) {

            const error = new Error('no user found');
            error.statusCode = 404;
            throw error;
        }

        const notes = await Note.find({user : user._id}).populate('user', 'username');
        if(!notes) {
          
            const error = new Error('Nothing found, you can add new items');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({message : 'Notes fetched', note : notes});

        
    } catch (error) {
        
        if(!error.statusCode) {

            error.statusCode = 500;
        }
        next(error);
    }

}

exports.updateNote = async (req, res, next) => {

    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {

            const error = new Error('invalid data from your data, please check your value');
            error.statusCode = 422;
            throw error;
        }

        const note = await Note.findById(req.params.id);
        if(!note) {

            const error = new Error('Nothing found');
            error.statusCode = 422;
            throw error;
        }

        if(note.user._id.toString() != req.userId) {

            const error = new Error('you cant update other notes');
            error.statusCode = 400;
            throw error;
        }

        note.note = req.body.text;

        await note.save();

        res.status(201).json({message : 'note has been updated', noteId : note._id});

    } catch (error) {
        
        if(!error.statusCode) {

            error.statusCode = 500;
        }
        next(error);
    }

}

exports.deleteNote = async (req, res, next) => {

    try {
        const note = await Note.findById(req.params.id);
        if(!note) {

            const error = new Error('Nothing found');
            error.statusCode = 422;
            throw error;
        }

        if(note.user._id.toString() != req.userId) {

            const error = new Error('you cant delete other notes');
            error.statusCode = 400;
            throw error;
        }

        await note.deleteOne();

        const user = await User.findById(req.userId);

        user.note.remove(req.params.id);

        user.save();

        res.status(200).json({message : 'note has been deleted', noteId : note._id});

    } catch (error) {
        
        if(!error.statusCode) {

            error.statusCode = 500;
        }
        next(error);
    }

}