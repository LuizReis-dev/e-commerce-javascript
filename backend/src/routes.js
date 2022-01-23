const express = require('express');
const router = express.Router();

const UsersController = require('./controllers/UsersController');;
const usersController = new UsersController();

router.get('/signup', usersController.signup);
router.get('/login', usersController.login);
module.exports = router;