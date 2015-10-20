'use strict';
var test = require('ava');
var githubRepos = require('./');

test('user with more than 100 repos', function (t) {
	t.plan(1);
	var token = '523ef691191741c99d5afbcfe58079bfa0038771';

	githubRepos('kevva', {token: token}).then(function (data) {
		t.assert(data.length, data.length);
	});
});

test('user with lower than 100 repos', function (t) {
	t.plan(1);
	var token = '523ef691191741c99d5afbcfe58079bfa0038771';

	githubRepos('octocat', {token: token}).then(function (data) {
		t.assert(data.length, data.length);
	});
});

test('two requests should return same data', function (t) {
	t.plan(3);
	var token = '523ef691191741c99d5afbcfe58079bfa0038771';

	githubRepos('octocat', {token: token}).then(function (data1) {
		t.assert(data1.length, data1.length);

		githubRepos('octocat', {token: token}).then(function (data2) {
			t.assert(data2.length, data2.length);
			t.assert(data1.length === data2.length);
		});
	});
});
