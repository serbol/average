/**
 * Result page file
 */

exports.index = function(req, res){
  res.render('result', { title: 'Results' });
};