#!/usr/bin/env node
'use strict';

var chalk = require('chalk');
var meow = require('meow');
var githubRepos = require('./');

var cli = meow({
	help: [
		'Usage',
		'  $ github-repositories kevva',
		'  $ github-repositories kevva --token 523ef69119eadg12',
		'',
		'Options',
		'  -t, --token    GitHub authentication token'
	].join('\n')
}, {
	string: ['token'],
	alias: {t: 'token'}
});

if (!cli.input[0]) {
	console.error('User required');
	process.exit(1);
}

githubRepos(cli.input[0], cli.flags, function (err, data) {
	if (err) {
		console.error(err.message);
		process.exit(1);
	}

	data.forEach(function (repo) {
		if (repo.fork) {
			repo.name += chalk.dim(' (fork)');
		}

		console.log(repo.name + ' ' + chalk.dim(repo.html_url));
	});
});
