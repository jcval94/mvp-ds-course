'use strict';

// Only issues/labels are changed. No comments, repository writes or extra token.
module.exports = async function track({github, context, report, body}) {
  const {owner, repo} = context.repo;
  const label = 'enlaces-rotos';
  const marker = '<!-- harness-external-links -->';
  if (!report.summary || !Number.isInteger(report.summary.failed)) {
    throw new Error('Incomplete link report; refusing to publish or resolve an issue');
  }
  try {
    await github.rest.issues.getLabel({owner, repo, name: label});
  } catch (error) {
    if (error.status !== 404) throw error;
    await github.rest.issues.createLabel({owner, repo, name: label, color: 'B60205',
      description: 'Seguimiento único de enlaces externos del sitio'});
  }
  const issues = (await github.paginate(github.rest.issues.listForRepo, {
    owner, repo, labels: label, state: 'all', per_page: 100,
  })).filter(issue => !issue.pull_request).sort((a, b) => a.number - b.number);
  // Prefer our persistent issue; adopt an existing labeled tracker if necessary.
  const current = issues.find(issue => (issue.body || '').includes(marker)) || issues[0];
  const failed = report.summary.failed > 0;
  if (!failed && !current) return;
  const run = `${context.serverUrl}/${owner}/${repo}/actions/runs/${context.runId}`;
  const footer = `\n\nInforme completo y excepciones: [ejecución y artefacto external-links-report](${run}).\n`;
  // GitHub caps issue bodies. Keep the JSON/Markdown artifact complete.
  const limit = 58000;
  const text = body.length > limit ? body.slice(0, limit) + '\n\nTabla truncada; consultar el artefacto completo.' : body;
  const update = {owner, repo, title: 'Enlaces externos: revisión del sitio',
    body: (text.startsWith(marker) ? text : marker + '\n' + text) + footer,
    state: failed ? 'open' : 'closed'};
  if (current) {
    await github.rest.issues.update({...update, issue_number: current.number});
  } else {
    const {state, ...create} = update;
    await github.rest.issues.create({...create, labels: [label]});
  }
  // Consolidate only duplicate machine-owned trackers, preserving human issues.
  for (const issue of issues) {
    if (issue.number !== current?.number && issue.state === 'open' && (issue.body || '').includes(marker)) {
      await github.rest.issues.update({owner, repo, issue_number: issue.number, state: 'closed'});
    }
  }
};
