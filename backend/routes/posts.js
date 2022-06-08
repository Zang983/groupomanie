const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/posts')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')
// const sauceCtrl = require('../controllers/sauce');
// const auth = require('../middleware/auth')
// const multer = require('../middleware/multer-config')


router.post('/post',multer,postCtrl.sendPost);
router.delete('/post/delete/:id',postCtrl.deletePost);
router.get('/post/:requete/:page',postCtrl.getPosts);
router.put('/post/lock',postCtrl.lockAPost);
router.put('/post/update/:id',multer,postCtrl.updateAPost);
router.post('/post/like/:id',postCtrl.likeAPost);



module.exports = router;