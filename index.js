var Parse = require("parse").Parse;

Parse.Cloud = Parse.Cloud || {};
Parse.Cloud.job = Parse.Cloud.define = Parse.Cloud.beforeSave =
Parse.Cloud.afterSave = Parse.Cloud.beforeDelete = Parse.Cloud.afterDelete = function(){};
Parse.Cloud.httpRequest = require("./lib/httpRequest");

Parse.Cloud._expressCookieEncryptionKey = function(){
	return "34dc3e303f57bd18f4b1d16995d36245";
}
Parse.User.prototype.getSessionToken = function(){
    return this._sessionToken;
}

module.exports.Parse = Parse;