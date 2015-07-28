var request = require('request');
var server = require('../../../../lib/backend');
var should = require('should');
var config = require('../../../../config/config');

var url = 'http://localhost:' + config.app.http + '/rs1/';
var timeout = 10000;

describe('#E2E geoip, server start  ', function () {
	before(function (done) {
		this.timeout(timeout);
		if (!server.active()) server.start();
		setTimeout(function () {
			done();
		}, 5000);
	});
	it('#geoip display google location', function (done) {
		this.timeout(timeout);
		var options = {
			uri: url + 'geoip/64.233.160.0',
			json: {}
		};
		request.get(options, function (err, result) {
			should.not.exists(err);
			if (err) {
				done(err);
			}
			else {
				should.exists(result.body[0].city);
				done();
			}
		});
	});

	it('#geoip  error, ip field is mandatory !', function (done) {
		this.timeout(timeout);
		var options = {
			uri: url + 'geoip',
			json: {}
		};
		request.get(options, function (err, result) {
			should.not.exists(err);
			if (err) {
				done(err);
			}
			else {
				result.statusCode.should.be.equal(404);
				done();
			}
		});
	});
});

