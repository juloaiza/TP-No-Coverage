let map = L.map("map").setView([39.618783, -107.012868], 10);

L.tileLayer(
  //   "https://api.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
  "https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/256/{z}/{x}/{y}@2x?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "outdoors-v11", //"dark-v10"
    accessToken:
      "pk.eyJ1IjoiamxvYWl6YSIsImEiOiJjazMwejVpMWkwM3FoM25wYmFiNWtjNW0yIn0.KByJKKG7PnHN-kM7DYQSmg",
    tileSize: 256
  }
).addTo(map);

//Info Layer (Only Online Mode)
//T-mobile coverage
//Att&T

//Offline&Online mode

// map.addLayer(overlay);

map.setZoom(15);

geoEvents = L.geoJSON(events, {
  style: function(feature) {
    switch (feature.properties.event) {
      case "searching":
        return { color: "#0000ff" };
      // case 'Democrat':   return {color: "#0000ff"};
    }
  }
});

measured_array = get_coverage(measured_coverage);

predicted_array = get_coverage(predicted_coverage);

combined_array = get_coverage(combined_coverage);

function onEachFeature(feature, layer) {
  // does this feature have a property named popupContent?
  if (feature.properties && feature.properties.geohash) {
    layer.bindPopup("RSRP: " + feature.properties.rsrp);
  }
}

function rsrpStyle_video(feature) {
  if (feature.properties.rsrp > -100) {
    return {
      fillColor: "#00FF00",
      fillOpacity: 0.4,
      color: "gray",
      weight: 0.6
    };
  } else if (
    feature.properties.rsrp <= -100 &&
    feature.properties.rsrp > -105
  ) {
    return {
      fillColor: "#FFFF00",
      fillOpacity: 0.4,
      color: "gray",
      weight: 0.6
    };
  } else if (
    feature.properties.rsrp <= -105 &&
    feature.properties.rsrp > -110
  ) {
    return {
      fillColor: "#FF9F00",
      fillOpacity: 0.4,
      color: "gray",
      weight: 0.6
    };
  } else {
    return {
      fillColor: "#FF0000",
      fillOpacity: 0.4,
      color: "gray",
      weight: 0.6
    };
  }
}

function rsrpStyle_voice(feature) {
  if (feature.properties.rsrp > -105) {
    return {
      fillColor: "#00FF00",
      fillOpacity: 0.4,
      color: "gray",
      weight: 0.6
    };
  } else if (
    feature.properties.rsrp <= -105 &&
    feature.properties.rsrp > -110
  ) {
    return {
      fillColor: "#FFFF00",
      fillOpacity: 0.4,
      color: "gray",
      weight: 0.6
    };
  } else if (
    feature.properties.rsrp <= -110 &&
    feature.properties.rsrp > -115
  ) {
    return {
      fillColor: "#FF9F00",
      fillOpacity: 0.4,
      color: "gray",
      weight: 0.6
    };
  } else {
    return {
      fillColor: "#FF0000",
      fillOpacity: 0.4,
      color: "gray",
      weight: 0.6
    };
  }
}

//$(".output").append(JSON.stringify(predicted_array));

geoPredicted = L.geoJSON(predicted_array, {
  style: rsrpStyle_video,
  onEachFeature: onEachFeature
});

geoMeasured = L.geoJSON(measured_array, {
  style: rsrpStyle_video,
  onEachFeature: onEachFeature
});

geoCombined = L.geoJSON(combined_array, {
  style: rsrpStyle_video,
  onEachFeature: onEachFeature
});

//MapType

var measuredCoverageCheckbox = document.querySelector('input[value="mc"]');

measuredCoverageCheckbox.onchange = function() {
  if (measuredCoverageCheckbox.checked) {
    map.addLayer(geoMeasured);
  } else {
    map.removeLayer(geoMeasured);
  }
};

var combinedCoverageCheckbox = document.querySelector('input[value="cc"]');

combinedCoverageCheckbox.onchange = function() {
  if (combinedCoverageCheckbox.checked) {
    map.addLayer(geoCombined);
  } else {
    map.removeLayer(geoCombined);
  }
};

var elem = document.getElementById("progress-bar");

var map_type;

var first_run = false;

//add(); //Add cow
