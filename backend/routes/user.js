const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/profil/:id',userCtrl.profil);
router.put('/parametre/:id',multer,userCtrl.parametre);
router.delete('/delete/:id',userCtrl.delete)
router.delete('/deleteAvatar/:id',userCtrl.deleteAvatar)
router.get('/userList',userCtrl.userList);

module.exports = router;