#!/usr/bin/env node

'use strict';

process.on('unhandledRejection', (err) => {
	throw err;
});

const spawn = require('cross-spawn');
const isCi = require('is-ci');

function isYarn(npmExec) {
	return npmExec.includes('yarn');
}

function getSpawnArgs(
	[ciScript, noCiScript, ...additionalArgs],
	isCi,
	npmExec
) {
	const script = isCi ? ciScript : noCiScript;
	if (!script || script.trim() === '--') {
		return null;
	}

	// Npm requires script arguments with dashes, like so: `npm run test -- --watch`
	// Yarn results in a deprecation warning in this case, so dashes need to be skipped
	const shouldPrefixArgs = additionalArgs.length > 0 && !isYarn(npmExec);
	if (shouldPrefixArgs) {
		additionalArgs.unshift('--');
	}

	return ['run', script, ...additionalArgs];
}

module.exports = {
	// Just for testing :)
	_getSpawnArgs: getSpawnArgs,
};

if (require.main === module) {
	const npmExec = process.env.npm_execpath || 'npm';
	const spawnArgs = getSpawnArgs(process.argv.slice(2), isCi, npmExec);
	if (spawnArgs) {
		const child = spawn(npmExec, spawnArgs, {
			stdio: 'inherit',
		});

		child.on('exit', process.exit);
	}
}
