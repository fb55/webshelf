var getURL = require("readabilitySAX").get,
    Inline = require("inline"),
    robots = require("robots"),
    url = require("url");

function canLoadPage(uri, cb){
	var r = new robots.RobotsParser();
	r.setUrl(url.resolve(uri, "/robots.txt"), function (parser, success){
		if(success){
			parser.canFetch(
				"Mozilla/5.0 (compatible; readabilitySAX/1.5; +https://github.com/fb55/readabilitySAX)",
				url.parse(uri).path,
				cb
			);
		} else {
			cb(true); //no robots.txt file found
		}
	});
}

module.exports = function(url, cb){
	canLoadPage(url, function (b){
		if(!b){
			return cb({
				error: true,
				title: "error",
				html: "the site you requested couldn't be downloaded"
			});
		}
		getURL(url, function (article){
			var inline = new Inline(article.location || url, function(err, html){
				if(err) return cb(err);
				article.html = html;
				cb(null, article);
			});
			inline.end(article.html);
		});
	});
};