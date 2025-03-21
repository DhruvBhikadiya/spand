const express = require('express');
const router = express.Router();
const PaymentsettingsController = require('../controllers/paymentsettingController');
const { auth } = require('../middlewares/auth.js');

router.post('/createPaymentsetting',auth, PaymentsettingsController.createPaymentsetting);
router.get('/getPaymentsetting', PaymentsettingsController.getAllPaymentsettings);
router.put('/updatePaymentsetting/:id',auth, PaymentsettingsController.updatePaymentsetting);
router.delete('/deletePaymentsetting/:id',auth, PaymentsettingsController.deletePaymentsetting);

module.exports = router;