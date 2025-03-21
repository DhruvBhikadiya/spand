const express = require('express');
const router = express.Router();
const TestimonialsController = require('../controllers/testimonialController');
const { auth } = require('../middlewares/auth.js');

router.post('/createTestimonial', TestimonialsController.createTestimonial);
router.get('/getAllTestimonialsByPage',auth, TestimonialsController.getAllTestimonialsByPage);
router.get('/getAllTestimonials', TestimonialsController.getAllTestimonials);
router.put('/updateTestimonial/:id',auth, TestimonialsController.updateTestimonial);
router.delete('/deleteTestimonial/:id',auth, TestimonialsController.deleteTestimonial);

module.exports = router;
