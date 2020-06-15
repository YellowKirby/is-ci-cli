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
  "test": "is-ci test:ci test:local"
}
```

When in a CI environment (as detected by
[is-ci](https://github.com/watson/is-ci)), this runs the first argument as an
npm (or yarn) script. Otherwise, run the 2nd argument (if provided)

### Additional arguments

Any additional arguments provided will be passed to the corresponding script that is run. For example,
with the following config:

```js
{
  "scripts": {
    "test": "is-ci test:ci test:local",
    "test:ci": "jest --config jest.ci.config.js",
    "test:local": "jest --config jest.local.config.js"
  }
}
```

Running the following will pass all additional arguments through to the
underlying command:

```sh
yarn test --watch
# jest --config jest.local.config.js --watch

CI=true yarn test --coverage --coverageReporters=text-summary
# jest --config jest.ci.config.js --coverage --coverageReporters=text-summary
```

## License

[MIT](./LICENSE)
