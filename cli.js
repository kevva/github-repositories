#!/usr/bin/env node
'use strict';
const chalk = require('chalk');
const meow = require('meow');
const githubRepos = require('.');

const cli = meow(`
	Usage
	  $ github-repositories kevva
	  $ github-repositories kevva --token 523ef69119eadg12

	Options
	  -f, --forks    Only list forks
	  -r, --repos    Only display repository names
	  -s, --sources  Only list sources
	  -t, --token    GitHub authentication token
	  -u, --urls     Only display URL
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
		h: 'help',
		f: 'forks',
		r: 'repos',
		s: 'sources',
		t: 'token',
		u: 'urls',
		v: 'version'
	}
});

if (cli.input.length === 0) {
	console.error('User required');
	process.exit(1);
}

githubRepos(cli.input[0], cli.flags).then(repositories => {
	for (const repository of repositories) {
		if (cli.flags.forks && !repository.fork) {
			return;
		}

		if (cli.flags.sources && repository.fork) {
			return;
		}

		if (!cli.flags.forks && !cli.flags.sources && repository.fork) {
			repository.name += chalk.dim(' (fork)');
		}

		if (cli.flags.repos) {
			console.log(repository.name);
			return;
		}

		if (cli.flags.urls) {
			console.log(repository.html_url);
			return;
		}

		console.log(`${repository.name} ${chalk.dim(repository.html_url)}`);
	}
});
