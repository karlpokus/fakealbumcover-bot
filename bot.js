var pype = require('pype-stack'),
    init = require('./lib/init'),
    wiki = require('./lib/wikiData'),
    flickr = require('./lib/flickr'),
    jimp = require('./lib/jimp'),
    done = function(req, res) {
      req.data.img.base64 = req.data.img.base64.substr(0, 100); // too huge
      console.log(req.data);
    },
    stack = [init, wiki, flickr, jimp, done];

pype(null, stack, console.error)({}, {});
