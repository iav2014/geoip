module.exports = {
	app: {
		host: '0.0.0.0',
		http: 3000,
		https: 3443
	},
	rest: {
		path: '/rs1/',
		max_callers: 1000
	},
	logger: {
		levels: {
			default: 'DEBUG'
		},
		appenders: [
			{
				category: '[all]',
				type: 'console',
				layout: {
					type: 'pattern',
					pattern: '%d{yyyy-MM-ddThh:mm:ssO}|%[%p%]|%m'
				}
			}
		],
		replaceConsole: false
	},
	database_policy: {
		retry: 0
	},
	databases: {
		geoip: {
			host: 'localhost',
			port: 27017,
			database: 'geoip',
			user: '',
			password: ''
		}
	},
	collections: {
		geoip: 'geoip'
	}
};
