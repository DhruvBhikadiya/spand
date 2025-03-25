const express = require('express');
const router = express.Router();
const AboutUssController = require('../controllers/aboutusController.js');
const { auth } = require('../middlewares/auth.js');

router.post('/createAboutUs',auth, AboutUssController.createAboutUs);
router.get('/getAboutUs', AboutUssController.getAllAboutUss);
router.put('/updateAboutUs/:id',auth, AboutUssController.updateAboutUs);
router.delete('/deleteAboutUs/:id',auth, AboutUssController.deleteAboutUs);

module.exports = router;