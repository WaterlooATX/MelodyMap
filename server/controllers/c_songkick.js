var express = require('express'),
	m_songkick = require('../models/m_songkick'),
	router = express.Router();

//declare some route that connects to client model
router.get('/test', function(req,res){
	m_songkick.getShows()
		.then(function(data){
			res.send("Here's Data from the Controller: ", data)})
})

module.exports = router;