router.post('/post',postCtrl.sendCE);
router.delete('/:id',postCtrl.deleteCE);
router.get('/:page',postCtrl.getCE);
router.put('/:id',postCtrl.updateCE);
