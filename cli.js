#!/usr/bin/env node
'use strict';
var chalk = require('chalk');
var meow = require('meow');
var githubRepos = require('./');

var cli = meow([
	'Usage',
	'  $ github-repositories kevva',
	'  $ github-repositories kevva --token 523ef69119eadg12',
	'',
	'Options',
	'  -f, --forks      Only list forks',
	'  -r, --repos      Only display repository names',
	'  -s, --sources    Only list sources',
	'  -t, --token      GitHub authentication token',
	'  -u, --urls       Only display URLs'
], {
	boolean: [
		'forks',
		'repos',
		'sources',
		'urls'
	],
	string: [
		'token'
	],
	alias: {
		f: 'forks',
		r: 'repos',
		s: 'sources',
		t: 'token',
		u: 'urls'
	}
});

if (!cli.input[0]) {
	console.error('User required');
	process.exit(1);
}

githubRepos(cli.input[0], cli.flags).then(function (data) {
	data.forEach(function (repo) {
		if (cli.flags.forks && !repo.fork) {
			return;
		}

		if (cli.flags.sources && repo.fork) {
			return;
		}

		if (!cli.flags.forks && !cli.flags.sources && repo.fork) {
			repo.name += chalk.dim(' (fork)');
		}

		if (cli.flags.repos) {
			console.log(repo.name);
			return;
		}

		if (cli.flags.urls) {
			console.log(repo.html_url);
			return;
		}

		console.log(repo.name + ' ' + chalk.dim(repo.html_url));
	});
});
