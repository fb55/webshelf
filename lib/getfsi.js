var Dropbox = require("dropbox");

module.exports = function(auth){
	return new Dropbox.Client({
		token: auth.dropbox.accessToken,
		tokenSecret: auth.dropbox.accessTokenSecret,
		uid: auth.dropbox.user.id,
		key: process.env.DROPBOX_KEY,
		secret: process.env.DROPBOX_SECRET,
		sandbox: true
	});
};