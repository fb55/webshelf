var getFSI = require("./getfsi.js"),
    getArticle = require("./getarticle.js"),
    doc = require("fs").readFileSync(__dirname + "/../static/style.css").toString();

module.exports = function(auth, cb){
	var fsi = getFSI(auth);
	if(fsi instanceof Error) cb(fsi);
	else fsi.writeFile("style.css", doc, cb);
};