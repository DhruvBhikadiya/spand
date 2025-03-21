const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/userController.js');
const { auth } = require('../middlewares/auth.js');

router.post('/createUser',auth, UsersController.createUser);
router.get('/getAllUsers',auth, UsersController.getAllUser);
router.get('/getAllUsersByPage',auth, UsersController.getAllUserByPage);
router.post('/loginUser', UsersController.loginUser);
router.put('/updateUser/:id',auth, UsersController.updateUser);
router.delete('/deleteUser/:id',auth, UsersController.deleteUser);

module.exports = router;