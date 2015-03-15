'use strict';

var got = require('got');
var page = 1;
var ret = [];

function getRepos(user, headers, cb) {
	var url = 'https://api.github.com/users/' + user + '/repos?&per_page=100&page=' + page;

	got(url, {headers: headers}, function (err, data, res) {
		if (err) {
			cb(err);
			return;
		}

		ret = ret.concat(JSON.parse(data));

		if (res.headers.link.indexOf('next') !== -1) {
			page++;
			getRepos(user, headers, cb);
			return;
		}

		cb(null, ret);
	});
}

module.exports = function (user, opts, cb) {
	opts = opts || {};

	if (!opts.token) {
		throw new Error('Token is required to authenticate with the Github API');
	}

	var headers = {
		Accept: 'application/vnd.github.v3+json',
		Authorization: 'token ' + opts.token
	};

	getRepos(user, headers, function (err, data) {
		if (err) {
			cb(err);
			return;
		}

		cb(null, data);
	});
};
