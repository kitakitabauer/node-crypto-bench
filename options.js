var optimist = require('optimist')
        .usage('Usage: -a [algorithm] -e [encoding] -d [data] -l [loop] -v [verbose]')
        .options('a', {
            alias: 'algorithm'
        })
        .options('e', {
            alias: 'encoding'
        })
        .options('d', {
            alias: 'data'
        })
        .options('l', {
            alias: 'loop'
        })
        .options('v', {
            alias: 'verbose',
            default: false
        })
        .boolean(['v'])
        .argv
    ;

exports.parser = optimist;
