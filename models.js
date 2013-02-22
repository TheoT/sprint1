var mongoose= require('mongoose');

var locSchema=mongoose.Schema({
	name: String,
	lat: Number,
	lon: Number,
	rando: {type:Number, index: true}
});

var Loc = mongoose.model('Loc',locSchema);

exports.Loc=Loc;