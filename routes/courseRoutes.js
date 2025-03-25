const express = require('express');
const router = express.Router();
const CoursesController = require('../controllers/courseController');
const { auth } = require('../middlewares/auth.js');

router.post('/createCourse', auth , CoursesController.createCourse);
router.get('/getAllCoursesByPage', CoursesController.getAllCoursesByPage);
router.get('/getAllCourses', CoursesController.getAllCourses);
router.get('/getCourseDetail/:id', CoursesController.getCourseDetail);
router.get('/getCourseByCategory/:id', CoursesController.getCourseByCategory);
router.put('/updateCourse/:id',auth, CoursesController.updateCourse);
router.delete('/deleteCourse/:id',auth, CoursesController.deleteCourse);

module.exports = router;