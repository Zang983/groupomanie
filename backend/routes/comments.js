const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comments')
const auth = require('../middleware/auth')

router.post('/comment/',auth,commentCtrl.sendComment);
router.delete('/comment/:id',auth,commentCtrl.deleteComment);
router.get('/comment/:postId',auth,commentCtrl.getComments);
router.put('/comment/:id',auth,commentCtrl.updateAComment);
router.post('/comment/like/:id',auth,commentCtrl.likeAComment);


module.exports = router;