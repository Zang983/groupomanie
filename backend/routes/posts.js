const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/posts')
// const sauceCtrl = require('../controllers/sauce');
// const auth = require('../middleware/auth')
// const multer = require('../middleware/multer-config')


router.post('/post',postCtrl.sendPost);
router.delete('/post/delete/:id',postCtrl.deletePost);
router.get('/post/:page',postCtrl.getPosts);
router.put('/post/lock',postCtrl.lockAPost);
router.put('/post/update/:id',postCtrl.updateAPost);
router.post('/post/like/:id',postCtrl.likeAPost);



module.exports = router;