
var prod = {
        'sitename': 'DamianFlynn.com',
        'baseUrl': '',
        'description': 'Static Blog Site',
        'isDev': false
    },
    dev = {
        'sitename': 'DamianFlynn.com (DEV)',
        'baseUrl': 'http://localhost:3000',
        'description': 'Development Blog',
        'isDev': true
    };

module.exports = function(args) {
    'use strict';
    var config = prod;

    args.forEach(function(val) {
        if (val === '--dev' || val === '-d') {
            config = dev;
        }
    });

    return config;

};
