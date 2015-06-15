
var prod = {
        'sitename': 'Damian Flynn',
        'baseUrl': 'http://DamianFlynn.com',
        'description': 'Static Blog Site',
        'isDev': false
    },
    dev = {
        'sitename': 'Damian Flynn (DEV)',
        'baseUrl': 'http://localhost:3000',
        'description': 'Development Blog',
        'isDev': true
    };

module.exports = function(args) {
    'use strict';
    var config = dev;

    args.forEach(function(val) {
        if (val === '--prod' || val === '-p') {
            config = prod;
        }
    });

    return config;

};
