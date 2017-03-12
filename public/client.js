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

createHiDPICanvas = function(w, h, ratio) {
  function PIXEL_RATIO() {
    var ctx = document.createElement("canvas").getContext("2d"),
        dpr = window.devicePixelRatio || 1,
        bsr = ctx.webkitBackingStorePixelRatio ||
              ctx.mozBackingStorePixelRatio ||
              ctx.msBackingStorePixelRatio ||
              ctx.oBackingStorePixelRatio ||
              ctx.backingStorePixelRatio || 1;
    return dpr / bsr;
  };

  if (!ratio) {
    ratio = PIXEL_RATIO();
  }
  var can = document.createElement("canvas");
  can.width = w * ratio;
  can.height = h * ratio;
  can.style.width = w + "px";
  can.style.height = h + "px";
  can.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
  return can;
}

function canvasFromImage(payload, cb) {
  var img = new Image();
  img.onload = function () {
    var canvas = createHiDPICanvas(600, 600),
        ctx = canvas.getContext('2d');

    ctx.drawImage(img, 0, 0);
    var font = randomFontStyle();
    console.log(font); // debugging
    applyFontToCanvas(ctx, font, payload);

    var dataURL = canvas.toDataURL("image/jpeg", 1);
    cb(dataURL);
  }
  img.src = payload.img.base64;
}

// Event
$('#randomize').on('click', function(){
  loader.render('working');

  $.get('/baseData', function(data){
    var payload = JSON.parse(data);
    console.log(payload); // debugging

    canvasFromImage(payload, function(dataURL){
      var img = new Image();
      img.onload = function() {
        $('#album').empty().append(img);
        loader.render('done');
      }
      img.src = dataURL;
    });
  });
});

$('#share').on('click', function(){
  $(this).after('<p>https://fakealbumcoverbot.com/albumID</p>');
});
