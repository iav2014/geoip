/*
 this file define schema validator for data entry get/post calling.
 One route and service must have one schema file like this,,,,
 */
var schema = {
	properties: {
		ip: {
			type: 'string',
			required: true,
			message: 'ip property is required'
		}
	}
}
module.exports.schema = schema;
