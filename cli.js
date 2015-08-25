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
		'  -t, --token    GitHub authentication token',
		'  -f, --forks    Show/Hide forks (y/n)'
	]
}, {
	string: ['token', 'forks'],
	alias: {t: 'token', f: 'forks'}
});

if (!cli.input[0]) {
	console.error('User required');
	process.exit(1);
}

var listForks = null;
if (cli.flags.forks) {
	switch (cli.flags.forks) {
		case 'y': case 'yes': case 'true': case 't': listForks = true; break;
		case 'n': case 'no': case 'false': case 'f': listForks = false; break;
		default:
			console.log(cli.help);
			process.exit(1);
	}
}

githubRepos(cli.input[0], cli.flags, function (err, data) {
	if (err) {
		console.error(err.message);
		process.exit(1);
	}

	data.forEach(function (repo) {
		if (listForks == null) {
			if (repo.fork) {
				repo.name += chalk.dim(' (fork)');
			}
		} else {
			if (repo.fork !== listForks) {
				return;
			}
		}

		console.log(repo.name + ' ' + chalk.dim(repo.html_url));
	});
});
