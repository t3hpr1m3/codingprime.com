---
title: Metalsmith is Awesome
date: 2016-10-24
author: Josh Williams
layout: post.pug
---
I've decided to get serious about blogging (and participating on the web in
general), and as such, I need this site to be ready.  I started reviewing the
bits involved here, and realized that much of what I'm using is woefully out of
date.  So it's time to get busy.

<!--more-->

I started this post as a recap of the steps I followed to get the site up to
date.  When I was finished, I realized it was 98% of the way to being a "How to
build a site with Metalsmith" post, only shitty.  So I've revised it to be a
"How to build a site with Metalsmith" post, slightly less shitty.  There are
[many](https://segment.com/blog/building-technical-documentation-with-metalsmith/)
[examples](http://www.okaythree.com/2015/03/building-a-blog-with-metalsmith/)
[already](https://www.sitepoint.com/create-static-site-metalsmith/)
[available](http://www.petermorlion.com/creating-static-sites-with-metalsmith/),
but I'm me.  Plus, there were some interesting gotchyas I ran into along the
way, and I want to document those somewhere for my own sanity.  Now, on with the
show.

### Metalsmith

This site is built with [Metalsmith](http://metalsmith.io).  It's simple, but
extremely flexible and extensible.  It definitely isn't perfect, but it checks
several of my boxes:

- [x] it's clean
- [x] it's malleable
- [x] it isn't Ruby

Metalsmith is really at its core a build pipeline.  It works similarly to
[Gulp](http://gulpjs.com), in that source files flow through the pipeline,
getting poked and prodded along the way, until they come out the other side ready
to be deployed.  The end result of the Metalsmith pipeline is a collection of
static files that could be FTP'd to a webserver somewhere and run old-school.
No fancy server-side rendering, no platform requirements.  Just static files,
the way [Sir Timothy](https://en.wikipedia.org/wiki/Tim_Berners-Lee) intended.

![These guys didn't need dynamic languages.](https://upload.wikimedia.org/wikipedia/commons/f/fd/1924_Old_Forge_High_School_Basketball_-_Surburban_League_Champions.jpg)

For something like a personal website/blog, this is really what you want.  It's
also great for technical documentation, since you only need to speak markdown to
be able to author content.  And combined with [GitHub
Pages](https://pages.github.com) (which we will be doing here), you get free
hosting as well.  Free is good.  So let's get started.

### Starting from scratch

Well, not quite from scratch.  I'll be assuming you have
[Node.js](https://nodejs.org/en/) installed.  I do all of my development in
containers now, so my process is different.  In any event, you need at the very
least Node.  Go get it.  I'll wait.

We're going to start with a fresh directory here:

``` no-highlight
$ mkdir mysite
$ cd mysite
```

and build it out to have the following structure:

``` no-highlight
|-- build/
|-- layouts/
|-- src/
    |-- assets/
    `-- blog/
```

Now, we need a `package.json` to include all of our dependencies.  We could use
`npm init` here, but I've found it's easier to just copy/paste some boilerplate
and go from there:

``` json|package.json
{
  "name": "mysite",
  "version": "0.0.1",
  "private": true,
  "description": "My awesome Metalsmith site!",
  "author": "Average Joe",
  "license": "MIT",
}
```

With a `package.json` in place, we can get Metalsmith installed.

``` no-highlight
npm install metalsmith --save-dev
```

Now that Metalsmith is installed, let's create our initial build script.  This
will be run every time we make changes to the site contents.

``` javascript|build.js
/*
 * Pull in Metalsmith
 */
var metalsmith = require('metalsmith');

/*
 * Start the metalsmith build pipeline.  Give it the current directory to work with.
 */
metalsmith(__dirname)
  /*
   * Setup the site metadata.  More on this later.
   */
  .metadata({
    site: {
      title: 'Metalsmith Awesomeness'
    }
  })
  /*
   * Tell Metalsmith where our site's code lives
   */
  .source('src')
  /*
   * And where to place the build artifacts
   */
  .destination('build')
  /*
   * Finally, magic time.  Build us some internets.
   */
  .build(function(err, files) {
    if (err) { throw err; }
    console.log('Build complete.');
  });
```

This won't give us anything usable, but is enough to actually get Metalsmith to
start working.  Let's add a source file to feed to Metalsmith:

``` markdown|src/about.md
---
title: About Me
date: 2016-10-24
author: Average Joe
---
## About Me

I build sites with Metalsmith.
```

Not really much of an about page, but you get the idea.  We can run our build
script to generate the build:

```no-highlight
$ node build.js
Build complete.
```

If you look at the build directory, you'll see there is a single file there
(`about.md`), with the contents of the above markdown file (minus the
front-matter).  Metalsmith has built your site for you.

![Your website is ready my liege.](http://orig07.deviantart.net/d1d5/f/2012/111/1/6/avillum__blacksmith_tools_by_juanico_el_muertes-d4x1s3m.jpg)

### Processing markdown

So far, we don't really have anything useful.  A single file with some
unformatted markdown isn't going to get us to the top of
[HackerNews](https://news.ycombinator.com/).  We need some
[flair](http://www.eatough.net/images/2014/2014-05-03.jpg).

The first thing we need to do is teach Metalsmith to transform markdown into
HTML.  There are several packages available to help with this, notably:

- [metalsmith-markdown](https://github.com/segmentio/metalsmith-markdown)
- [metalsmith-markdownit](https://github.com/mayo/metalsmith-markdownit)
- [metalsmith-markdown-remarkable](https://github.com/attentif/metalsmith-markdown-remarkable)

They each have their own pros and cons.  I've decided to go with
*metalsmith-markdownit*.  It wraps
[markdown-it](https://github.com/markdown-it/markdown-it), which has a ton of
[extensions](https://www.npmjs.com/browse/keyword/markdown-it-plugin) available
to handle a number of tasks.  With this decision out of the way, let's get it
installed and into the build pipeline.

``` no-highlight
npm install metalsmith-markdownit --save-dev
```

``` javascript|build.js
var metalsmith = require('metalsmith'),
    markdown = require('metalsmith-markdownit');

metalsmith(__dirname)
  // ...
  .destination('build')
  .use(markdown("commonmark", { html: true }))
  .build(function(err, files) {
    // ...
  });
```

You can check the
[docs](https://markdown-it.github.io/markdown-it/#MarkdownIt.new) for
markdown-it, but what we're doing here is telling it to use its "commonmark"
preset, and allow HTML in our markdown.  This will be a requirement later on,
when we add in syntax highlighting and excerpts.

Let's run our build script.

``` no-highlight
node build.js
```

Again, there should be a single file in the build directory, but now it should
have an `.html` extension, and should look more like a web page:

``` html
<h1>About Me</h2>
<p>I build sites with Metalsmith.</p>
```

This is better.  Metalsmith has understood our markdown, and generated the appropriate
HTML.  Our next step is to add the containing HTML to turn this into a full-fledged web page.

### Templating

Templating in Metalsmith is handled by `metalsmith-layouts`.
_(NOTE: This used to be done using `metalsmith-templates`, but that package was
split in two.  The other became `metalsmith-in-place`, which we won't be using
here.)_

I will be using [_pug_](https://pugjs.org) (formerly `jade`) as the templating
engine of choice.

``` no-highlight
npm install metalsmith-layouts pug --save-dev
```

We want the layout to be applied **after** the markdown conversion, so we add it
to the appropriate place in the build pipeline.

``` javascript|build.js
var metalsmith = require('metalsmith'),
    layouts = require('metalsmith-layouts'),
    markdown = require('metalsmith-markdownit');

metalsmith(__dirname)
  // ...
  .use(markdown('commonmark', { html: true }))
  .use(layouts({
    engine: 'pug',
    directory: 'layouts',
    pretty: true
  }))
  .build(function(err, files) {
    // ...
  });
```

And now, we need to add a layout.  If this were a real site, we would be adding
lots of styling and flashy graphics.  For this example, we're going to keep it
simple.

``` no-highlight|layouts/main.pug
doctype html
html(lang='en')
  head
    block head
      meta(charset='utf-8')
      meta(name='viewport', content='width=device-width,initial-scale=1')
      block title
        title= site.title
  body
    header
      section.container
        h1
          a(href='/')= site.title
    main.container
      block content
        != contents
    footer.site-footer
      p.text
        span &copy;2016 Joe Awesomesauce
```

Just some simple wrapper HTML to contain our awesome About page.  The only thing
of note here is the use of `site.title`.  If you remember, when we put together
the `build.js`, we included site metatadata.  That metadata is available in any
templates.

Finally, we need to tell Metalsmith that we want to use this layout.

``` markdown|src/about.md
---
# ...
author: Average Joe
layout: main.pug
---
...
```
If we re-run the build script:

``` no-highlibht
node build.js
```

and check the `build` directory, we should now have a complete `.html` page that
could be served and viewed properly.

``` html|build/about.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Metalsmith Awesomeness</title>
  </head>
  <body>
    <header>
      <h1><a href="/">Metalsmith Awesomeness</a></h1>
    </header>
    <main class="container"><h2>About Me</h2>
<p>I build sites with Metalsmith.</p>

    </main>
    <footer class="site-footer">
      <p class="text"><span>&copy;2016 Average Joe</span></p>
    </footer>
  </body>
</html>
```

Cool.  Metalsmith is now fully capable of creating real, publishable web pages.
This is the awesomeness of Metalsmith.  It's just a pipeline for building up
functionality using plugins, with each one adding its own secret sauce.

I've uploaded the code from this post to
[Github](https://github.com/t3hpr1m3/metalsmith-example/tree/part1).  Feel free
to give it a whirl.

[Next time](/blog/2016/10/metalsmith-is-awesome-part-2), we'll add some stylesheets and syntax highlighting.
