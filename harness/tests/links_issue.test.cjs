'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const track = require('../links_issue.cjs');
const marker = '<!-- harness-external-links -->';

function fixture(initial = []) {
  const issues = initial;
  const calls = [];
  let label = false;
  const api = {
    getLabel: async () => { if (!label) throw Object.assign(new Error('Not found'), {status: 404}); },
    createLabel: async () => { label = true; },
    listForRepo: () => {},
    create: async args => {
      const issue = {...args, number: 7, state: 'open'};
      issues.push(issue);
      calls.push(['create', args]);
      return {data: issue};
    },
    update: async args => {
      Object.assign(issues.find(i => i.number === args.issue_number), args);
      calls.push(['update', args]);
    },
  };
  return {issues, calls, github: {rest: {issues: api}, paginate: async () => issues.map(i => ({...i}))},
    context: {repo: {owner: 'owner', repo: 'course'}, serverUrl: 'https://github.com', runId: 123}};
}

test('repeated failures update one issue; clean run resolves it; recurrence reopens it', async () => {
  const f = fixture();
  for (const failed of [1, 2, 0, 1]) {
    await track({...f, report: {summary: {failed}}, body: marker + '\nreport'});
  }
  assert.equal(f.issues.length, 1);
  assert.equal(f.calls.filter(c => c[0] === 'create').length, 1);
  assert.deepEqual(f.calls.map(c => c[1].state || 'open'), ['open', 'open', 'closed', 'open']);
  assert.deepEqual(f.issues[0].labels, ['enlaces-rotos']);
  assert.match(f.issues[0].body, /actions\/runs\/123/);
});

test('healthy first run creates no issue', async () => {
  const f = fixture();
  await track({...f, report: {summary: {failed: 0}}, body: marker});
  assert.equal(f.issues.length, 0);
});

test('adopts an existing tracker and consolidates machine duplicates', async () => {
  const f = fixture([{number: 1, state: 'open', body: marker}, {number: 2, state: 'open', body: marker}]);
  await track({...f, report: {summary: {failed: 1}}, body: marker});
  assert.equal(f.issues[0].state, 'open');
  assert.equal(f.issues[1].state, 'closed');
  assert.equal(f.calls.filter(c => c[0] === 'create').length, 0);
});

test('incomplete result never resolves an existing issue', async () => {
  const f = fixture([{number: 1, state: 'open', body: marker}]);
  await assert.rejects(track({...f, report: {}, body: ''}), /Incomplete/);
  assert.equal(f.calls.length, 0);
});
