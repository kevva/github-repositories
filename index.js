'use strict';

var got = require('got');
var page = 1;
var ret = [];

function getRepos(user, opts, cb) {
	var url = 'https://api.github.com/users/' + user + '/repos?&per_page=100&page=' + page;
	var auth = [opts.username, opts.password].join(':');
	var headers = {
		Accept: 'application/vnd.github.v3+json',
		Authorization: 'Basic ' + new Buffer(auth).toString('base64')
	};

	got(url, {headers: headers}, function (err, data, res) {
		if (err) {
			cb(err);
			return;
		}

		ret.push(JSON.parse(data));

		if (res.headers.link.indexOf('next') !== -1) {
			page++;
			getRepos(user, opts, cb);
			return;
		}

		cb(null, ret);
	});
}

module.exports = function (user, opts, cb) {
	opts = opts || {};

	if (!opts.username || !opts.password) {
		throw new Error('Username and password is required');
	}

	getRepos(user, opts, function (err, data) {
		if (err) {
			cb(err);
			return;
		}

		cb(null, data);
	});
};
