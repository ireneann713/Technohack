let nCount = selector => {
    $(selector).each(function () {
      $(this)
        .animate({
          Counter: $(this).text()
        }, {
          // A string or number determining how long the animation will run.
          duration: 4000,
          // A string indicating which easing function to use for the transition.
          easing: "swing",
          /**
           * A function to be called for each animated property of each animated element. 
           * This function provides an opportunity to
           *  modify the Tween object to change the value of the property before it is set.
           */
          step: function (value) {
            $(this).text(Math.ceil(value));
          }
        });
    });
  };
  
  let a = 0;
  $(window).scroll(function () {
    // The .offset() method allows us to retrieve the current position of an element  relative to the document
    let oTop = $(".numbers").offset().top - window.innerHeight;
    if (a == 0 && $(window).scrollTop() >= oTop) {
      a++;
      nCount(".rect > h1");
    }
  });
  
  
  
  /**
   *
   *  sticky navigation
   *
   */
  
  let navbar = $(".navbar");
  
  $(window).scroll(function () {
    // get the complete hight of window
    let oTop = $(".section-2").offset().top - window.innerHeight;
    if ($(window).scrollTop() > oTop) {
      navbar.addClass("sticky");
    } else {
      navbar.removeClass("sticky");
    }
  });
  var slideIndex = 0;
carousel();

function carousel() {
  var i;
  var x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > x.length) {slideIndex = 1}
  x[slideIndex-1].style.display = "block";
  setTimeout(carousel, 2000); // Change image every 2 seconds
}
$("document").ready(function(){
  $("#send").click(function(){
      var message = $("#message").val();
      $.ajax({
          url: "http://localhost:5000/api/",
          type: "POST",
          contentType: "application/json",
          data: JSON.stringify({"message": message})
      }).done(function(data) {
          console.log(data);
      });
  });
});
'use strict';

var request = require('request');
var yargs = require('yargs');
var express = require('express');

var args = yargs
  .default('port', 8090)
  .default('model', 'http://localhost:5000')
  .argv;

var app = express();

app.use(express.static('static'));

app.all('/model/:route', function(req, res) {
  req.pipe(request(args.model + req.path))
    .on('error', function(err) {
      console.error(err);
      res.status(500).send('Error connecting to the model microservice');
    })
    .pipe(res);
});

app.listen(args.port);

console.log('Web App Started on Port ' + args.port);
console.log('Using Model Endpoint: ' + args.model);
console.log('Press Ctrl-C to stop...');
