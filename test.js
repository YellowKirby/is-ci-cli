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
	t.deepEqual(run(['first', 'second'], true), ['run', 'first']);
});

test('runs second argument when not in CI environment', t => {
	t.deepEqual(run(['first', 'second'], false), ['run', 'second']);
});

test('runs nothing if no second argument and not in CI environment', t => {
	t.is(run(['first'], false), undefined);
});
