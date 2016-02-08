var express = require('express');
var router = express.Router();
var r = require('rethinkdb');

/* GET users listing. */
router.get('/', function(req, res, next) {
	r.connect({host: '192.168.99.100', port: 32775, db: 'biotechne'}, function(err, conn) {
		if (err) throw err;
		r.table('users').run(conn, function(err, cursor) {
			if (err) throw err;
			cursor.toArray(function(err, result) {
				if (err) throw err;
				res.render('users', { result: result, title: "Users"});
			});
		});
	});
});

module.exports = router;
