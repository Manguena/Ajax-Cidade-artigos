
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");
       


     // trabalhos com formulários utilizando jquery  
   // $("form").submit( function(event){
    var street= $('#street').val();
    var city= $('#city').val();
    var srce="http://maps.googleapis.com/maps/api/streetview?size=400x400&location="+street+", "+ city;

     $('body').append('<img class="bgimg" src="'+srce+'">');


      // ajax request goes here
      $.getJSON( "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=new+york+times&page=2&sort=oldest&fl=headline,web_url,lead_paragraph&api-key=b43cce55af3c6b3b6bde7983826add7f:7:70884462", function (data){
    
       // console.log(data.response.docs[0].headline.main);
       var itens=[];

      for (var j in data.response.docs){
       // itens.push("<li class=\"article\"> <a href=\""+data.response.docs[j].web_url+"\">"+data.response.docs[j].headline.main+"</a> <p>"+data.response.docs[j].lead_paragraph+"</p></li>");
         

        //itens.push("<li class=\"article\"> <a href=\""+data.response.docs[j].web_url+"\">"+data.response.docs[j].headline.main+"</a> <p>"+data.response.docs[j].lead_paragraph+"</p></li>");

        //console.log(data.response.docs[j].web_url);

       // console.log(data.response.docs[j].headline.main);

       // console.log(j);
     
     $("#nytimes-articles").append("<li class=\"article\"> <a href=\""+data.response.docs[j].web_url+"\">"+data.response.docs[j].headline.main+"</a> <p>"+data.response.docs[j].lead_paragraph+"</p></li>");

}
      }).error(function(){
        $("#nytimes-articles").append("Ajax request failed");


      });


// codigo para obtencao de links de wikipedia


var time=setTimeout(function() { 
$("#wikipedia-links").append("TIMEOUT");
}, 8000);

var wiki=$.ajax({
  url: 'http://en.wikipedia.org/w/api.php?format=json&action=query&titles=Bill%20Gates|Michael%20Jackson&&prop=info&inprop=url',
  //data: queryData,
  dataType: 'jsonp',
  type:'POST',
  headers: {'Api-User-Agent':'Information system (email: jordaomanguena@yahoo.com)'}
}).done( function( data){

  var titulo1=data.query.pages["3747"].title;
 var url1=data.query.pages["3747"].fullurl;
 var titulo2=data.query.pages["14995351"].title;
 var url2=data.query.pages["14995351"].fullurl;

$("#wikipedia-links").append("<li><a href=\""+url1+"\">"+titulo1+"</a></li>");

$("#wikipedia-links").append("<li><a href=\""+url2+"\">"+titulo2+"</a></li>");

}).fail(function(jqXHR, textStatus, errorThrown){
$("#wikipedia-links").append("falha no carregamento:"+textStatus+errorThrown);

});

clearTimeout(time);






     //return;

   // }


     //   );

    // load streetview

    // YOUR CODE GOES HERE!

    return false;
};

$('#form-container').submit(loadData);

//loadData();
