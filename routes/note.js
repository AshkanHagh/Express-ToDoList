const { body } = require('express-validator');
const router = require('express').Router();

const isAuth = require('../middlewares/verify-token');

const noteController = require('../controllers/note');


router.post('/', isAuth, body('note').trim().isLength({min : 5, max : 255}).notEmpty(), noteController.addTodo);

router.get('/', isAuth, noteController.getUserList);

router.put('/:id', isAuth, body('note').trim().isLength({min : 5, max : 255}).notEmpty(), noteController.editTodo);

router.delete('/:id', isAuth, noteController.deleteTodo);


module.exports = router;