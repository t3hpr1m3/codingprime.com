var metalsmith = require('metalsmith'),
    anchor = require('markdown-it-anchor'),
    atomfeed = require('metalsmith-feed-atom'),
    collections = require('metalsmith-collections'),
    drafts = require('metalsmith-drafts'),
    hljs = require('highlight.js'),
    ignore = require('metalsmith-ignore'),
    implicitFigures = require('markdown-it-implicit-figures'),
    inplace = require('metalsmith-in-place'),
    layouts = require('metalsmith-layouts'),
    markdown = require('metalsmith-markdownit'),
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
  .use(sass({
    outputDir: 'assets/css/',
    outputStyle: 'expanded'
  }))
  .use(drafts())
  .use(collections({
    articles: {
      pattern: 'blog/posts/**/*.md',
      sortBy: 'date',
      reverse: true
    }
  }))
  .use(inplace({
    engine: 'pug',
    partials: 'layouts',
    pattern: '**/*.html'
  }))
  .use(markdown("commonmark", {
      html: true,
      typographer: true,
      highlight: function(str, lang) {
        if (lang) {
          var realLang, fileName;
          if (lang.indexOf('|') == -1) {
            realLang = lang;
          } else {
            realLang = lang.split('|')[0];
            fileName = lang.split('|')[1];
          }
          var res = '<pre>';
          if (fileName) res += '<span>' + fileName + '</span>';
          res += '<code class="hljs ' + realLang + '">';
          try {
            if (realLang === 'no-highlight') {
              res += str;
            } else {
              res += hljs.highlight(realLang, str).value;
            }
          } catch (__) { res += str }
          res += '</code></pre>';
          return res;
        }
      }
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
    date: 'YYYY/MM',
    linksets: [{
      match: { collection: 'articles' },
      pattern: 'blog/:date/:title'
    }],
    relative: false
  }))
  .use(atomfeed({
    collection: 'articles',
    metadata: {
      title: 'CodingPrime',
      url: 'http://codingprime.com'
    }
  }))
  .use(ignore([
    'blog/page/1/index.html',
    '*.swp'
  ]))
  .use(layouts({
    engine: 'pug',
    directory: 'layouts',
    pretty: true
  }))
  .build(function(err, files) {
    if (err) { throw err; }
    console.log('Build complete.');
  });

