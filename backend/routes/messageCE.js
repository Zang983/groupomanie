const express = require('express');
const router = express.Router();
const postCe = require('../controllers/messageCE')
const auth = require('../middleware/auth')

router.post('/ceMessage/',auth,postCe.sendCE);
router.delete('/ceMessage/:id',auth,postCe.deleteCE);
router.get('/ceMessage/all',auth,postCe.getCE);
router.put('/ceMessage/:id',auth,postCe.updateCE);

module.exports = router;