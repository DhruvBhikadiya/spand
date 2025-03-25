const express = require('express');
const router = express.Router();
const LessonsController = require('../controllers/lessonController');
const { auth } = require('../middlewares/auth.js');

router.post('/createLesson',auth,  LessonsController.createLesson);
router.get('/getAllLessonsByPage',LessonsController.getAllLessonsByPage);
router.get('/getAllLessons', LessonsController.getAllLessons);
router.get('/getAllLessonsByCourse/:id', LessonsController.getAllLessonsByCourse);
router.put('/updateLesson/:id',auth, LessonsController.updateLesson);
router.delete('/deleteLesson/:id',auth, LessonsController.deleteLesson);

module.exports = router;
