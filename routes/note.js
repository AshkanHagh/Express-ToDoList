const router = require('express').Router();
const { body } = require('express-validator');
const isAuth = require('../middlewares/verify-token');

const noteControl = require('../controllers/note');


router.post('/', isAuth, body('text').trim().notEmpty(), noteControl.createNote);

router.get('/', isAuth, noteControl.findNote);

router.put('/:id', isAuth, body('text').trim().notEmpty(), noteControl.updateNote);

router.delete('/:id', isAuth, noteControl.deleteNote);


module.exports = router;