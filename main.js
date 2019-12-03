const camera = require('./camera')
const vorpal = require('vorpal')();
const chalk = vorpal.chalk;

vorpal.command('camera', 'Recupera imagen de camara random').action(function (args, callback) {
    camera().then(() => {
        callback();
    })
})
vorpal.delimiter('$cli>').show();