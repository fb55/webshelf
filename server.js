var express = require("express"),
    everyauth = require("everyauth"),
    app = express(),
    addURL = require("./lib/addurl.js"),
    addStyles = require("./lib/addstyles.js");

everyauth.dropbox
	.consumerKey(process.env.DROPBOX_KEY)
	.consumerSecret(process.env.DROPBOX_SECRET)
	.handleAuthCallbackError(function (req, res){
		res.redirect("/#loginerror");
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

function checkAuth(req, resp, next){
	if(!("auth" in req.session)) resp.redirect("/#notloggedin");
	else next();
}

app.get("/", function(req, resp, next){
	if("auth" in req.session) resp.redirect("/app");
	else next();
}, express.static("static/"));

app.get("/example.html", express.static("static/"));
app.get("/style.css", express.static("static/"));

app.get("/app", checkAuth, function (req, resp){
	resp.sendfile(__dirname +  "/static/app.html");
});

app.get("/add", checkAuth, function (req, resp, next){
	if(!("url" in req.query)) return next(Error("No URL specified!"));
	try {
		addURL(req.session.auth, req.query, function(err){
			if(err) next(err);
			else resp.redirect("/app#added");
		});
	} catch(err){
		next(err);
	}
});

app.get("/addstyles", checkAuth, function(req, resp, next){
	addStyles(req.session.auth, function(err){
		if(err) next(err);
		else resp.redirect("/app#added");
	});
});

app.use(everyauth.middleware(app));

app.listen(process.env.PORT || 3e3);