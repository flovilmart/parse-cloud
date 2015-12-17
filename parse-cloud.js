var ParseCloud = require('parse-cloud-express');
var Parse = ParseCloud.Parse;
var bodyParser = require('body-parser');

var registered = {}

//Parse.Cloud.httpRequest = require("./lib/httpRequest");

Parse.Cloud._expressCookieEncryptionKey = function(){
	return "34dc3e303f57bd18f4b1d16995d36245";
}

module.exports.Parse = Parse;
module.exports.ParseCloud = ParseCloud;

module.exports.LogCloudCodeFunctions = function(){
	var keys = Object.keys(registered);
	for(var k in keys) {
		console.log(keys[k]+": ");
		for(var j in registered[keys[k]]) {
			console.log("    "+ registered[keys[k]][j])
		}
	}
}