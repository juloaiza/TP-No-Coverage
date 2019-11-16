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
