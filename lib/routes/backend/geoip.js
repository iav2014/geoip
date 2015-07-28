var logger = require('../../logger/logger').logger(__filename);
var path = require('../../../config/config').rest.path;
var geoipService = require('../../services/backend/geoip/service');

function middleware(req, res) {
	logger.debug('geoip get method called');
	geoipService.entry(req.params, function (err, result) {
		if (err) res.send(err);
		else res.send(result);
	});
}
exports.registerRoutes = function (app) {
	app.get(path + 'geoip/:ip', middleware);
};
