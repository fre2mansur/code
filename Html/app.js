//Main js
$(document).ready(function(){
    localStorage.removeItem("category");
    localStorage.removeItem("year");
    getPosts();

    $('ul.filter li').click(function(e){
    var cat = $(this).data('id');
    var year = $(this).data('year');
    var text = $(this).text();

    $(this).parent().prev().text(text);
    $('ul.filter').hide();
    $('.active').removeClass('active');
    $(this).addClass('active');

    if(cat) {
       localStorage.setItem("category", cat);
    }
    if(year) {
       localStorage.setItem("year", year);
    }
    var cat = localStorage.getItem('category');
    var year = localStorage.getItem('year');
    if(cat === 'all') {cat = '';} else {cat = '&filter[category_name]='+cat;}
    if(year === 'all') {year = '';} else {year = '&filter[year]='+year;}
    getPosts(cat, year);

  });
});


//getting filtered posts
function getPosts(cat='', year='') {
  var endPoint = 'http://localhost/wordpress/test/wp-json/wp/v2/posts?_embed'+cat+year;
  $.getJSON(endPoint,  // url
    function (data, textStatus, jqXHR) {  // success callback
      postTemplate(data)
   }).fail(function(){
      console.log('server error')
  })
}

//Output posts template
function postTemplate(data){
  var i;
  var text = '<div class="ctm-item">';
   for (i = 0; i < data.length; i++) {
    text += '<div class="card">'
    if(data[i]._embedded['wp:featuredmedia']) {
       text += '<div class="ctm-image">';
       text += '<img src="'+data[i]._embedded['wp:featuredmedia']['0'].source_url+'"/></div>';
    }
     text += '<div class="ctm-title">'+data[i].title.rendered+'</div>';
     text += '</div>'
   }
   text += '</div>'
  if(data.length == 0) {
    text = 'no item found'
  }
  $('#ctm-portfolio-item').html(text);
}

//Convert li to dropdown
$(document).ready(function(){
  $('ul.filter').hide();
  $('.cat_filter .Cplaceholder').click(function(){
     $('.cat_filter ul.filter').toggle();
  });
  
  $('.year_filter .Cplaceholder').click(function(){
     $('.year_filter ul.filter').toggle();
  });
});