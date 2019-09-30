'use strict';
const ghGot = require('gh-got');
const isGithubUserOrOrg = require('is-github-user-or-org');

const fetchRepos = async (url, options = {}, repos = [], page = 1) => {
	const {body: currentRepos, headers: {link}} = await ghGot(url, {
		...options,
		query: {
			page,
			per_page: 100, // eslint-disable-line camelcase
			sort: options.sort
		}
	});

	if (link && link.includes('next')) {
		return fetchRepos(url, options, repos.concat(currentRepos), page + 1);
	}

	return repos.concat(currentRepos);
};

module.exports = async (name, options = {}) => {
	options = {
		sort: 'full_name',
		...options
	};

	if (typeof name !== 'string') {
		throw new TypeError(`Expected \`name\` to be of type \`string\` but received type \`${typeof name}\``);
	}

	const type = (await isGithubUserOrOrg(name, options) === 'User') ? 'users' : 'orgs';
	const url = `${type}/${name}/repos`;

	return fetchRepos(url, options);
};
