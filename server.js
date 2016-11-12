var http = require('http'),
    fs = require('fs'),
    pype = require('pype-stack'),
    init = require('./lib/init'),
    wiki = require('./lib/wikiData'),
    flickr = require('./lib/flickr'),
    server = http.createServer(),
    port = process.env.PORT || 3000;

server
  .on('request', function(req, res){
    // html
    if (req.method === 'GET' && req.url === '/') {
      fs.createReadStream('./public/index.html').pipe(res);
      // js
    } else if (req.method === 'GET' && /\.js/.test(req.url)) {
      fs.createReadStream('./public/client.js').pipe(res);
      // baseData
    } else if (req.method === 'GET' && req.url === '/baseData') {
      pype(null, [init, wiki, flickr], console.error, function(req, res){
        res.end(JSON.stringify(req.data));
      })(req, res);
      // noop
    } else {
      res.end('noop!');
    }
  }).listen(port, function(){
    console.log('Server running..');
  });
