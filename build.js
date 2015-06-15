var metalsmith  = require('metalsmith'),
    markdown    = require('metalsmith-markdown'),
    templates   = require('metalsmith-templates'),
    collections = require('metalsmith-collections'),
    permalinks  = require('metalsmith-permalinks'),
    jade        = require('jade'),
    handlebars  = require('handlebars'),
    moment      = require('moment'),
    fs          = require('fs');


handlebars.registerPartial('header', fs.readFileSync(__dirname + '/templates/header.hbt').toString());
handlebars.registerPartial('footer', fs.readFileSync(__dirname + '/templates/footer.hbt').toString());

var siteBuild = metalsmith(__dirname)
  	.metadata({
      site: {
        title: 'DamianFlynn.com',
        url: 'http://DamianFlynn.com'
      }
    })
    .source('./src')
    .destination('./build')
    .use(collections({
        pages: {
            pattern: 'pages/*.md'
        },
        posts: {
            pattern: 'posts/*.md',
            sortBy: 'date',
            reverse: true
        }
    }))
    .use(markdown())
    .use(permalinks({
      pattern: ':collection/:title'
    }))
    .use(templates({
      //engine: 'jade',
      engine: 'handlebars',
      moment: moment
    }))
    .build(function (err) {
      if (err) {
        console.log(err);
      }
      else {
        console.log('Site build complete!');
      }
    });
