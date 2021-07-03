// Initialize and add the map
function initMap() {
    // The location of your company 37.580569, 127.028574
    const location = { lat: 37.580569, lng: 127.028574 };
    // The map, centered at selected location
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 17,
      center: location,
    });
    // The marker, positioned at location
    const marker = new google.maps.Marker({
      position: location,
      map: map,
    });
  }
  function changeLocation(text){
    location.href = text;
   }
$(document).ready(function(){
  $('#toSave').click(function(){
    location.href = 'autosave.html';
  });
  $('#toAdmin').click(function(){
    location.href = 'admin.html';
  });
  $('#toEdit').click(function(){
    location.href = 'edit.html';
  });
});

