const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/profil/:id',auth,userCtrl.profil);
router.put('/parametre/:id',auth,multer,userCtrl.parametre);
router.delete('/delete/:id',auth,userCtrl.delete)
router.delete('/deleteAvatar/:id',auth,userCtrl.deleteAvatar)
router.get('/userList',auth,userCtrl.userList);

module.exports = router;