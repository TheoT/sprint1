
/*
 * GET home page.
 */

var models = require('../models')

User=models.User;

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};