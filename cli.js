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
		'  $ github-repositories kevva -f',
		'',
		'Options',
		'  -t, --token    GitHub authentication token',
		'  -f, --hl-forks Highlight forks'
	].join('\n')
}, {
	string: ['token'],
	alias: {t: 'token', f:'hl-forks'}
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
		var color = chalk.dim
		if(cli.flags.f && repo.fork) {
			color = chalk.bold.blue
		}
		console.log(repo.name + ' ' + color(repo.html_url));
	});
});
