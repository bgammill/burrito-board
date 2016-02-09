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

router.get('/:user_id', function(req, res, next) {
	var id = req.params.user_id;
	var user = null;

	r.connect({host: '192.168.99.100', port: 32775, db: 'biotechne'}, function(err, conn) {
		if (err) throw err;
		r.table('requests').filter({user: id}).run(conn, function(err, cursor) {
			if (err) throw err;
			cursor.toArray(function(err, result) {
				if (err) throw err;
				res.render('user', { user_id: id, result: result, title: "Users"});
			});
		});
	});

});

module.exports = router;
