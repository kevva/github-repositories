# github-repositories [![Build Status](https://travis-ci.org/kevva/github-repositories.svg?branch=master)](https://travis-ci.org/kevva/github-repositories)

> Get all GitHub repos from a user or an organization


## Install

```
$ npm install github-repositories
```


## Usage

```js
const githubRepositories = require('github-repositories');

(async () => {
	console.log(await githubRepositories('kevva'));
	//=> [{id: 29258368, name: 'animal-sounds', full_name: 'kevva/animal-sounds', …}, …]
})();
```


## API

### githubRepositories(name, options?)

Returns a `Promise<object[]>` with the the repositories.

#### name

Type: `string`

Username or organization to fetch repos from.

#### options

Type: `object`

##### token

Type: `string`

Token to authenticate with. Use this to increase the request count. Github supports
up to 60 unauthenticated request per hour. This is also required for accessing private
repos.

If you don't have a token you can generate a new one [here](https://github.com/settings/tokens/new).

##### endpoint

Type: `string`<br>
Default: `https://api.github.com/`

To support [GitHub Enterprise](https://enterprise.github.com/).

Can be set globally with the `GITHUB_ENDPOINT` environment variable.


## CLI

```
$ npm install --global github-repositories
```

```
$ github-repositories --help

  Usage
    $ github-repositories kevva
    $ github-repositories kevva --token 523ef69119eadg12

  Options
    -f, --forks    Only list forks
    -r, --repos    Only display repository names
    -s, --sources  Only list sources
    -t, --token    GitHub authentication token
    -u, --urls     Only display URLs
```
