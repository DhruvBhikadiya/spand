const express = require('express');
const router = express.Router();
const CoursesController = require('../controllers/courseController');
const { auth } = require('../middlewares/auth.js');

router.post('/createCourse', CoursesController.createCourse);
router.get('/getAllCoursesByPage',auth, CoursesController.getAllCoursesByPage);
router.get('/getAllCourses',auth, CoursesController.getAllCourses);
router.put('/updateCourse/:id',auth, CoursesController.updateCourse);
router.delete('/deleteCourse/:id',auth, CoursesController.deleteCourse);

module.exports = router;
