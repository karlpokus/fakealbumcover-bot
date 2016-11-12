var https = require('https'),
    bandNameURL = 'https://en.wikipedia.org/wiki/Special:Random',
    albumTitleURL = 'https://en.wikiquote.org/wiki/Special:Random';

function getWikiData(url, cb) {
  https.get(url, function(res){
    var parts = res.headers.location.split('/'),
        str = parts[parts.length -1];
    cb(null, str);
  }).on('error', cb);
};

function cleanUp(str) {
  return decodeURIComponent(str).replace(/_/g, " ");
}

module.exports = function(req, res, next) {
  getWikiData(bandNameURL, function(err, bandName){
    if (err) return next(err.message);

    getWikiData(albumTitleURL, function(err, albumTitle){
      if (err) return next(err.message);

      req.data.bandName = cleanUp(bandName);
      req.data.albumTitle = cleanUp(albumTitle);

      next();
    });
  });
};
