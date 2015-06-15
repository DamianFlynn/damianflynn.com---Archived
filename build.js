var Metalsmith = require('metalsmith'),
    markdown   = require('metalsmith-markdown'),
    templates  = require('metalsmith-templates');

var siteBuild = metalsmith(__dirname)
    .metadata({
      site: {
        title: 'DamianFlynn.com',
        url: 'http://DamianFlynn.com'
      }
    })
    .source('./src')
    .destination('./build')
    .use(templates('handlebars'))
    .build(function (err) {
      if (err) {
        console.log(err);
      }
      else {
        console.log('Site build complete!');
      }
    });
