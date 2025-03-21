const express = require('express');
const router = express.Router();
const CategorysController = require('../controllers/categoryController');
const { auth } = require('../middlewares/auth.js');

router.post('/createCategory', CategorysController.createCategory);
router.get('/getAllCategorysByPage',auth, CategorysController.getAllCategorysByPage);
router.get('/getAllCategorys', CategorysController.getAllCategorys);
router.put('/updateCategory/:id',auth, CategorysController.updateCategory);
router.delete('/deleteCategory/:id',auth, CategorysController.deleteCategory);

module.exports = router;
