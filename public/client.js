var loader = {
  el: '#loader',
  render: function(str) {
    $(this.el).html(str);
  }
};

function applyFontToCanvas(ctx, font, payload){
  var letters = payload.bandName.length,
      fontSize = Math.round(payload.img.squareSize / letters) * font.type.size,
      px = fontSize + 'px',
      x = payload.img.squareSize * font.matrix.x,
      y = payload.img.squareSize * font.matrix.y;

  ctx.font = px + ' ' + font.type.print;
  ctx.textBaseline = font.matrix.textBaseline;
  ctx.textAlign = font.matrix.textAlign;
  ctx.fillStyle = font.color;
  ctx.fillText(payload.bandName, x, y);
}

/*
function fetchFont(font) {
  var link = document.createElement('link');
  link.setAttribute("rel", "stylesheet");
  link.setAttribute("href", "http://fonts.googleapis.com/css?family=" + font.type.url);
  document.head.appendChild(link);
}
*/

// size?
var fonts = {
  type: [
    {url:'Open+Sans', print:'Open Sans', size:1.5},
    {url:'Shrikhand', print:'Shrikhand', size:1.5},
    {url:'Roboto+Slab', print:'Roboto Slab', size:1.5},
    {url:'Montserrat', print:'Montserrat', size:1.5}
  ],
  matrix: [
    {textBaseline:'middle', textAlign:'center', x:0.5, y:0.5},
    {textBaseline:'top', textAlign:'left', x:0.04, y:0.02},
    {textBaseline:'bottom', textAlign:'left', x:0.02, y:1}
  ],
  color: [
    'white', 'black', 'red', '#0099ff', '#0099cc', '#ffff99', '#33cc33'
  ]
};

function randomItemFromArray(arr) {
  var index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

function randomFontStyle() {
  return {
    type: randomItemFromArray(fonts.type),
    matrix: randomItemFromArray(fonts.matrix),
    color: randomItemFromArray(fonts.color)
  };
}

function canvasFromImage(payload, cb) {
  var img = new Image();
  img.onload = function () {
    // img -> canvas
    var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
    canvas.width = payload.img.squareSize;
    canvas.height = payload.img.squareSize;
    ctx.drawImage(img, 0, 0);
    // font
    var font = randomFontStyle();
    console.log(font); // debugging
    //fetchFont(font);
    //setTimeout(function(){
      applyFontToCanvas(ctx, font, payload);

      // done
      var dataURL = canvas.toDataURL("image/jpeg", 0.5);
      cb(dataURL);
    //}, 2000);
  }
  img.src = payload.img.base64;
}

// Event
$('#randomize').on('click', function(){
  loader.render('Fetching data from server..');

  $.get('/baseData', function(data){
    loader.render('Creating the album..');

    var payload = JSON.parse(data);
    console.log(payload); // debugging

    canvasFromImage(payload, function(dataURL){
      var img = new Image();
      img.onload = function() {
        // test
        $('#album').empty().append(img);
        loader.render('done');
      }
      img.src = dataURL;
    });

  });
});
