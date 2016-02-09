var express = require('express');
var router = express.Router();
var r = require('rethinkdb');

/* GET home page. */
router.get('/', function(req, res, next) {

	r.connect({host: '192.168.99.100', port: 32775, db: 'biotechne'}, function(err, conn) {
		if (err) throw err;
		r.table('requests').eqJoin('type', r.table('burritos')).zip().run(conn, function(err, cursor) {
			if (err) throw err;
			cursor.toArray(function(err, results) {
				if (err) throw err;
				res.render('index', { result: results, title: 'Burrito Board' });
			});
		});
	});

});

module.exports = router;
