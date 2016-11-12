var pype = require('pype-stack'),
    init = require('./lib/init'),
    wiki = require('./lib/wikiData'),
    flickr = require('./lib/flickr'),
    jimp = require('./lib/jimp'),
    done = function(req, res) {
      console.log(req.data);
    },
    stack = [init, wiki, flickr, done]; // jimp

pype(null, stack, console.error)({}, {});
