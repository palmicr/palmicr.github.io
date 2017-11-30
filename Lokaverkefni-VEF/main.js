let map;

$.ajax({
  'url': 'http://apis.is/earthquake/is',
  'type': 'GET',
  'dataType': 'json',
  'success': function(data) {
    console.log(data);
    setMarker(data);
  }
});

function initMap(){
	map = new google.maps.Map(document.getElementById('map'), {
    zoom: 7,
    center: new google.maps.LatLng(64.772827,-20.415293)
    });
}

  function getCircle(magnitude) {
        return {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: 'red',
          fillOpacity: .2,
          scale: Math.pow(2, magnitude) / 2,
          strokeColor: 'white',
          strokeWeight: .5
        };
      }

function setMarker(data) {
        for (let i = 0; i < data.results.length; i++) {
          let lat = data.results[i].latitude;  
          let lon = data.results[i].longitude;

          let contentString = '<div id="content">' + 
                                '<div id="siteNotice">'+
                                '</div>'+
                                '<h1 id="firstHeading">' + data.results[i].humanReadableLocation + '</h1>'+
                                '<div id="bodyContent">'+
                                '<p> Time: ' + data.results[i].timestamp + '</p>' +
                                '<p> Size: ' + data.results[i].size + '</p>' +
                                '<p> Depth: ' + data.results[i].depth + '</p>' +
                                '<p> Quality: ' + data.results[i].quality + '</p>' +
                                '</div>'+ 
                              '</div>';

          let latLng = new google.maps.LatLng(lat,lon);
          let infowindow = new google.maps.InfoWindow({
            content: contentString
          });
          let marker = new google.maps.Marker({
            position: latLng,
            map: map
          });
          marker.addListener('click', function() {
          infowindow.open(map, marker);
          });
          map.data.setStyle(function() {
          let magnitude = data.results[i].size;
          console.log(magnitude);
          return {
            icon: getCircle(magnitude)
          };
          });

        }
      }