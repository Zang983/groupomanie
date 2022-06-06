const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comments')

router.post('/comment/',commentCtrl.sendComment);
router.delete('/comment/:id',commentCtrl.deleteComment);
router.get('/comment/:postId',commentCtrl.getComments);
router.put('/comment/:id',commentCtrl.updateAComment);
router.post('/comment/like/:id',commentCtrl.likeAComment);
router.put('/comment/lock/:id',commentCtrl.lockCommentaire);

module.exports = router;