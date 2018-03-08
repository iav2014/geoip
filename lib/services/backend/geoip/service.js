/*
 This is an example of service.
 It generates a geoip world database ip info.


 */
var logger = require('../../../../lib/logger/logger').logger(__filename);
var validator = require('../../../utils/validator');
var schema = require('../../../schemas/backend/geoip');
var methods = require('../../../commons/methods');
var config = require('../../../../config/config');
var path = require('path');
var mongoPool = require('../../../connectors/mongodb_pool');
var mongoUri = mongoPool.getUri(config.nosql.geoip.uri);
var async_entry = require('async');
var async_worker = require('async');

function getPostData(getvars, callback) {
	var dataObj = {
		ip: getvars.ip
	}
	callback(null, dataObj);
}
function checkSchema(dataObj, callback) {
	methods.validateRegister(dataObj, schema, function (err, result) {
		logger.debug('in:' + JSON.stringify(result));
		if (!err.valid) {
			logger.error(JSON.stringify(err));
			callback(true, err);
		}
		else {
			callback(null, dataObj);
		}

	});
}
function getFullPathDirectoryName(directory) {
	var fullPath = __dirname;
	var pathArray = fullPath.split(path.sep);
	var subPath = '';
	for (var i = 0; i < pathArray.length; i++) {
		if (directory == pathArray[i]) {
			break;
		}
		subPath += pathArray[i] + '/';
	}
	return subPath;
}
function geoip_database_generate(callback) {
	var geoDatabase = getFullPathDirectoryName('lib') + 'lib/location/IP2LOCATION-LITE-DB11.CSV';

	var lineReader = require('line-reader');
	logger.debug('please wait to finish geoip database')
	lineReader.eachLine(geoDatabase, function (line, last) {
		line = line.replace(/"/g, '');
		var lineArray = line.split(',');
		var json = {
			source: parseInt(lineArray[0], 10),
			target: parseInt(lineArray[1], 10),
			country: lineArray[2],
			country_name: lineArray[3],
			state: lineArray[4],
			city: lineArray[5],
			latitude: parseFloat(lineArray[6], 10),
			longitude: parseFloat(lineArray[7], 10),
			postal_code: lineArray[8],
			timezone: lineArray[9]
		}
		if (last) {
			// or check if it's the last one
			logger.debug('geoip database has been generated');
			callback(true);
		} else {
			mongoPool.get(mongoUri).insert(config.collections.geoip, json, function (err, count) {
				if (err) logger.error(err);
			});
		}
	});
}
function dot2num(dot) {
	if (dot == null) {
		logger.error('ip is null');
		return ('0.0.0.0');
	}
	var d = dot.split('.');
	return ((((((+d[0]) * 256) + (+d[1])) * 256) + (+d[2])) * 256) + (+d[3]);
}
function geoip(ip, callback) {
	var ipDec = dot2num(ip);
	var options = {
		'limit': -1,
		'sort': {source: -1}
	}
	// queryString = db.cdn_geoip.find({source:{$lte:1113983848}}).sort({source:-1}).limit(1);
	var querystring = {source: {$lte: ipDec}};
	mongoPool.get(mongoUri).find(config.collections.geoip, querystring, options, function (err, result) {
		if (err) {
			logger.error(err);
			callback(true, err);
		} else callback(null, result);
	});
}
function formatResult(dataObj, callback) {
	geoip(dataObj.ip, function (err, origin) {
		if (err) {
			logger.error(err);
			callback(true, err);
		} else {
			callback(null, origin);
		}
	})
}

function worker(post, callback) {
	async_worker.waterfall([
			async_worker.apply(getPostData, post),
			checkSchema,
			formatResult
		],
		function (err, result) {
			if (err) callback(result)
			else callback(err, result);
		}
	);
}
function entry(post, callback) {
	async_entry.parallelLimit([async_entry.apply(worker, post)], config.rest.max_callers, function (err, result) {
		if (err) logger.error('out:' + JSON.stringify(err));
		else logger.debug('out:' + JSON.stringify(result[0]));
		callback(err, result[0]);
	});
}
module.exports.entry = entry;
module.exports.geoip_database_generate = geoip_database_generate;

