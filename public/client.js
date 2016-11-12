var loader = {
  el: '#loader',
  render: function(str) {
    $(this.el).html(str || " ");
  }
};

// Event
$('#randomize').on('click', function(){
  loader.render('Loading..');

  $.get('/baseData', function(data){
    loader.render();

    console.log(data);
  });
});
