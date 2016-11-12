module.exports = function(req, res, next){
  req.data = {};
  return next();
}
