var crypto = require('crypto'),
    argv = require('optimist')
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

var debug = argv.v ? console.log : function() {};

if (argv.a !== 'md5' &&
    argv.a !== 'sha1' &&
    argv.a !== 'sha256' &&
    argv.a !== 'sha512') {
    console.error('algorithm error', argv.a);
    return;
}

if (argv.e !== 'hex' &&
    argv.e !== 'binary' &&
    argv.e !== 'base64') {
    console.error('encoding error', argv.e);
    return;
}

if (!argv.d || argv.d === '') {
    console.error('arg error', argv.d);
}

console.log('algorithm =', argv.a);
console.log('encoding =', argv.e);
console.log('arg =', argv.d);
console.log('loop =', argv.l);
console.log();

function toHash(algorithm, encoding, arg) {
    var sum = crypto.createHash(algorithm);

    sum.update(arg);
    debug(algorithm + ':' + encoding);

    debug(sum.digest(encoding));
}

function exec() {
    console.time('time');
    for (var i = 0; i < argv.l; i++) {
        toHash(argv.a, argv.e, argv.d);
    }
    console.timeEnd('time');
}

process.on('uncaughtException', function (e) {
    console.error('uncaughtException: ' + e.stack);
    process.exit(1);
});

exec();
