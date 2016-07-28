var express = require('express'),
	router = express.Router();

module.exports = router;

router.use('/c_user', require('./c_user'));
router.use('/c_auth', require('./c_auth'));
router.user('/c_songkick', require('./c_songkick'));