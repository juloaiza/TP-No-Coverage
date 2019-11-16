var towerIcon = L.icon({
  iconUrl: "images/tower_x.png",
  iconSize: [45, 60], // size of the icon
  iconAnchor: [22, 58], // point of the icon which will correspond to marker's location
  popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});

function add() {
  var point = [$("#lat").val(), $("#lng").val()];
  map.setView(point, 15);
  $("#predictBtn").prop("disabled", false);
  var myMarker = L.marker(point, {
    title: "COW",
    alt: "COW TO DEPLOY",
    draggable: true,
    icon: towerIcon
  })
    .addTo(map)
    .on("dragend", function() {
      var coord = String(myMarker.getLatLng()).split(",");
      console.log(coord);
      var lat = coord[0].split("(");
      //console.log(lat);
      var lng = coord[1].split(")");
      //console.log(lng);
      myMarker.bindPopup("Moved to: " + lat[1] + ", " + lng[0] + ".");
      $("#lat").val(parseFloat(lat[1]));
      $("#lng").val(parseFloat(lng[0]));
    });
}
