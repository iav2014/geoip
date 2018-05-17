geoip: a rest nodejs service with geolocation
==============================================

Prototype node js server (rest server) with geoip locator
This project is a prototype made ​​in node js based on routes and services.
The purpose of this server is to show how layers can organize routes ,
services, database connectors , validation schemes , and logger configuration 
files within a common project

You can clone the project. To put into operation must do the following:
clone the github proyect
npm install ( all packages)
There is a script that allows launch the project :
backend.sh
or you may jump by :
node single.js : stand alone mode or in cluster ,
node cluster.js : start in cluster mode.

This server requires a local database mongodb configured on port 27017.
The config file (lib/config.js) 
E2e test folder , shows how to implement a GET call to the server.
Also can be used to generate the post postman call.
The configuration file used to define the http and https ports server 
operation as well as the maximum number of parallel processes that can 
be used by each call to the post method.

Steps:
unzip lib/location/IP2LOCATION-LITE-DB11.CVS.zip
create mongo geoip database:
node dbmaker/01_geoip.js

create a index of geoip collection:
from mongo console:
mongo
use geoip;
db.geoip.ensureIndex({source:1});
this index allows find ip more faster.

Example: (google site)

http://localhost:3000/rs1/geoip/64.233.160.0
https://localhost:3443/rs1/geoip/64.233.160.0

			
you must obtain:
[
  {
    "_id": "55b736d0098eca36266c881d",
    "source": 1089052672,
    "target": 1089053183,
    "country": "US",
    "country_name": "United States",
    "state": "California",
    "city": "Mountain View",
    "latitude": 37.405992,
    "longitude": -122.078515,
    "postal_code": "94043",
    "timezone": "-07:00\r"
  }
]


