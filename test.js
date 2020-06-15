import test from 'ava';
import sinon from 'sinon';
import run from './cli';

/** @type {sinon.SinonSpy} */
let spawn;

test.before('fake spawn', () => {
	spawn = sinon.fake((name, args) => args);
});

test.afterEach('reset fake', () => {
	spawn.resetHistory();
});

test('runs first argument when in CI environment', t => {
	run(['first', 'second'], true, spawn);
	t.true(spawn.returned(['run', 'first']));
});

test('runs second argument when not in CI environment', t => {
	run(['first', 'second'], false, spawn);
	t.true(spawn.returned(['run', 'second']));
});

test('runs nothing if no second argument and not in CI environment', t => {
	run(['first'], false, spawn);
	t.false(spawn.called);
});

test('runs script with additional arguments if provided', t => {
	run(['first', 'second', '--test', 'value'], true, spawn, 'npm');
	t.true(spawn.lastCall.returned(['run', 'first', '--', '--test', 'value']));

	run(['first', 'second', '--test', 'value'], false, spawn, 'npm');
	t.true(spawn.lastCall.returned(['run', 'second', '--', '--test', 'value']));

	run(['first', 'second', '--test', 'value'], true, spawn, 'yarn');
	t.true(spawn.lastCall.returned(['run', 'first', '--test', 'value']));

	run(['first', 'second', '--test', 'value'], false, spawn, 'yarn');
	t.true(spawn.lastCall.returned(['run', 'second', '--test', 'value']));
});
