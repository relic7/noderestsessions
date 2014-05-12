var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'An Express Created Masterpiece' });
});


/* GET Image list page. */
router.get('/images/imagelist', function(req, res) {
    var db = req.db;
    db.getCollection('imagescollection').find().toArray(function (err, items) {
        res.json(items);
    // var collection = db.get('imagescollection');
    //collection.find({},{},function(e,docs){
    //    res.render('imagelist', {
    //        "imagelist" : docs
    
    
        });
    });
});

module.exports = router;


