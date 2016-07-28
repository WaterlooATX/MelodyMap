var express = require('express'),
	router = express.Router();


router.use('/c_user', require('./c_user'));
router.use('/c_auth', require('./c_auth'));
router.use('/c_songkick', require('./c_songkick'));

// router.get('/', function(req,res){
// 	res.send("home page")
// })


module.exports = router;