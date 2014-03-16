var DBFSI = require("fsi-dropbox"),
    settings = require("../settings.json");

function getDBI(auth){
	return new DBFSI({
		token: auth.accessToken,
		tokenSecret: auth.accessTokenSecret,
		uid: auth.user.id,
		key: settings.dropbox.key,
		secret: settings.dropbox.secret,
		sandbox: true
	});
}

function getGDI(auth){
	//TODO
}

module.exports = function(auth){
	if("dropbox" in auth){
		return getDBI(auth.dropbox);
	} /*else if ("google" in auth){
		return getGDI(auth.google);
	}*/ else {
		return Error("unkown service provider");
	}
};