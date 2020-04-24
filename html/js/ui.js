// $( "#myBtn" ).toggleClass( "disabled" );

// $(".addBtn").prop("disabled", false);
// $(".predictBtn").prop("disabled", false);
$("#addBtn").prop("disabled", true);
$("#predictBtn").prop("disabled", true);

function doCheck() {
  var allFilled = true;
  $("input[type=number]").each(function() {
    if ($(this).val() == "") {
      allFilled = false;
      return false;
    }
  });
  $("#addBtn").prop("disabled", !allFilled);
}

$(document).ready(function() {
  $("input[type=number]")
    .keyup(doCheck)
    .focusout(doCheck);
});

$("input[type=radio][name=coverage]").change(function() {
  var selected = this.value;
  // console.log(selected);
  if (selected == "1") {
    geoPredicted.setStyle(rsrpStyle_video);
    geoMeasured.setStyle(rsrpStyle_video);
    geoCombined.setStyle(rsrpStyle_video);
    serviceType  = rsrpStyle_video;
  } else if (selected == "2") {
    geoPredicted.setStyle(rsrpStyle_voice);
    geoMeasured.setStyle(rsrpStyle_voice);
    geoCombined.setStyle(rsrpStyle_voice);
    serviceType  = rsrpStyle_voice;

  } else {
    geoPredicted.setStyle(rsrpStyle_voice);
    geoMeasured.setStyle(rsrpStyle_voice);
    geoCombined.setStyle(rsrpStyle_voice);
    serviceType  = rsrpStyle_voice;

  }
});


document.addEventListener("DOMContentLoaded", function(){
  const delayInMilliseconds = 5000
  setTimeout(function() {
    M.toast({html: '  <i class="material-icons">info</i> <span style="padding-left:5px"><strong>Right click to add more COWs!</strong></span>', classes:"blue  white-text", displayLength: 10000})
  }, delayInMilliseconds);
 
  M.toast({html: '  <i class="material-icons">info</i> <span style="padding-left:5px"><strong>Click icon to show cell info!</strong></span>', classes:"blue  white-text", displayLength: 10000})
});