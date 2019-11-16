var legend = L.control({ position: "bottomright" });

legend.onAdd = function(map) {
  var div = L.DomUtil.create("div", "info legend"),
    grades = ["#00FF00", "#FFFF00", "#FF9F00", "#FF0000"],
    labels = [
      ' <i class="material-icons" style="color:aquamarine">videocam</i> <a style="color:aquamarine">Video Call </a>',
      ' <i class="material-icons" style="color:aquamarine">call</i> <a style="color:aquamarine">Voice Call </a>',
      ' <i class="material-icons" style="color:aquamarine">sms</i> <a style="color:aquamarine"> SMS </a>',
      ' <i class="material-icons" style="color:aquamarine">not_interested</i> <a style="color:aquamarine"> No Services </a>'
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
