var triggered = false

window.addEventListener('scroll',(event) => {
    var webpage = $("body");
    var webpage_height = webpage.height();
    //alert(webpage_height);
    var trigger_height = webpage_height * 0.40625;
    console.log('Scrolling...'+$(window).scrollTop());
    
    if ($(window).scrollTop() > (webpage_height-trigger_height) && triggered == false) {
      console.log($(window).scrollTop()+" > "+(webpage_height-trigger_height));
      //$("#divtoshow").show();
      animateValue(obj_1, 0, 12384, 2000);
      animateValue(obj_2, 0, 1795, 2000);
      animateValue(obj_3, 0, 1053, 2000);
      triggered = true
    }
});

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      obj.innerHTML = Math.floor(progress * (end - start) + start).toLocaleString('ko-KR');
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }
  
  const obj_1 = document.getElementById("value");
  const obj_2 = document.getElementById("value_2");
  const obj_3 = document.getElementById("value_3");
  let statPosition = document.getElementById("statistics").getBoundingClientRect();
  console.log(statPosition)
  
  animateValue(obj_1, 0, 12384, 2000);
  animateValue(obj_2, 0, 1795, 2000);
  animateValue(obj_3, 0, 1053, 2000);
  
  function getOffset( el ) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
}

var x = getOffset( document.getElementById('statistics') ).left; 
console.log(x)
  