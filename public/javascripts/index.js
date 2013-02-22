var ge;
var lookAt,numSpins;
google.load("earth", "1");

function init() {
  google.earth.createInstance('map3d', initCB, failureCB);
}

function initCB(instance) {
  ge = instance;
  ge.getWindow().setVisibility(true);
  ge.getOptions().setFlyToSpeed(5);
  numSpins=3;
  lookAt = ge.getView().copyAsLookAt(ge.ALTITUDE_RELATIVE_TO_GROUND);
  lookAt.setRange(8000000.0);
  ge.getView().setAbstractView(lookAt);

}

function failureCB(errorCode) {
  console.log('error loading Gearth plugin')
}

function rotateEarth(){ 
  ge.getOptions().setFlyToSpeed(5);
  if(numSpins<=0){
    google.earth.removeEventListener(ge, 'frameend', rotateEarth);
    goToLocation();
  }
  else{
    // google.earth.addEventListener(ge, "frameend", rotateEarth); 
  }
  var myLon = lookAt.getLongitude(); 
  if (myLon<180) {
    myLon = myLon + 10; 
  } 
  else {
    numSpins--; 
    myLon=-180; 
  } 
  lookAt.setLongitude(myLon); 
  lookAt.setHeading(0);   // Workaround for heading bug, issue #148 
  ge.getView().setAbstractView(lookAt); 
} 

function goToLocation(){
  ge.getOptions().setFlyToSpeed(3);
  google.earth.removeEventListener(ge, 'frameend', goToLocation);
  numSpins=3;

  var placemark = ge.createPlacemark('');

  // var lat=Math.random()*360-180
  // var lon=Math.random()*360-180

  // lookAt.setLatitude(lat);
  // lookAt.setLongitude(lon);
  // lookAt.setRange(4000000.0);
  // ge.getView().setAbstractView(lookAt);

  // var icon = ge.createIcon('');
  // icon.setHref('http://maps.google.com/mapfiles/kml/paddle/red-circle.png');
  // var style = ge.createStyle('');
  // style.getIconStyle().setIcon(icon);
  // style.getIconStyle().setScale(5.0);
  // placemark.setStyleSelector(style);
  // var completed=false;
  // $.ajax({
  //     url: 'http://api.geonames.org/countryCode?lat='+lat+'&lng='+lon+'&username=tthompson&type=JSON',
  //     dataType: 'jsonp',
  //     success: function(data) {
  //       var point = ge.createPoint('');
  //       placemark.setName(data.countryName);
  //       point.setLatitude(lat);
  //       point.setLongitude(lon);
  //       placemark.setGeometry(point);
  //       ge.getFeatures().appendChild(placemark);
  //       console.log('REST call done');
  //     });
  // }
    // res=http://api.geonames.org/countryCode?lat=47.03&lng=10.2&username=tthompson&type=JSON

  $.get('/random/',function(doc){
    console.log(doc);

    lookAt.setLatitude(doc.lat);
    lookAt.setLongitude(doc.lon);
    lookAt.setRange(4000000.0);
    ge.getView().setAbstractView(lookAt);

    var icon = ge.createIcon('');
    icon.setHref('http://maps.google.com/mapfiles/kml/paddle/red-circle.png');
    var style = ge.createStyle('');
    style.getIconStyle().setIcon(icon);
    style.getIconStyle().setScale(5.0);
    placemark.setStyleSelector(style);

    var point = ge.createPoint('');
    placemark.setName(doc.name);
    point.setLatitude(doc.lat);
    point.setLongitude(doc.lon);
    placemark.setGeometry(point);
    ge.getFeatures().appendChild(placemark);

    $.get('/info/'+doc.name,function(data){
      $("#placeTitle").text('Beautiful '+data.placeTitle+'!');
      $('#placeInfo').html(data.placeInfo);

      return false
    })
    // res=http://api.geonames.org/countryCode?lat=47.03&lng=10.2&username=tthompson&type=JSON

  });
}

google.setOnLoadCallback(init);

$(function() {
  $("#spin").click(function(){
    lookAt = ge.getView().copyAsLookAt(ge.ALTITUDE_RELATIVE_TO_GROUND); 
    lookAt.setRange(8000000.0);
    ge.getOptions().setFlyToSpeed(3);
    ge.getView().setAbstractView(lookAt);
    google.earth.addEventListener(ge, "frameend", rotateEarth);
    rotateEarth();
    
  })


});