#!/usr/bin/env node
'use strict';

var chalk = require('chalk');
var meow = require('meow');
var githubRepos = require('./');

var cli = meow({
	help: [
		'Usage',
		'  $ github-repos kevva',
		'  $ github-repos kevva --token 523ef69119eadg12',
		'',
		'Options',
		'  -t, --token    Github token to authenticate with'
	].join('\n')
}, {
	string: ['token'],
	alias: {t: 'token'}
});

githubRepos(cli.input[0], cli.flags, function (err, data) {
	if (err) {
		console.error(err.message);
		process.exit(1);
	}

	data.forEach(function (repo) {
		console.log(repo.name + ' ' + chalk.dim(repo.html_url));
	});
});
