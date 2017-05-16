#!/usr/bin/env node

'use strict';
const childProcess = require('child_process');
const isCi = require('is-ci');

function run(args, isCi) {
	const script = isCi ? args[0] : args[1];

	if (script) {
		return childProcess.spawn(
      process.env.npm_execpath || 'npm',
      ['run', script],
			{
				detached: true,
				stdio: 'inherit'
			}
    );
	}
}

module.exports = run;

if (require.main === module) {
	run(process.argv.slice(2), isCi);
}
