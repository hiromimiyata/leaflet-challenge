// Store our API endpoint as queryUrl.
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {
  // Define a function that we want to run once for each feature in the features array.
  // Give each feature a popup that describes the place and time of the earthquake.
  function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3> Location : ${feature.properties.place}</h3><hr><p>Magnitude : ${feature.properties.mag}</p><hr><p>Depth : ${feature.geometry.coordinates[2]}</p>`);
  }

  // Define a function to determine the radius of the circle marker based on magnitude
  function getRadius(magnitude) {
    return magnitude * 5;
  }

  function getDepthColor(depth) {
    if (depth < 10) {
      return "#00ff00"; // Green
    } else if (depth < 30) {
      return "#40ff00"; // Light green
    } else if (depth < 50) {
      return "#bfff00"; // Yellow-green
    } else if (depth < 70) {
      return "#ffff00"; // Yellow
    } else if (depth < 90) {
      return "#ffbf00"; // Orange
    } else {
      return "#ff0000"; // Red
    }
  }
  
  
  

  // Create a GeoJSON layer that contains the features array from the earthquakeData object.
  // Run the onEachFeature function once for each piece of data in the array.
  let earthquakes = L.geoJSON(earthquakeData, {
    pointToLayer: function (feature, latlng) {
      let radius = getRadius(feature.properties.mag);
      let color = getDepthColor(feature.geometry.coordinates[2]);
      return L.circleMarker(latlng, {
        radius: radius,
        fillColor: color,
        color: color,
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8,
      });
    },
    onEachFeature: onEachFeature,
  });

  // Send our earthquakes layer to the createMap function
  createMap(earthquakes);
}


function createMap(earthquakes) {
  // Create the base layers.
  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org">OpenStreetMap</a> contributors'
  });

  let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  // Create a baseMaps object.
  let baseMaps = {
    "Street Map": street,
    "Topographic Map": topo
  };

  // Create an overlay object to hold our overlay.
  let overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load.
  let myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [street, earthquakes]
  });

  // Create a legend control
  let legend = L.control({ position: 'bottomright' });

  legend.onAdd = function (map) {
    let div = L.DomUtil.create('div', 'legend');
    div.innerHTML += '<h4>Depth</h4>';
    div.innerHTML += '<i class="legend-color" style="background: #00ff00"></i> 0-10<br>';
    div.innerHTML += '<i class="legend-color" style="background: #40ff00"></i> 10-30<br>';
    div.innerHTML += '<i class="legend-color" style="background: #bfff00"></i> 30-50<br>';
    div.innerHTML += '<i class="legend-color" style="background: #ffff00"></i> 50-70<br>';
    div.innerHTML += '<i class="legend-color" style="background: #ffbf00"></i> 70-90<br>';
    div.innerHTML += '<i class="legend-color" style="background: #ff0000"></i> 90+<br>';
    return div;
  };
  

  legend.addTo(myMap);

  // Create a layer control.
  // Pass it our baseMaps and overlayMaps.
  // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}
