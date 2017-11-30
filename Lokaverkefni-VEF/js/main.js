let map;                                                                                     //Global breita map

$.ajax({                                                                                     // Ná í gögn frá apis.is
  'url': 'http://apis.is/earthquake/is',
  'type': 'GET',
  'dataType': 'json',
  'success': function(data) {
    console.log(data);
    setMarker(data);                                                                         //
  }
});

function initMap(){                                                                          // Render Mapið.
	map = new google.maps.Map(document.getElementById('map'), {                                // Ná í div tagið í html.
    zoom: 7,                                                                                 // Zoom inná mappið.
    center: new google.maps.LatLng(64.772827,-20.415293)                                     // Miðpunktur á byrjun mappsins.
    });
}

function getCircle(size) {
        return {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: 'red',
          fillOpacity: .2,
          scale: Math.pow(2, size * 2.5) / 2,
          strokeColor: 'white',
          strokeWeight: .5
        };
}

function setMarker(data) {                                                                   // Búa til marker fyrir staðsetningu jarðskjálta.
        for (let i = 0; i < data.results.length; i++) {                                      // Loopa í gegnum öll gögninn.
          let lat = data.results[i].latitude;                                                // Ná í latitude.
          let lon = data.results[i].longitude;                                               // Ná í longitude.


          // Búa til infowindow gögn ***********************************************************************
          let contentString = '<div id="content">' + 
                                '<div id="siteNotice">'+
                                '</div>'+                                                    // Ná í Nafn á staðsetningu.
                                '<h1 id="firstHeading">' + data.results[i].humanReadableLocation + '</h1>'+   
                                '<div id="bodyContent">'+
                                '<p> Time: ' + data.results[i].timestamp + '</p>' +          // Ná í tíma.
                                '<p> Size: ' + data.results[i].size + '</p>' +               // Ná í stærð.
                                '<p> Depth: ' + data.results[i].depth + '</p>' +             // Ná í depth.
                                '<p> Quality: ' + data.results[i].quality + '</p>' +         // Ná í quality.
                                '</div>'+ 
                              '</div>';
          //************************************************************************************************

          let latLng = new google.maps.LatLng(lat,lon);                                      // Seta staðseningu í eina breitu.
          let infowindow = new google.maps.InfoWindow({                                      // Búa til infowindow.
            content: contentString                                                           // Seta contentString við windowið.
          });

          let circle1 = new google.maps.Marker({                                              // Búa til marker.
            position: latLng,                                                                // Láta Staðseninguna á hana.         
            map: map,                                                                         // Festa það við mappið.
            icon: getCircle(data.results[i].size)
          });
          let marker = new google.maps.Marker({                                              // Búa til marker.
            position: latLng,                                                                // Láta Staðseninguna á hana.         
            map: map,                                                                         // Festa það við mappið.
          });
          marker.addListener('click', function() {                                           // Gera það kleif að ýta á makerinn og fá upp gögnin.
          infowindow.open(map, marker);                                                      // Tengja það saman.
          });
          circle1.addListener('click', function() {                                           // Gera það kleif að ýta á makerinn og fá upp gögnin.
          infowindow.open(map, circle1);                                                      // Tengja það saman.
          });


        }

      }
