#Webshelf
a different kind of read-it-later app

###Your articles, always with you

WebShelf let's you store the articles you want to read later where you'll definitely download them: Your Dropbox. Therefore, when you sync your Dropbox, you'll also get your articles, in a beautiful format ([example](/example.html)).

###Features

1. Uses the well-known Readability-algorithm via [readabilitySAX](https://github.com/fb55/readabilitySAX) and therefore produces great articles.
1. Articles are saved as single HTML5 files. All images are embeded into the file, thanks to the [inline](https://github.com/fb55/node-inline) module, which was created for this project (during node knockout).
1. Automatic archive of articles thanks to Dropbox.
1. Command-line-enabled: Full-text-search is available via `grep`, you can view articles using a text-based browser and do with them whatever you like to do. Nothing prevents you from changing the files, as well as the stylesheet.
1. Sharing just got even better: You don't need to send a link anymore that may lead to a dead end. Instead, you can send the whole HTML document.
1. It respects `robots.txt` files, so you stop people from reading your articles (the user-agent is `Mozilla/5.0 (compatible; readabilitySAX/1.5; +https://github.com/fb55/readabilitySAX)`.

###History

Webshelf was originally written during Node Knockout 2012. Unfortunately, while coding, the only focus was to get a working application, which lead to the inclusion of secret keys in the source code. It took 1.5 years until I remembered that releasing this could be useful to others. That's why I fixed the one bug that caused a lot of crashes during the competition and now release the source code.

<!-- TODO add licensing information -->