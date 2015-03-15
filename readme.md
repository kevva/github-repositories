# github-repositories [![Build Status](http://img.shields.io/travis/kevva/github-repositories.svg?style=flat)](https://travis-ci.org/kevva/github-repositories)

> Get all Github repos from a user

## Install

```bash
$ npm install --save github-repositories
```

## Usage

```js
var githubRepos = require('github-repositories');

githubRepos('kevva', {token: 'd6540203cb248a'}, function (err, data) {
	if (err) {
		throw err;
	}

	console.log(data);
	//=> [{id: 29258368, name: 'animal-sounds', full_name: 'kevva/animal-sounds', ...}, ...]
});
```

## API

### githubRepos(user, opts, cb)

#### user

Type: `string`

Username to fetch repos from.

#### opts.token

Type: `string`

Token to authenticate with. If you don't have one you can generate a new one [here](https://github.com/settings/tokens/new).

#### cb(err, data)

Type: `function`

`data` contains an array with all Github repos.

## License

MIT © [Kevin Mårtensson](https://github.com/kevva)
