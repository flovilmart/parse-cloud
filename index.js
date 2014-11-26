var Parse = require("parse").Parse;
var bodyParser = require('body-parser');
Parse.Cloud = Parse.Cloud || {};
Parse.Cloud.job = Parse.Cloud.define = Parse.Cloud.beforeSave = Parse.Cloud.afterSave = Parse.Cloud.afterDelete = function(){};

var registered = {
}

var hook = function(hook, app) {
	return function(className, callback){
		if (typeof className == 'function') {
			className = className.prototype.className
		};
		registered[hook] ? undefined : registered[hook] = []
		registered[hook].push(className);
		app.get("/cloudcode/"+className+"/"+hook, bodyParser.json(),  function(req, res){
			callback(req.body, {
				success: function(data){
					res.send({success: data})
				},
				error: function(error){
					res.send({error: error})
				}
			})
		})
	}
}


Parse.Cloud.httpRequest = require("./lib/httpRequest");

Parse.Cloud._expressCookieEncryptionKey = function(){
	return "34dc3e303f57bd18f4b1d16995d36245";
}

module.exports.Parse = Parse;
module.exports.CloudCode = function(app) {
	Parse.Cloud.beforeSave = hook("beforeSave", app)
	Parse.Cloud.afterSave = hook("afterSave", app);
	Parse.Cloud.beforeDelete = hook("beforeDelete", app); 
	Parse.Cloud.afterDelete = hook("afterDelete", app);
}
module.exports.LogCloudCodeFunctions = function(){
	var keys = Object.keys(registered);
	for(var k in keys) {
		console.log(keys[k]+": ");
		for(var j in registered[keys[k]]) {
			console.log("    "+ registered[keys[k]][j])
		}
	}
}