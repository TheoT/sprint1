$(function() {
	$("#clear").click(function(){
		$.post("/loc/drop/");
		console.log('posting drop');
		$('.locs').slideUp();
		return false;
	});
});