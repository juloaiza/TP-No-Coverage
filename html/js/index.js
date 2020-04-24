let baseOutdoor = L.tileLayer(
  //   "https://api.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
  "https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/256/{z}/{x}/{y}@2x?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "outdoors-v11", //"dark-v10"
    accessToken:
      "pk.eyJ1IjoiamxvYWl6YSIsImEiOiJjazMwejVpMWkwM3FoM25wYmFiNWtjNW0yIn0.KByJKKG7PnHN-kM7DYQSmg",
    tileSize: 256,
  }
);

let baseDark = L.tileLayer(
  //   "https://api.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
  "https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/256/{z}/{x}/{y}@2x?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "dark-v10",
    accessToken:
      "pk.eyJ1IjoiamxvYWl6YSIsImEiOiJjazMwejVpMWkwM3FoM25wYmFiNWtjNW0yIn0.KByJKKG7PnHN-kM7DYQSmg",
    tileSize: 256,
  }
);

var map = L.map("map", {
  center: [39.618783, -107.012868],
  zoom: 10,
  layers: [baseOutdoor],
});

//let map = L.map("map").setView([39.618783, -107.012868], 10);

//Info Layer (Only Online Mode)
//T-mobile coverage
//Att&T

//Offline&Online mode

// map.addLayer(overlay);

var wmsLayerWeather = L.tileLayer.wms(
  "https://idpgis.ncep.noaa.gov/arcgis/services/NWS_Observations/radar_base_reflectivity/MapServer/WmsServer?",
  {
    layers: "1",
    format: "image/png",
    transparent: true,
    attribution: "Weather Noaa",
  }
);

var wmsLayerFires = L.tileLayer.wms(
  "https://fsapps.nwcg.gov/afm/cgi-bin/mapserv.exe?map=conus_viirs_iband.map",
  {
    layers: "Cumulative Fire Detections",
    format: "image/png",
    transparent: true,
    attribution:
      "USDA Forest Service|Cumulative VIIRS I Band fire detections for current year",
  }
);

let baseMaps = {
  Outdoor: baseOutdoor,
  Dark: baseDark,
};

let overlayMaps = {
  Weather: wmsLayerWeather,
  Fires: wmsLayerFires,
};

L.control.layers(baseMaps, overlayMaps).addTo(map);

map.setZoom(15);



map.on("contextmenu",function(e) {
  var tlatlng=e.latlng;
  var tdiv='Hello world!';
  addCow(tlatlng)
  /* making a popup*/
  // var tpopup = L.popup()
  // .setLatLng(e.latlng)
  // .setContent(tdiv)
  // .openOn(map);
  //tpopup.on('click',alert("hello");
  });






geoEvents = L.geoJSON(events, {
  style: function (feature) {
    switch (feature.properties.event) {
      case "searching":
        return { color: "#0000ff" };
      // case 'Democrat':   return {color: "#0000ff"};
    }
  },
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
      weight: 0.6,
    };
  } else if (
    feature.properties.rsrp <= -100 &&
    feature.properties.rsrp > -105
  ) {
    return {
      fillColor: "#FFFF00",
      fillOpacity: 0.4,
      color: "gray",
      weight: 0.6,
    };
  } else if (
    feature.properties.rsrp <= -105 &&
    feature.properties.rsrp > -110
  ) {
    return {
      fillColor: "#FF9F00",
      fillOpacity: 0.4,
      color: "gray",
      weight: 0.6,
    };
  } else {
    return {
      fillColor: "#FF0000",
      fillOpacity: 0.4,
      color: "gray",
      weight: 0.6,
    };
  }
}

function rsrpStyle_voice(feature) {
  if (feature.properties.rsrp > -105) {
    return {
      fillColor: "#00FF00",
      fillOpacity: 0.4,
      color: "gray",
      weight: 0.6,
    };
  } else if (
    feature.properties.rsrp <= -105 &&
    feature.properties.rsrp > -110
  ) {
    return {
      fillColor: "#FFFF00",
      fillOpacity: 0.4,
      color: "gray",
      weight: 0.6,
    };
  } else if (
    feature.properties.rsrp <= -110 &&
    feature.properties.rsrp > -115
  ) {
    return {
      fillColor: "#FF9F00",
      fillOpacity: 0.4,
      color: "gray",
      weight: 0.6,
    };
  } else {
    return {
      fillColor: "#FF0000",
      fillOpacity: 0.4,
      color: "gray",
      weight: 0.6,
    };
  }
}

//$(".output").append(JSON.stringify(predicted_array));

geoPredicted = L.geoJSON(predicted_array, {
  style: rsrpStyle_video,
  onEachFeature: onEachFeature,
});

geoMeasured = L.geoJSON(measured_array, {
  style: rsrpStyle_video,
  onEachFeature: onEachFeature,
});

geoCombined = L.geoJSON(combined_array, {
  style: rsrpStyle_video,
  onEachFeature: onEachFeature,
});

//MapType

var measuredCoverageCheckbox = document.querySelector('input[value="mc"]');

measuredCoverageCheckbox.onchange = function () {
  if (measuredCoverageCheckbox.checked) {
    map.addLayer(geoMeasured);
  } else {
    map.removeLayer(geoMeasured);
  }
};

var combinedCoverageCheckbox = document.querySelector('input[value="cc"]');

combinedCoverageCheckbox.onchange = function () {
  if (combinedCoverageCheckbox.checked) {
    map.addLayer(geoCombined);
  } else {
    map.removeLayer(geoCombined);
  }
};

//UE Stream layer
var streamCoverageCheckbox = document.querySelector('input[value="st"]');
var stream_coverage = [];
var mobileStream 
var geoStream
var serviceType = rsrpStyle_video;
streamCoverageCheckbox.onchange = function () {
  if (streamCoverageCheckbox.checked) {

    mobileStream = new EventSource(EVENT_SERVER_API);
    mobileStream.onmessage = (event) => {
      const mobileData = JSON.parse(event.data);
      console.log(mobileData)
      
      if (mobileData.rsrp) {
        stream_coverage.push({ Latitude:mobileData.lat, 
                              Longitude:mobileData.lng, 
                              RSRP:mobileData.rsrp, 
                              pci:mobileData.pci
                            });
      }
      //console.log(stream_coverage)  
      let stream_array = get_coverage(stream_coverage);
      //console.log(stream_array)
      //console.log(serviceType)
      geoStream = L.geoJSON(stream_array, {
        style: serviceType, //check current state
        onEachFeature: onEachFeature,
      });
      map.addLayer(geoStream);  


    };

  } else {
    mobileStream.close();
    map.removeLayer(geoStream);
  }
};







var elem = document.getElementById("progress-bar");

var map_type;

var first_run = false;

//add(); //Add cow



