var metalsmith = require('metalsmith'),
    anchor = require('markdown-it-anchor'),
    collections = require('metalsmith-collections'),
    ignore = require('metalsmith-ignore'),
    implicitFigures = require('markdown-it-implicit-figures'),
    inplace = require('metalsmith-in-place'),
    layouts = require('metalsmith-layouts'),
    markdown = require('metalsmith-markdownit'),
    metallic = require('metalsmith-metallic'),
    more = require('metalsmith-more'),
    pagination = require('metalsmith-pagination'),
    permalinks = require('metalsmith-permalinks'),
    sass = require('metalsmith-sass');

metalsmith(__dirname)
  .metadata({
    site: {
      title: 'CodingPrime',
      githubUsername: 't3hpr1m3',
      twitterUsername: 't3hpr1m3'
    },
    moment: require('moment')
  })
  .source('src')
  .destination('build')
  .clean(false)
  .use(sass({
    outputDir: 'assets/css/',
    outputStyle: 'expanded'
  }))
  .use(collections({
    articles: {
      pattern: 'blog/**/*.md',
      sortBy: 'date',
      reverse: true
    }
  }))
  .use(inplace({
    engine: 'pug',
    partials: 'templates',
    pattern: '**/*.html'
  }))
  .use(metallic())
  .use(markdown("commonmark", {
      html: true,
      typographer: true
    })
    .use(implicitFigures, { figcaption: true })
    .use(anchor, {
      permalink: true,
      permalinkSymbol: '&#128279;'
    })
  )
  .use(more({ alwaysAddKey: true }))
  .use(pagination({
    'collections.articles': {
      perPage: 5,
      first: 'index.html',
      layout: 'index.pug',
      path: 'blog/page/:num/index.html'
    }
  }))
  .use(permalinks({
    relative: false
  }))
  .use(ignore([
    'blog/page/1/index.html',
    '*.swp'
  ]))
  .use(layouts({
    engine: 'pug',
    directory: 'templates',
    partials: 'templates',
    pretty: true
  }))
  .build(function(err, files) {
    if (err) { throw err; }
    console.log('Build complete.');
  });

