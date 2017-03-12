var Jimp = require("jimp"),
    path = require('path');

module.exports = function(req, res, next){
  Jimp.read(req.data.img.url, function(err, img){
    if (err) return next(err);

    img
      .cover(600, 600) // w, w - crop to square
      //.quality(100)
      .getBase64(Jimp.AUTO, function(err, encodedImg){ // "image/png"
        if (err) return next(err);

        req.data.img.squareSize = 600; // w
        req.data.img.base64 = encodedImg;
        return next();
      });
  });
}
