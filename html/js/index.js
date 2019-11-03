let map = L.map("map").setView([39.61590167, -107.0154867], 10);

L.tileLayer(
  //   "https://api.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
  "https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/256/{z}/{x}/{y}@2x?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "outdoors-v11", //"dark-v10"
    accessToken:
      "pk.eyJ1IjoibWJ4LWFkbWluIiwiYSI6ImNqeXowY3BxbDAwdG0zY283aThxdDNyb3IifQ.YXnGwh4vCMfISjhfy143Ug",
    tileSize: 256
  }
).addTo(map);

//Info Layer (Only Online Mode)
//T-mobile coverage
//Att&T

//Offline&Online mode

var legend = L.control({ position: "bottomright" });

legend.onAdd = function(map) {
  var div = L.DomUtil.create("div", "info legend"),
    grades = ["#00FF00", "#FFFF00", "#FF0000"],
    labels = [
      ' <i class="material-icons" style="color:aquamarine">videocam</i> <a style="color:aquamarine">Video Call </a>',
      ' <i class="material-icons" style="color:aquamarine">call</i> <a style="color:aquamarine">Voice Call </a>',
      ' <i class="material-icons" style="color:aquamarine">sms</i> <a style="color:aquamarine"> SMS </a>'
    ];

  div.innerHTML = "<strong>Services Available</strong> ";
  // loop through our density intervals and generate a label with a colored square for each interval
  for (var i = 0; i < grades.length; i++) {
    div.innerHTML +=
      '<div class=legenditem> <i style="background:' +
      grades[i] +
      '"></i> ' +
      labels[i] +
      "</div>";
  }

  return div;
};

legend.addTo(map);

//Add prediction layer
var bounds = new L.LatLngBounds(
  new L.LatLng(39.0, -108.0), //SW
  new L.LatLng(39.99917, -106.00083) //NE
);
//map.fitBounds(bounds);
var overlay = new L.ImageOverlay("images/pl.png", bounds, {
  opacity: 0.6
});
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
      return { fillColor: "#00FF00", color: "gray", weight: 0.5 };
    } else if (
      feature.properties.rsrp <= -100 &&
      feature.properties.rsrp > -105
    ) {
      return { fillColor: "#FFFF00", color: "gray", weight: 0.5 };
    } else {
      return { fillColor: "#FF0000", color: "gray", weight: 0.5 };
    }
  }
});

//Sites
var mySites = map.createPane("sites");
mySites.style.zIndex = 450;

var circle1 = L.circle([39.61590167, -107.0154867], {
  color: "black",
  weight: 0.5,
  fillColor: "gray",
  fillOpacity: 1,
  radius: 50,
  pane: "sites"
}).addTo(map);
var customPopup =
  "  <table> <thead> <tr> <th>Parameter</th> <th>Value</th> </tr> </thead> <tbody> <tr> <td>Latitude</td> <td>39.6159</td> </tr> <tr> <td>Longitude</td> <td>-107.0151</td> </tr> <tr> <td>Antenna Height (mts)</td> <td>4.2</td> </tr> <tr> <td>Antenna Gain (dB)</td> <td>2.0</td> </tr> <tr> <td>Frequency (MHz)</td> <td>750</td> </tr> <tr> <td>Power (dBm)</td> <td>31</td> </tbody> </table>";

circle1.bindPopup(customPopup);

var predictCoverageCheckbox = document.querySelector('input[value="pc"]');

predictCoverageCheckbox.onchange = function() {
  if (predictCoverageCheckbox.checked) {
    map.addLayer(overlay);
  } else {
    map.removeLayer(overlay);
  }
};

var measuredCoverageCheckbox = document.querySelector('input[value="mc"]');

measuredCoverageCheckbox.onchange = function() {
  if (measuredCoverageCheckbox.checked) {
    map.addLayer(geoMeasured);
  } else {
    map.removeLayer(geoMeasured);
  }
};

var eventCoverageCheckbox = document.querySelector('input[value="sa"]');

eventCoverageCheckbox.onchange = function() {
  if (eventCoverageCheckbox.checked) {
    map.addLayer(geoEvents);
  } else {
    map.removeLayer(geoEvents);
  }
};

var elem = document.getElementById("progress-bar");

var map_type;

var first_run = false;
var overlay;

//Server Version
function run() {
  elem.style.display = "block";

  setTimeout(function() {
    map.addLayer(overlay);
    predictCoverageCheckbox.setAttribute("checked", "true");
    elem.style.display = "none"; //is defined inside Canvas Overlay
  }, 3000);
}
