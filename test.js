import test from 'ava';
import fn from './';

test('user with more than 100 repos', async t => {
	const token = '523ef691191741c99d5afbcfe58079bfa0038771';
	const repos = await fn('kevva', {token: token});

	t.ok(repos.length);
	t.true(repos.length > 100);
});

test('user with lower than 100 repos', async t => {
	const token = '523ef691191741c99d5afbcfe58079bfa0038771';
	const repos = await fn('octocat', {token: token});

	t.ok(repos.length);
	t.true(repos.length < 100);
});

test('two requests should return same data', async t => {
	t.plan(3);
	const token = '523ef691191741c99d5afbcfe58079bfa0038771';
	const repos1 = await fn('octocat', {token: token});
	const repos2 = await fn('octocat', {token: token});

	t.ok(repos1.length);
	t.ok(repos2.length);
	t.same(repos1, repos2);
});
