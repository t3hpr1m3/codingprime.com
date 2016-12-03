---
title: Metalsmith is Awesome (Part 2)
date: 2016-10-28
author: Josh Williams
layout: post.pug
draft: false
---

[Last time](blog/2010/10/metalsmith-is-awesome), we got
[Metalsmith](http://metalsmith.io) up and running, generating a single static
page.  This was a good first step, but we need more.  If we intend to build a
fully functional blog or documentation site, we need things like style and
syntax highlighting.  We'll also need to add some structure to the site, as well
as the ability to generate sane permalinks.

<!--more-->

### Faster development

Before we get started with any of that, though, we need to tighten our feedback
loop.  We're going to be making lots of changes to the site quickly, and we need
a way to see our results.  Dropping out to a shell to run `node build` after
each change, then opening the resulting file is just too slow.  So we're going
to set up a watcher for our files, and run a simple static `Node.js` server to
handle serving our content.

![wait time: 0](https://c1.staticflickr.com/9/8494/8432392004_39d1505f6c_b.jpg)

We're going to be using [Express](http://expressjs.com/) to serve our site
locally, so we'll start by installing it and the `serve-static` plugin.

``` no-highlight
npm install express serve-static --save-dev
```

We need to create a script to hand over control to Express:

``` javascript|index.js
var express = require('express'),
    serveStatic = require('serve-static');

var app = express();

// Port can be overrideen with an environment variable.
var port = process.env.PORT || 3003;

app.use(serveStatic('build'));
app.listen(port);
```

Very simple.  Just point `serve-static` at our build directory, and default to
listening on port *3003*.  We can crank up the server directly with `node
index.js`, but let's do this the `npm way`:

``` json|package.json
{
	/* ... */

	"scripts": {
		"server": "node index.js"
	}
	/* ... */
}
```

With this in place, we should be able to simply:

``` no-highlight
npm run server
```

Our "site" should now be served on port 3003.  We can confirm this by pointing a
browser at `http://localhost:3003/about.html`.  We should see our super mega
awesome about page in all its glory.  Now we need our site to be automatically
rebuilt every time we change a file.  For starters, let's add an npm task to
handle the building.

``` json|package.json
{
  /* ... */
  "scripts": {
    "server": "node index.js",
    "build": "node build.js"
  }
}
```

We can now use

``` no-highlight
npm run build
```

to rebuild the site.  The trick is tying these 2 together, so they both run back
to back when we make changes.  For this, we're going to use a utility called
[nodemon](http://nodemon.io/).  Let's get it installed.

``` no-highlight
npm install -g nodemon
```

We install it globally so we can execute it directly from the CLI.  Now we need
to tweak the scripts in our `package.json`:

``` json|package.json
{
  /* ... */
  "scripts": {
    "server": "node index.js",
    "build": "node build.js",
    "start": "npm run build && npm run server",
    "run-watch": "nodemon -e js,md,pug,scss --ignore build/ --exec npm start"
  }
}
```

What this does is allow us some flexibility.  `npm run server` will just start
the express server, `npm run build` will invoke the Metalsmith pipeline to
generate the site, `npm run start` will build the site, and immediately start
the express server, and `npm run run-watch` will build the site, run the server,
and repeat both steps when any changes are made.  There are many more
elegant ways to accomplish this, but this one will work for our purposes.
For now, just crank the environment up with

``` no-highlight
npm run run-watch
```

You should be able to visit `http://localhost:3003/about.html`, and our about
page should be accessible.  From here on out, we should not need to restart the
server to see our changes take effect.

### Giving it some flair

Now that we can quickly see our changes, it's time to add some styling to
our little site.  I prefer [Sass](http://sass-lang.com), so that's what we will
be using here.  If you prefer [Less](http://lesscss.org) or
[Stylus](http://stylus-lang.com), there are Metalsmith
[packages](https://www.npmjs.com/package/metalsmith-less)
[available](https://www.npmjs.com/package/metalsmith-stylus) as well.

To get started, we need to add
[metalsmith-sass](https://www.npmjs.com/package/metalsmith-sass) to our project.

``` no-highlight
npm install metalsmith-sass --save-dev
```

Next, we need to add a basic stylesheet.

``` scss|src/assets/style.scss
html {
	line-height: 1.6em;
	font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
	font-size: 100%;
	color: #333333;
	
	a {
		color: #123eab;
	}
}
```

That's about as basic as it gets, and bare includes any Sass, but will
do for our purposes.  Full styling is really out of scope for this discussion.

We need to now get Metalsmith to preprocess this file and dump the result in our
build directory.

``` javascript|build.js
var metalsmith = require('metalsmith'),
    layouts = require('metalsmith-layouts'),
    markdown = require('metalsmith-markdownit'),
    sass = require('metalsmith-sass');

metalsmith(__dirname)
  // ...
  .use(sass({
    outputDir: 'assets/css/',
    outputStyle: 'expanded'
  }))
  .use(markdown('commonmark', { html: true }))
  // ...
```

All that's left is to get our stylesheet actually included in our pages.  We do
this by adding it to our site's template.

``` no-highlight|layouts/main.pug
doctype html
// ...
      meta(name='viewport', content='width=device-width,initial-scale=1')
      link(rel='stylesheet', href='assets/style.css')
// ...
```

If everything is wired up properly, the app should kick off a new build, and
restart the server.  Refreshing our page should show you a newer, slightly
better version than what we had before.

### Wrapping up

Since last time, we've got our site auto-building itself on changes, and it
looks oh-so-much better (lulz).  Next time, we'll start putting together some
real content, complete with syntax highlighting of any code snippets we add.
Same as last time, everything I've done here is availble [on
Github](https://github.com/t3hpr1m3/metalsmith-example/tree/part2).
