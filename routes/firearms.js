const express = require('express');
const router = express.Router();

const firearmsController = require('../controllers/firearms');
// Personal02 fix was to include "/contacts" in each router...
router.get('/firearms', firearmsController.getAll);

router.get('/firearms/:id', firearmsController.getSingle);

router.post('/firearms', firearmsController.postFirearm);

router.put('/firearms/:id', firearmsController.updateFirearm);

router.delete('/firearms/:id', firearmsController.deleteFirearm);

module.exports = router;