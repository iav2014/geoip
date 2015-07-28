/* list of all routes */
var geoip = require('./geoip');
function register(app) {
	// add your routes here ,,,,
	geoip.registerRoutes(app);
}
module.exports.register = register;



