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

measured_array = [];
measured_coverage.forEach(function(el) {
  var code = geohex.getZoneByLocation(el.Latitude, el.Longitude, 10);
  // var coords = geohex.getZoneByCode(code).getPolygon();
  // geohex.getZoneByCode(json[options.jsonField.id], json[options.jsonField.value]).getPolygonCoords()
  feature_el = code.getPolygon();
  feature_el.properties = { rsrp: el.RSRP };
  measured_array.push(feature_el);
});

geoMeasured = L.geoJSON(measured_array, {
  style: function(feature) {
    if (feature.properties.rsrp > -100) {
      return { fillColor: "#00FF00", color: "gray", weight: 0.8 };
    } else if (
      feature.properties.rsrp <= -100 &&
      feature.properties.rsrp > -105
    ) {
      return { fillColor: "#FFFF00", color: "gray", weight: 0.8 };
    } else if (
      feature.properties.rsrp <= -105 &&
      feature.properties.rsrp > -110
    ) {
      return { fillColor: "#FF9F00", color: "gray", weight: 0.8 };
    } else {
      return { fillColor: "#FF0000", color: "gray", weight: 0.8 };
    }
  }
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

var elem = document.getElementById("progress-bar");

var map_type;

var first_run = false;
