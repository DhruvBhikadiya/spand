const express = require('express');
const router = express.Router();
const CoursepurchasesController = require('../controllers/coursepurchaseController');
const { auth } = require('../middlewares/auth.js');

router.post('/createCoursepurchase', CoursepurchasesController.createCoursepurchase);
router.get('/getAllCoursepurchasesByPage',auth, CoursepurchasesController.getAllCoursepurchasesByPage);
router.get('/getAllCoursepurchases',auth, CoursepurchasesController.getAllCoursepurchases);
router.get('/getCourseByUser/:id', CoursepurchasesController.getCourseByUser);
router.put('/updateCoursepurchase/:id',auth, CoursepurchasesController.updateCoursepurchase);
router.delete('/deleteCoursepurchase/:id',auth, CoursepurchasesController.deleteCoursepurchase);

module.exports = router;
