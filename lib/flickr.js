var https = require('https'),
    querystring = require('querystring'),
    settings = require('../settings.json'),
    opts = {
      method: 'flickr.interestingness.getList',
      api_key: settings.api_key,
      format: 'json',
      nojsoncallback: 1,
      date: dateString(7),
      extras: 'url_c, url_b, url_l, url_h',
      per_page: 5
    };

function dateString(decr) {
  var d = new Date();
  d.setDate(d.getDate() - decr);
  return d.toJSON().substr(0, 10);
}

function size(o) {
  var sizes = ['h', 'l', 'c'];

  return sizes.map(function(x){
    if (o['url_' + x]) {
      return {
        url: o['url_' + x],
        w: o['width_' + x],
        h: o['height_' + x]
      };
    } else {
      return null;
    }
  }).filter(function(x){
    return x !== null;
  })[0];
}

function flickrData(opts, cb) {
  var url = 'https://api.flickr.com/services/rest/?';
  url += querystring.stringify(opts);

  https.get(url, function(res) {
    var data = '';

    res
      .on('error', cb)
      .on('data', function(chunk) {
        data += chunk;
      })
      .on('end', function(){
        try {
          var json = JSON.parse(data);
        } catch (e) {
          return cb(new Error("Error parsing JSON"));
        }
        cb(null, json);
      });

  }).on('error', cb);
}

module.exports = function(req, res, next){
  flickrData(opts, function(err, res){
    if (err) return next(err.message);

    if (res.stat === 'ok' && res.photos.photo.length > 0) {
      req.img = size(res.photos.photo[4]);
      next();
    } else {
      next(res);
    };
  });
}

/*
The letter suffixes are as follows:

s	small square 75x75
q	large square 150x150
t	thumbnail, 100 on longest side
m	small, 240 on longest side
n	small, 320 on longest side
-	medium, 500 on longest side
z	medium 640, 640 on longest side
c	medium 800, 800 on longest side†
b	large, 1024 on longest side*
h	large 1600, 1600 on longest side†
k	large 2048, 2048 on longest side†
o	original image, either a jpg, gif or png, depending on source format
*/
