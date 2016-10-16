var pype = require('pype-stack'),
    wiki = require('./lib/wikiData'),
    flickr = require('./lib/flickr'),
    jimp = require('./lib/jimp'),
    stack = [wiki, flickr, jimp],
    errorHandler = function(err, req, res){
      console.error(err);
    };

pype(null, stack, errorHandler, function(req, res){
  console.log('done!');
})({}, {});
