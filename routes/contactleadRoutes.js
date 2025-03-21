const express = require('express');
const router = express.Router();
const ContactleadsController = require('../controllers/contactleadController');
const { auth } = require('../middlewares/auth.js');

router.post('/createContactlead', ContactleadsController.createContactlead);
router.get('/getAllContactleadsByPage',auth, ContactleadsController.getAllContactleadsByPage);
router.get('/getAllContactleads',auth, ContactleadsController.getAllContactleads);
router.put('/updateContactlead/:id',auth, ContactleadsController.updateContactlead);
router.delete('/deleteContactlead/:id',auth, ContactleadsController.deleteContactlead);

module.exports = router;
