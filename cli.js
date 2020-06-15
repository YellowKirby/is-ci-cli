#!/usr/bin/env node

'use strict';

process.on('unhandledRejection', err => {
	throw err;
});

const crossSpawn = require('cross-spawn');
const isCi = require('is-ci');

function isYarn(npmExec) {
	return npmExec.includes('yarn');
}

function getScriptArgs(args, npmExec) {
	const rawArgs = args.slice(2);
	// Npm requires script arguments with dashes, like so: `npm run test -- --watch`
	// Yarn results in a deprecation warning in this case, so dashes need to be skipped
	const shouldPrefixArgs = rawArgs.length > 0 && !isYarn(npmExec);
	return shouldPrefixArgs ? ['--', ...rawArgs] : rawArgs;
}

function run(args, isCi, spawn, npmExec = 'npm') {
	const script = isCi ? args[0] : args[1];
	const scriptArgs = getScriptArgs(args, npmExec);

	if (script) {
		return spawn(
			npmExec,
			['run', script, ...scriptArgs],
			{
				stdio: 'inherit'
			}
		);
	}
}

module.exports = run;

if (require.main === module) {
	const child = run(process.argv.slice(2), isCi, crossSpawn, process.env.npm_execpath);
	if (child) {
		child.on('exit', process.exit);
	}
}
