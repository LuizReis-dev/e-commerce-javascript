const express = require('express');
const router = express.Router();

const UsersController = require('./controllers/UsersController');;
const usersController = new UsersController();

router.get('/signup', usersController.signup);
module.exports = router;