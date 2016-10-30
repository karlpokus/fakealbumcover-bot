var pype = require('pype-stack'),
    wiki = require('./lib/wikiData'),
    flickr = require('./lib/flickr'),
    jimp = require('./lib/jimp'),
    done = function(req, res) {
      [req.bandName,
        req.albumTitle,
        req.img.url,
        req.img.w,
        req.img.h,
        'done'
      ].forEach(function(item){
        console.log(item);
      });
    }
    stack = [wiki, flickr, jimp, done];

pype(null, stack, console.error)({}, {});
