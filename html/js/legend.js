var legend = L.control({ position: "bottomright" });

legend.onAdd = function(map) {
  var div = L.DomUtil.create("div", "info legend"),
    grades = ["#00FF00", "#FFFF00", "#FF9F00", "#FF0000"],
    labels = [
      ' <i class="material-icons" style="color:aquamarine">sentiment_very_satisfied</i> <a style="color:aquamarine"> Good </a>',
      ' <i class="material-icons" style="color:aquamarine">sentiment_neutral</i> <a style="color:aquamarine"> Maybe </a>',
      ' <i class="material-icons" style="color:aquamarine">sentiment_very_dissatisfied</i> <a style="color:aquamarine"> Poor </a>',
      ' <i class="material-icons" style="color:aquamarine">not_interested</i> <a style="color:aquamarine"> No Service </a>'
    ];

  div.innerHTML = "<strong>Service Quality</strong> ";
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
