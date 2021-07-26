const express = require('express');
const router = express.Router();

router.use('/login', require('./login'));
/*router.use('/Inmuebles', require('./inmueble'));*/
router.use('/recipes', require('./recipe'));
router.use('/hashtags', require('./hashtag'));
router.use('/users', require('./user'));

module.exports = router;