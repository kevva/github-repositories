'use strict';

var ghGot = require('gh-got');

function getRepos(user, opts, cb) {
	var page = 1;
	var ret = [];

	(function loop() {
		var url = 'users/' + user + '/repos?&per_page=100&page=' + page;

		ghGot(url, opts, function(err, data, res) {
			if (err) {
				cb(err);
				return;
			}

			ret = ret.concat(data);

			if (res.headers.link && res.headers.link.indexOf('next') !== -1) {
				page++;
				loop();
				return;
			}

			cb(null, ret);
		});
	}());

}

module.exports = function (user, opts, cb) {
	opts = opts || {};

	if (typeof user !== 'string') {
		throw new Error('User is required');
	}

	if (typeof opts === 'function') {
		cb = opts;
		opts = {};
	}

	getRepos(user, opts, function (err, data) {
		if (err) {
			cb(err);
			return;
		}

		cb(null, data);
	});
};
