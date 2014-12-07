module.exports = function(grunt) {
  grunt.initConfig({
    metalsmith: {
      build: {
        options: {
          metadata: {
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
          },
          plugins: {
            'metalsmith-collections': {
              articles: {
                pattern: 'blog/**/*.md',
                sortBy: 'date',
                reverse: true
              }
            },
            'metalsmith-metallic': {},
            'metalsmith-markdown': {
              grm: true,
              tables: true
            },
            'metalsmith-more': {
              alwaysAddKey: true
            },
            'metalsmith-permalinks': {},
            'metalsmith-pagination': {
              'collections.articles': {
                perPage: 5,
                template: 'index.jade',
                first: 'index.html',
                path: 'blog/page/:num/index.html'
              }
            },
            'metalsmith-ignore': ['blog/page/1/index.html'],
            'metalsmith-templates': {
              engine: 'jade',
              directory: 'templates',
              pretty: true
            },
            'metalsmith-sass': {
              outputDir: 'assets/css/',
              outputStyle: 'expanded'
            }
          },
          clean: false
        },
        src: 'src',
        dest: 'build'
      }
    },
    watch: {
      src: {
        files: ['src/**/*.*', 'templates/**/*.jade'],
        tasks: ['default']
      }
    },
    connect: {
      server: {
        options: {
          port: 3003,
          base: {
            path: 'build'
          },
          keepalive: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-metalsmith');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.registerTask('default', ['metalsmith']);
  grunt.registerTask('serve', ['connect']);
};
