$('.post-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
    document.getElementById("currentPg").innerHTML = nextSlide+1
  });
