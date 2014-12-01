module.exports = function(grunt) {
  grunt.initConfig({
    metalsmith: {
      build: {
        options: {
          metadata: {
            title: 'CodingPrime',
            githubUsername: 't3hpr1m3',
            twitterUsername: 't3hpr1m3',
            description: 'Write an awesome description for your new site here. You \
  can edit this line in _config.yml. It will appear in your document \
  head meta (for Google search results) and in your feed.xml site \
  description.',
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
            'metalsmith-permalinks': {},
            'metalsmith-templates': {
              engine: 'jade',
              directory: 'templates',
              pretty: true
            },
            'metalsmith-sass': {
              outputDir: 'assets/css/',
              outputStyle: 'expanded'
            }
          }
        },
        src: 'src',
        dest: 'build'
      }
    }
  });

  grunt.loadNpmTasks('grunt-metalsmith');
  grunt.loadNpmTasks('grunt-contrib-watch');
};
