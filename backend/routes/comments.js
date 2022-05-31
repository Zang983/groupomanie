router.post('/comment/',postCtrl.sendComment);
router.delete('/comment/:id',postCtrl.deleteComment);
router.get('/comment/:',postCtrl.getComments);
router.put('/comment/:id',postCtrl.updateAComment);
router.post('/comment/:id/like',postCtrl.likeAComment);

module.exports = router;