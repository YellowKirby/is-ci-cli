# is-ci-cli ![CI](https://github.com/YellowKirby/is-ci-cli/workflows/CI/badge.svg)

Run different npm scripts in a CI environment

## Install

Ensure you have [Node.js](https://nodejs.org) version 8+ installed. Then run the following:

```sh
npm install --dev is-ci-cli
```

## Usage

In your package.json:

```js
"scripts": {
  "test": "is-ci-cli test:ci test:local"
}
```

When in a CI environment (as detected by
[is-ci](https://github.com/watson/is-ci)), this runs the first argument as an
npm (or yarn) script. Otherwise, run the 2nd argument (if provided)

## License

MIT
