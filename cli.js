#!/usr/bin/env node
'use strict';
const chalk = require('chalk');
const meow = require('meow');
const githubRepos = require('./');

const cli = meow(`
	Usage
	  $ github-repositories kevva
	  $ github-repositories kevva --token 523ef69119eadg12

	Options
	  -f, --forks      Only list forks
	  -r, --repos      Only display repository names
	  -s, --sources    Only list sources
	  -t, --token      GitHub authentication token
	  -u, --urls       Only display URL
`, {
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

if (cli.input.length === 0) {
	console.error('User required');
	process.exit(1);
}

githubRepos(cli.input[0], cli.flags).then(data => {
	data.forEach(x => {
		if (cli.flags.forks && !x.fork) {
			return;
		}

		if (cli.flags.sources && x.fork) {
			return;
		}

		if (!cli.flags.forks && !cli.flags.sources && x.fork) {
			x.name += chalk.dim(' (fork)');
		}

		if (cli.flags.repos) {
			console.log(x.name);
			return;
		}

		if (cli.flags.urls) {
			console.log(x.html_url);
			return;
		}

		console.log(`${x.name} ${chalk.dim(x.html_url)}`);
	});
});
