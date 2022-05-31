const express = require('express');
const router = express.Router();
const postCe = require('../controllers/messageCE')

router.post('/ceMessage/',postCe.sendCE);
router.delete('/ceMessage/:id',postCe.deleteCE);
router.get('/:ceMessage/all',postCe.getCE);
router.put('/:ceMessage/:id',postCe.updateCE);

module.exports = router;