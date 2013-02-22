var models = require('../models')
 ,  request= require('request')
  , cheerio = require('cheerio');

Loc=models.Loc;

exports.locs=function(req,res){
	Loc.find({}).execFind(function(err,locArray){
		if(err)
			console.log(err)
		res.render('locations',{
			locs:locArray
		})
	});
};
exports.newLoc=function(req,res){
	loc= new Loc();
	console.log(req.body.locName)
	loc.lon=req.body.locLong;
	loc.name=req.body.locName;
	loc.lat=req.body.locLat;
	loc.rando=Math.random();
	loc.save(function(err){
		console.log('saved');
		res.redirect('/loc/');
	});
	console.log('form submitted');

};

exports.popDB=function(req,res){
	res.render('newLocations',{});
};

exports.getRandoLoc=function(req,res){
	rand=Math.random();
	console.log(rand)
	Loc.findOne({rando : { $gte : rand } },function(err,gteDoc){
		if (gteDoc==null){
			Loc.findOne({rando : { $lte : rand } },function(err,lteDoc){
				console.log(lteDoc);
				res.send(lteDoc);
			});
		}
		else{
			console.log(gteDoc);
			res.send(gteDoc);
		}
	})
};

exports.locInfo=function(req,res){

	// var options={
	// 	hostname: 'http://en.wikipedia.org',
	// 	port: 80,
	// 	path: '/wiki/Moldova',
	// 	method: 'GET'
	// }
	name=req.params.name;
	console.log(req)
	request({uri: 'http://en.wikipedia.org/wiki/'+name}, function(err,response,body){
		var $= cheerio.load(body);
		console.log(name)
		var counter=0;
		$("p").each(function(){
			if(counter==3){
				res.send({placeTitle:name, placeInfo:$(this).html()});
			}
			counter++
		})

	})

}

exports.drop=function(req,res){
	Loc.find({}).remove(function(){
		console.log("DB dropped!");
	});
}