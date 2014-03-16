var express = require("express"),
    everyauth = require("everyauth"),
    app = express(),
    addURL = require("./lib/addurl.js"),
    addStyles = require("./lib/addstyles.js"),
    fs = require("fs");

function redirect(resp, path){
	resp.status(301);
	resp.header("location", path);
	resp.end();
}

everyauth.dropbox
	.consumerKey(process.env.DROPBOX_KEY)
	.consumerSecret(process.env.DROPBOX_SECRET)
	.handleAuthCallbackError(function (req, res){
		redirect(res, "/#loginerror");
	})
	.findOrCreateUser(function (session, accessToken, accessSecret){
		return {
			token: accessToken,
			tokenSecret: accessSecret
		};
	})
	.redirectPath("/app");

app
	.use(express.bodyParser())
	.use(express.cookieParser("foo"))
	.use(express.session());

app.get("/", function(req, resp, next){
	if("auth" in req.session) redirect(resp, "/app");
	else next();
}, express.static("static/"));

app.get("/example.html", express.static("static/"));
app.get("/style.css", express.static("static/"));

app.get("/app", function(req, resp, next){
	if(!("auth" in req.session)) redirect(resp, "/#notloggedin");
	else next();
}, function (req, resp){
	fs.createReadStream(__dirname + "/static/app.html").pipe(resp);
});

app.get("/add", function (req, resp, next){
	if(!("auth" in req.session)) return redirect(resp, "/#notloggedin");
	if(!("url" in req.query)) return next(Error("No URL specified!"));
	try {
		addURL(req.session.auth, req.query, function(err){
			if(err) next(err);
			else redirect(resp, "/app#added");
		});
	} catch(err){
		next(err);
	}
});
app.get("/addstyles", function(req, resp, next){
	if(!("auth" in req.session)) return redirect(resp, "/#notloggedin");
	addStyles(req.session.auth, function(err){
		if(err) next(err);
		else redirect(resp, "/app#added");
	});
});

app.use(everyauth.middleware(app));

app.listen(process.env.PORT || 3e3);