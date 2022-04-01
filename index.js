'use strict';
const {Octokit} = require('@octokit/rest');

module.exports = async (name, {
	sort = 'full_name',
	direction,
	token: auth,
	endpoint: baseUrl = process.env.GITHUB_ENDPOINT
} = {}) => {
	if (typeof name !== 'string') {
		throw new TypeError(`Expected \`name\` to be of type \`string\` but received type \`${typeof name}\``);
	}

	const octokit = new Octokit({
		auth,
		baseUrl,
		userAgent: 'https://github.com/kevva/github-repositories'
	});

	const {data: {type}} = await octokit.users.getByUsername({
		username: name
	});

	const requestOptions = {
		per_page: 100, // eslint-disable-line camelcase
		sort,
		direction
	};

	return type === 'User' ?
		octokit.paginate(octokit.repos.listForUser, {
			username: name,
			...requestOptions
		}) :
		octokit.paginate(octokit.repos.listForOrg, {
			org: name,
			...requestOptions
		});
};
