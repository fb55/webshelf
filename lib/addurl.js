var getFSI = require("./getfsi.js"),
    getArticle = require("./getarticle.js");

module.exports = function(auth, options, cb){
	var fsi = getFSI(auth);
	if(fsi instanceof Error) return cb(fsi);

	getArticle(options.url, function(err, article){
		if(err || article.error) return cb(err || Error(article.text));

		var title = options.title || article.title;

		//we don't want to escape characters, so this needs to be done manually
		var doc = [
			"<!doctype html><html><head><title>",
			title,
			"</title><link rel='stylesheet' href='style.css'>",
			"<meta name='viewport' content='width=device-width,initial-scale=1.0'></head>",
			"<body><h1>",
			title,
			" <a href='",
			article.location,
			"'>&rarr;</a></h1>",
			article.html,
			"</body></html>"
		].join("");

		fsi.writeFile((title.replace(/[^\w ]/g, "") || "untitled") + ".html", doc, cb);
	});
};