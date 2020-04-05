var towerIcon = L.icon({
  iconUrl: "images/tower_x.png",
  iconSize: [45, 60], // size of the icon
  iconAnchor: [22, 58], // point of the icon which will correspond to marker's location
  popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});

function infoCow(lat, lng, height, pwr) {
  let html = `
  <div class="row" >
    <div class="col s12">
      <div class="card">
        <div class="card-content">
          <span class="card-title"><b>COW Info</b></span>
  
          <div >
            <input
              id="lat"
              type="number"
              class="validate"
              value="${lat}"
            />
            <label for="lat">Latitude</label>
          </div>
  
          <div>
            <input
              id="lng"
              type="number"
              class="validate"
              value="${lng}"
            />
            <label for="lng">Longitude</label>
          </div>
        
          <div>
            <input
            id="txh"
            type="number"
            class="validate"
            value="${height}"
            />
            <label for="txh">TX Height (m)</label>
          </div>
          <div>
            <input id="erp" type="number" class="validate" value="${pwr}" />
            <label for="erp">Max Power (dBm)</label>
          </div>
        </div>
        <div class="card-action">
          <button
            id="predictBtn"
            class="waves-effect blue lighten-2 btn-small"
            onclick="run()"
            type="button"
            >
            <span>Prediction</span>
          </button>
  
          <button
            id="addBtn"
            class="waves-effect blue lighten-2 btn-small"
            onclick="add()"
            type="button"
            >
            <span>Update</span>
          </button>
        
        </div>
      </div>
    </div>
  </div>
  `;

  return html;
}

//height 4.371
//power 31
//var point = [$("#lat").val(), $("#lng").val()];
var point = [39.618783, -107.012868];
var cowMarker = L.marker(point, {
  title: "COW",
  alt: "COW TO DEPLOY",
  draggable: true,
  icon: towerIcon
});

cowMarker.addTo(map);
cowMarker.bindPopup(infoCow(point[0], point[1], 4.371, 31));

function add() {
  var point = [$("#lat").val(), $("#lng").val()];
  console.log(point);

  cowMarker.bindPopup(infoCow(point[0], point[1], 4.371, 31)).closePopup();
  cowMarker.setLatLng(point);
  map.setView(point, 15);
  // $("#predictBtn").prop("disabled", false);
  // cowMarker.addTo(map);
  // cowMarker.bindPopup(infoCow);
  // .on("dragend", function() {
  //   var coord = String(myMarker.getLatLng()).split(",");
  //   console.log(coord);
  //   var lat = coord[0].split("(");
  //   //console.log(lat);
  //   var lng = coord[1].split(")");
  //   //console.log(lng);
  //   myMarker.bindPopup(infoCow);
  //   $("#lat").val(parseFloat(lat[1]));
  //   $("#lng").val(parseFloat(lng[0]));
  // });
}

cowMarker.on("dragend", function() {
  (function() {
    var coord = String(cowMarker.getLatLng()).split(",");
    console.log(coord);
    var lat = coord[0].split("(");
    var lng = coord[1].split(")");
    // $("#lat").val(parseFloat(lat[1]));
    // $("#lng").val(parseFloat(lng[0]));
    cowMarker.bindPopup(
      infoCow(parseFloat(lat[1]), parseFloat(lng[0]), 4.371, 31)
    );
  })();
});
