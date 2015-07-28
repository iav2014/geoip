/*
 this middleware only display request method before calling route
 */
var logger = require('../logger/logger').logger(__filename);
function requestBodyParams(req, res, next) {
	logger.warn(req.method + ' - ' + req.url);
	next();
};
module.exports.requestBodyParams = requestBodyParams;

