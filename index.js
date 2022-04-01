'use strict';
const {Octokit} = require('@octokit/rest');

const octokit = new Octokit();

module.exports = async (name, {
	sort = 'full_name',
	direction,
	token: auth,
	endpoint: baseUrl = process.env.GITHUB_ENDPOINT
} = {}) => {
	if (typeof name !== 'string') {
		throw new TypeError(`Expected \`name\` to be of type \`string\` but received type \`${typeof name}\``);
	}

	return octokit.paginate(octokit.repos.listForUser, {
		username: name,
		per_page: 100, // eslint-disable-line camelcase
		sort,
		direction,
		auth,
		baseUrl,
		userAgent: 'https://github.com/kevva/github-repositories'
	});
};
