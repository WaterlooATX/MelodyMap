// Controller imports
var index = require('./controlls/index');

module.exports = (app) => {
	app.use('/api', index);
}