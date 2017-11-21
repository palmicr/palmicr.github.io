var map;

$.ajax({
  'url': 'http://apis.is/earthquake/is',
  'type': 'GET',
  'dataType': 'json',
  'success': function(data) {
    console.log(data);
  }
});


function initMap(){
	map = new google.maps.Map(document.getElementById('map'), {
    zoom: 7,
    center: new google.maps.LatLng(64.772827,-20.415293)
    });
}