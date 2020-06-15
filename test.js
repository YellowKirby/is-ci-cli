const test = require('ava');
const getSpawnArgs = require('./cli')._getSpawnArgs;

const macro = (isCi) => (t, input, expected, npmExec = 'npm') => {
	const actual = getSpawnArgs(input.split(/\s+/), isCi, npmExec);
	t.deepEqual(actual, ['run', ...expected.split(/\s+/)]);
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
	t.is(getSpawnArgs(['first'], false), null);
});

test('no ci: runs nothing if no second script defined but has arguments', (t) => {
	t.is(getSpawnArgs(['first'], false), null);
});
