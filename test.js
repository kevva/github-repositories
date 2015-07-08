'use strict';

var test = require('ava');
var githubRepos = require('./');

test('user with more than 100 repos', function (t) {
	t.plan(2);
	var token = '523ef691191741c99d5afbcfe58079bfa0038771';

	githubRepos('kevva', {token: token}, function (err, data) {
		t.assert(!err, err);
		t.assert(data.length, data.length);
	});
});

test('user with lower than 100 repos', function (t) {
	t.plan(2);
	var token = '523ef691191741c99d5afbcfe58079bfa0038771';

	githubRepos('octocat', {token: token}, function (err, data) {
		t.assert(!err, err);
		t.assert(data.length, data.length);
	});
});

test('two requests should return same data', function (t) {
	t.plan(5);
	var token = '523ef691191741c99d5afbcfe58079bfa0038771';

	githubRepos('octocat', {token: token}, function (err, data1) {
		t.assert(!err, err);
		t.assert(data1.length, data1.length);

		githubRepos('octocat', {token: token}, function (err, data2) {
			t.assert(!err, err);
			t.assert(data2.length, data2.length);
			t.assert(data1.length === data2.length);
		});
	});
});
