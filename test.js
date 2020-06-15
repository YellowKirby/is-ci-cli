const test = require('ava');
const sinon = require('sinon');
const run = require('./cli');

const mockSpawn = () => sinon.fake();

const macro = (isCi) => (t, input, expected, npmExec = 'npm') => {
	const spawn = mockSpawn();
	run(input.split(/\s+/), isCi, spawn, npmExec);
	const actual = spawn.lastCall.args.slice(0, 2);
	t.deepEqual(actual, [npmExec, ['run', ...expected.split(/\s+/)]]);
};

const ci = macro(true);
const noCi = macro(false);

test('ci: runs first script', ci, 'first second', 'first');

test(
	'ci: npm: passes additional arguments',
	ci,
	'first second --test value',
	'first -- --test value',
	'npm'
);

test(
	'ci: yarn: passes additional arguments',
	ci,
	'first second --test value',
	'first --test value',
	'yarn'
);

test('no ci: runs second script', noCi, 'first second', 'second');

test(
	'no ci: npm: passes additional arguments',
	noCi,
	'first second --test value',
	'second -- --test value',
	'npm'
);

test(
	'no ci: yarn: passes additional arguments',
	noCi,
	'first second --test value',
	'second --test value',
	'yarn'
);

test('no ci: runs nothing if no second script defined', (t) => {
	const spawn = mockSpawn();
	run(['first'], false, spawn);
	t.false(spawn.called);
});

test('no ci: runs nothing if no second script defined but has arguments', (t) => {
	const spawn = mockSpawn();
	run(['first', '--', '--test', 'value'], false, spawn);
	t.false(spawn.called);
});
