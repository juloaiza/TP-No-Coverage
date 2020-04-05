function get_coverage(_coverage) {
  let pre_measured_array = [];
  _coverage.forEach(function(el) {
    var code = geohex.getZoneByLocation(el.Latitude, el.Longitude, 9);
    feature_el = { rsrp: el.RSRP, geohash: code.code };
    pre_measured_array.push(feature_el);
  });

  var types = _.groupBy(pre_measured_array, "geohash");
  var result = _.mapObject(types, function(val, key) {
    return (
      _.reduce(
        val,
        function(memo, v) {
          return memo + v.rsrp;
        },
        0
      ) / val.length
    );
  });

  let measured_array = [];

  for (var code in result) {
    if (result.hasOwnProperty(code)) {
      // console.log(code + " -> " + result[code]);
      feature_el = geohex.getZoneByCode(code).getPolygon();
      feature_el.properties = {
        rsrp: result[code].toFixed(2),
        geohash: code
      };
      measured_array.push(feature_el);
    }
  }

  return measured_array;
}
