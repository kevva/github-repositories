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
		'  -t, --token      GitHub authentication token',
		'  -f, --forks      Only list forks',
		'  -s, --sources    Only list sources'
	]
}, {
	boolean: [
		'forks',
		'sources'
	],
	string: [
		'token'
	],
	alias: {
		t: 'token',
		f: 'forks'
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

		if (!cli.flags.forks && !cli.flags.forks && repo.fork) {
			repo.name += chalk.dim(' (fork)');
		}

		console.log(repo.name + ' ' + chalk.dim(repo.html_url));
	});
});
