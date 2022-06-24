const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/posts')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')


router.post('/post',auth,multer,postCtrl.sendPost);
router.delete('/post/delete/:id',auth,postCtrl.deletePost);
router.get('/post/:page',auth,postCtrl.getPosts);
router.put('/post/update/:id',auth,multer,postCtrl.updateAPost);
router.post('/post/like/:id',auth,postCtrl.likeAPost);



module.exports = router; 