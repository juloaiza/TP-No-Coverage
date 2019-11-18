//Prediction
var overlay;
var predictCoverageCheckbox = document.querySelector('input[value="pc"]');

predictCoverageCheckbox.onchange = function() {
  if (predictCoverageCheckbox.checked) {
    map.addLayer(overlay);
  } else {
    map.removeLayer(overlay);
  }
};

//Server Version
function run() {
  elem.style.display = "block";

  $("#predictBtn").prop("disabled", true);
  if (first_run) {
    map.removeLayer(overlay);
  }

  dev_link = "http://127.0.0.1:5000/api/create-prediction";
  prod_link = "http://127.0.0.1:8080/api/create-prediction";
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
    .then(function(data) {
      console.log(data);

      //Add prediction layer
      //   var bounds = new L.LatLngBounds(
      //     new L.LatLng(39.64795, -106.97509), //NE
      //     new L.LatLng(39.589616, -107.050646) //SW
      //   );

      var bounds = new L.LatLngBounds(
        new L.LatLng(data.NE.lat, data.NE.lng), //NE
        new L.LatLng(data.SW.lat, data.SW.lng) //SW
      );

      overlay = new L.ImageOverlay("images/pl.png", bounds, {
        opacity: 0.6
      });

      map.addLayer(overlay);
      elem.style.display = "none";

      predictCoverageCheckbox.removeAttribute("disabled");
      predictCoverageCheckbox.setAttribute("checked", "true");
      $("#predictBtn").prop("disabled", false);
      first_run = true;
    });
}
