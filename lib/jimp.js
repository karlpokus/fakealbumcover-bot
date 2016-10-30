var Jimp = require("jimp"),
    path = require('path');

function createImg(img, bandFont, albumFont, req, next) {
  var w = (req.img.w >= req.img.h)? req.img.h: req.img.w;

  img
    .cover(w, w) // crop to square
    .print(bandFont, 10, 10, req.bandName, w)
    .print(albumFont, 10, 200, req.albumTitle, w)
    .quality(90)
    .write("./imgs/test3.jpg");

  next();
}

module.exports = function(req, res, next){
  Jimp.read(req.img.url, function(err, img){
    if (err) return next(err);

    var font_pask = path.join(__dirname, '..', 'fonts/Paskowy.ttf'); // does not work

    Jimp.loadFont(Jimp.FONT_SANS_128_WHITE, function(err, bandFont){
      if (err) return next(err);

      Jimp.loadFont(Jimp.FONT_SANS_64_WHITE, function(err, albumFont){
        if (err) return next(err);

        createImg(img, bandFont, albumFont, req, next);
      });
    });
  });
}
