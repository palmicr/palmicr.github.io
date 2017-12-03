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

function getCircle(size) {                                                                   // Búa til hringi á mappi
        return {
          path: google.maps.SymbolPath.CIRCLE,                                               // Nær í gögn frá google
          fillColor: 'red',                                                                  // Litur Rauður
          fillOpacity: .2,                                                                   // Opacityið
          scale: Math.pow(2, size * 2.5) / 2,                                                // Stærð er alltaf 2.5 stærri
          strokeColor: 'white',                                                              // Útlínu litur
          strokeWeight: .5                                                                   // Stærð á útlínum
        };
}

function init(data) {
	let max = Math.max.apply(Math, data.results[i].size);
	let min = Math.min.apply(Math, data.results[i].size);
    // Set up the slide control                     
    $('#slider').noUiSlider({           
      range: [min, max], start: [min, max], handles: 2, margin: 20, connect: true,
      serialization: {to: [min, max],resolution: 1}
    }).change(function() { updateMarker(min.val(), max.val()); });        // change event kallar á update() , val() les úr input reit,  ( change() er shorthand fyrir  .on( "change", handler ) )

    updateMarker(min.val(), max.val());       // Update table to show matches, upphafstaða
  }

function updateMarker(min, max, data) {
	
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

          let circle1 = new google.maps.Marker({                                             // Búa til marker.
            position: latLng,                                                                // Láta Staðseninguna á hana.         
            map: map,                                                                        // Festa það við mappið.
            icon: getCircle(data.results[i].size)                                            // Notar functonið getCircle
          });
          let marker = new google.maps.Marker({                                              // Búa til marker.
            position: latLng,                                                                // Láta Staðseninguna á hana.         
            map: map,                                                                        // Festa það við mappið.
          });
          marker.addListener('click', function() {                                           // Gera það kleif að ýta á makerinn og fá upp gögnin.
          infowindow.open(map, marker);                                                      // Tengja það saman.
          });
          circle1.addListener('click', function() {                                          // Gera það kleif að ýta á makerinn og fá upp gögnin.
          infowindow.open(map, circle1);                                                     // Tengja það saman.
          });


        }

      }

