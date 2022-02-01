const express = require('express');
const auth = require('./middlewares/authMiddleware');
const router = express.Router();

const UsersController = require('./controllers/UsersController');;
const usersController = new UsersController();

const ProducstController = require('./controllers/ProductsController');
const productsController = new ProducstController();

router.post('/signup', usersController.signup);
router.post('/login', usersController.login);

router.get('/products', auth(productsController.getAll));
module.exports = router;