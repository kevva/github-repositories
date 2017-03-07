'use strict';
const ghGot = require('gh-got');
const isGithubUserOrOrg = require('is-github-user-or-org');

module.exports = (user, opts) => {
	opts = opts || {};

	let page = 1;
	let ret = [];

	if (typeof user !== 'string') {
		return Promise.reject(new TypeError(`Expected a \`string\`, got \`${typeof user}\``));
	}

	return isGithubUserOrOrg(user, opts).then(res => {
		const type = (res === 'User') ? 'users' : 'orgs';

		return (function loop() {
			const url = `${type}/${user}/repos?&per_page=100&page=${page}`;

			return ghGot(url, opts).then(res => {
				ret = ret.concat(res.body);

				if (res.headers.link && res.headers.link.includes('next')) {
					page++;
					return loop();
				}

				return ret;
			});
		})();
	});
};
