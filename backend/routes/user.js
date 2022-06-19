const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')
const rateLimit = require("express-rate-limit")

/*On limite les tentatives de connexion à 15 en 15 minutes*/
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, 
	max: 15, 
	standardHeaders: true, 
	legacyHeaders: false, 
})


router.post('/signup', userCtrl.signup);
router.post('/login',limiter, userCtrl.login);
router.get('/profil/:id',auth,userCtrl.profil);
router.put('/parametre/:id',auth,multer,userCtrl.parametre);
router.delete('/delete/:id',auth,userCtrl.delete)
router.delete('/deleteAvatar/:id',auth,userCtrl.deleteAvatar)
router.get('/userList',auth,userCtrl.userList);

module.exports = router;