'use strict';
const ghGot = require('gh-got');
const isGithubUserOrOrg = require('is-github-user-or-org');

module.exports = (name, options) => {
	options = options || {};

	let page = 1;
	let returnValue = [];

	if (typeof name !== 'string') {
		return Promise.reject(new TypeError(`Expected \`name\` to be of type \`string\` but received type \`${typeof name}\``));
	}

	return isGithubUserOrOrg(name, options).then(userType => {
		const type = (userType === 'User') ? 'users' : 'orgs';

		return (function loop() {
			const url = `${type}/${name}/repos?&per_page=100&page=${page}`;

			return ghGot(url, options).then(response => {
				returnValue = returnValue.concat(response.body);

				if (response.headers.link && response.headers.link.includes('next')) {
					page++;
					return loop();
				}

				return returnValue;
			});
		})();
	});
};
