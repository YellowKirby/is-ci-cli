#!/usr/bin/env node

'use strict';
const childProcess = require('child_process');
const isCi = require('is-ci');
const isWindows = process.platform === 'win32';
const npmExec = isWindows ? 'npm.cmd' : 'npm'

function run(args, isCi) {
	const script = isCi ? args[0] : args[1];

	if (script) {
		return childProcess.spawn(
			npmExec,
			['run', script],
			{
				detached: !isWindows,
				stdio: 'inherit'
			}
		);
	}
}

module.exports = run;

if (require.main === module) {
	const proc = run(process.argv.slice(2), isCi);
	if (proc) {
		proc.on('exit', process.exit);
	}
}
