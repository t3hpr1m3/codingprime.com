var collections = require('metalsmith-collections'),
    define = require('metalsmith-define'),
    markdown = require('metalsmith-markdown'),
    metallic = require('metalsmith-metallic'),
    metalsmith = require('metalsmith'),
    permalinks = require('metalsmith-permalinks'),
    sass = require('metalsmith-sass'),
    serve = require('metalsmith-serve'),
    templates = require('metalsmith-templates');

var m = metalsmith(__dirname);
m
  .source('src')
  .use(define({
    site: {
      title: 'CodingPrime',
      githubUsername: 't3hpr1m3',
      twitterUsername: 't3hpr1m3',
      description: 'Write an awesome description for your new site here. You \
can edit this line in _config.yml. It will appear in your document \
head meta (for Google search results) and in your feed.xml site \
description.'
    },
    moment: require('moment')
  }))
  .use(collections({
    articles: {
      pattern: 'blog/**/*.md',
      sortBy: 'date',
      reverse: true
    }
  }))
  .use(metallic())
  .use(markdown({
    gfm: true,
    tables: true
  }))
  .use(permalinks())
  .use(templates({
    engine: 'jade',
    directory: 'templates',
    pretty: true
  }))
  .use(sass({
    outputDir: 'assets/css/',
    outputStyle: 'expanded'
  }))
  .destination('build')
  .build(function(err) {
    if (err) {
      throw err;
    }
  });

if (process.argv[2] === 'serve') {
  m.use(serve({
    host: '0.0.0.0'
  }));
}
