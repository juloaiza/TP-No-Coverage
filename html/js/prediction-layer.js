//Prediction
var overlay;
var predictCoverageCheckbox = document.querySelector('input[value="pc"]');

predictCoverageCheckbox.onchange = function() {
  if (predictCoverageCheckbox.checked) {
    //map.addLayer(overlay);
    map.addLayer(geoPredicted);
  } else {
    //map.removeLayer(overlay);
    map.removeLayer(geoPredicted);
  }
};

//Server Version
function run() {
  elem.style.display = "block";

  $("#predictBtn").prop("disabled", true);
  if (first_run) {
    //map.removeLayer(overlay);
    map.removeLayer(geoPredicted);
  }

  dev_link = "http://127.0.0.1:5000/api/create-prediction";
  prod_link = "http://192.168.1.228:8080/api/create-prediction";
  fetch(prod_link, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      lat: parseFloat($("#lat").val()),
      lng: parseFloat($("#lng").val()),
      txh: parseFloat($("#txh").val()),
      erp: parseFloat($("#erp").val())
    })
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(predicted_coverage) {
      console.log("processing geojson...");

      // var bounds = new L.LatLngBounds(
      //   new L.LatLng(data.NE.lat, data.NE.lng), //NE
      //   new L.LatLng(data.SW.lat, data.SW.lng) //SW
      // );

      // overlay = new L.ImageOverlay("images/pl.png", bounds, {
      //   opacity: 0.6
      // });

      predicted_array = get_coverage(predicted_coverage);

      geoPredicted = L.geoJSON(predicted_array, {
        style: rsrpStyle_video,
        onEachFeature: onEachFeature
      });

      //map.addLayer(overlay);
      map.addLayer(geoPredicted);
      elem.style.display = "none";

      predictCoverageCheckbox.removeAttribute("disabled");
      predictCoverageCheckbox.setAttribute("checked", "true");
      $("#predictBtn").prop("disabled", false);
      first_run = true;
    });
}
