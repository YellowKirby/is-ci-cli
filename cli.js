#!/usr/bin/env node

'use strict';

process.on('unhandledRejection', err => {
	throw err;
});

const spawn = require('cross-spawn');
const isCi = require('is-ci');

function run(args, isCi) {
	const script = isCi ? args[0] : args[1];

	if (script) {
		return spawn(
			'npm',
			['run', script],
			{
				stdio: 'inherit'
			}
		);
	}
}

module.exports = run;

if (require.main === module) {
	const child = run(process.argv.slice(2), isCi);
	if (child) {
		child.on('exit', process.exit);
	}
}
