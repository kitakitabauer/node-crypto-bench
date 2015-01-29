var crypto = require('crypto'),
    argv = require('./options').parser;

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

console.log('algorithm:' + argv.a + ', encoding:' + argv.e + ', data:' + argv.d + ', loop:' + argv.l);
console.log();

function toHash(algorithm, encoding, arg) {
    var sum = crypto.createHash(algorithm);

    sum.update(arg);

    debug(sum.digest(encoding));
}

// function createCipher(algorithm, arg) {
    // var cipher = crypto.createCipher(algorithm, arg.toString());
    // cipher.update(arg, 'utf8', 'hex');
    // var text = cipher.final('hex');

    // // 複合
    // var decipher = crypto.createDecipher(algorithm, arg);
    // decipher.update(text.toString(), 'hex', 'utf8');
    // var dec = decipher.final('utf8');
// }

exports.execute = function() {
    console.time('time');
    for (var i = 0; i < argv.l; i++) {
        toHash(argv.a, argv.e, argv.d);
        // createCipher('aes192', argv.d);
    }
    console.timeEnd('time');
};

process.on('uncaughtException', function (e) {
    console.error('uncaughtException: ' + e.stack);
    process.exit(1);
});
