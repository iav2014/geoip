var logger = require('../lib/logger/logger').logger(__filename);
var config = require('../config/config');
var geoipService = require('../lib/services/backend/geoip/service');
var loader = require('../lib/loader/mongo');

loader.mongodbLoader(function (err) {
	if (err) logger.debug(err);
	else {
		logger.debug('generate geoip database in progress');
		beginProcess();
	}
});
function beginProcess() {
	geoipService.geoip_database_generate(function (status) {
		if (status) {
			logger.debug('end generate geoip database')
			process.exit(0);
		}
	})
}
