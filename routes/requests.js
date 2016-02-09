var express = require('express');
var router = express.Router();
var r = require('rethinkdb');

/* GET users listing. */
router.get('/', function(req, res, next) {
	r.connect({host: '192.168.99.100', port: 32775, db: 'biotechne'}, function(err, conn) {
		if (err) throw err;
		r.table('requests').run(conn, function(err, cursor) {
			if (err) throw err;
			cursor.toArray(function(err, result) {
				if (err) throw err;
				res.render('requests', { result: result, title: "Requests"});
			});
		});
	});
});

router.get('/:request_id', function(req, res, next) {
	var id = req.params.request_id;

	r.connect({host: '192.168.99.100', port: 32775, db: 'biotechne'}, function(err, conn) {
		if (err) throw err;
		r.table('requests').filter({id: id}).eqJoin('type', r.table('burritos')).zip().run(conn, function(err, cursor) {
			if (err) throw err;
			cursor.toArray(function(err, results) {
				if (err) throw err;
				console.log(results);
				res.render('request', {result: results, title: 'User'});
			});
		});
	});

});

module.exports = router;
