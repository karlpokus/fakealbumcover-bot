var Jimp = require("jimp"),
    path = require('path');

function shortestSide(x, y) {
  return [x, y].sort(function(a, b){
    return a-b;
  })[0];
}

module.exports = function(req, res, next){
  Jimp.read(req.img.url, function(err, img){
    if (err) return next(err);

    var font_openSans = Jimp.FONT_SANS_64_WHITE,
        font_pask = path.join(__dirname, '..', 'fonts/Paskowy.ttf'); // does not work

    Jimp.loadFont(font_openSans, function(err, font){
      if (err) return next(err);

      var w = shortestSide(req.img.w, req.img.h);

      img
        .cover(w, w) // crop to square
        .print(font, 10, 10, req.bandName, w)
        .print(font, 10, 100, req.albumTitle, w)
        .quality(90)
        .write("./imgs/test.jpg");

      next();
    });
  });
}
