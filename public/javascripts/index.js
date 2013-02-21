var ge;
google.load("earth", "1");

function init() {
  google.earth.createInstance('map3d', initCB, failureCB);
}

function initCB(instance) {
  ge = instance;
  ge.getWindow().setVisibility(true);
}

function failureCB(errorCode) {
  console.log('error loading Gearth plugin')
}

google.setOnLoadCallback(init);

$(function() {
  $("#spin").click(function(){
    var lookAt = ge.getView().copyAsLookAt(ge.ALTITUDE_RELATIVE_TO_GROUND);

    // Add 25 degrees to the current latitude and longitude values.
    lookAt.setLatitude(lookAt.getLatitude() + 25.0);
    lookAt.setLongitude(lookAt.getLongitude() + 25.0);

    // Update the view in Google Earth.
    ge.getView().setAbstractView(lookAt);
  })


});