var express = require('express'),
	m_songkick = require('../models/m_songkick'),
	router = express.Router();

module.exports = router;


//declare some route that connects to client model
router.get('', function(req,res){
	m_songkick.getInfo()
		.then()
})