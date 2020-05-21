import childProcess from 'child_process';
import test from 'ava';
import sinon from 'sinon';
import run from './cli';

test.before('stub spawn', () => {
	sinon.stub(childProcess, 'spawn').callsFake((name, args) => args.slice(-2));
});

test.after('restore stub', () => {
	childProcess.spawn.restore();
});

test('runs first argument when in CI environment', t => {
	t.deepEqual(run(['first', 'second'], true), ['run', ['first']]);
});

test('runs second argument when not in CI environment', t => {
	t.deepEqual(run(['first', 'second'], false), ['run', ['second']]);
});

test('runs nothing if no second argument and not in CI environment', t => {
	t.is(run(['first'], false), undefined);
});

test('runs script with additional arguments if provided', t => {
	t.deepEqual(run(['first', 'second', '--test', 'value'], true, 'npm'), ['run', ['first', '--', '--test', 'value']]);
	t.deepEqual(run(['first', 'second', '--test', 'value'], false, 'npm'), ['run', ['second', '--', '--test', 'value']]);

	t.deepEqual(run(['first', 'second', '--test', 'value'], true, 'yarn'), ['run', ['first', '--test', 'value']]);
	t.deepEqual(run(['first', 'second', '--test', 'value'], false, 'yarn'), ['run', ['second', '--test', 'value']]);
});
