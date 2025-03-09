#!/usr/bin/env node
"use strict";

// Inspired by: https://github.com/commitizen/cz-conventional-changelog and https://github.com/commitizen/cz-cli

const autocomplete = require('inquirer-autocomplete-prompt');
const chalk = require('chalk');
const types = require("./commit-types.js").types
const emojis = require("./gitmojis.js").emojis

var filter = function (array) {
  return array.filter(function (x) {
    return x;
  });
};

const questions = [
  {
    type: 'list',
    name: 'type',
    message: `Select the ${chalk.green('type')} of change that you're committing:`,
    default: 'feat',
    choices: types,
  },
  {
    type: 'input',
    name: 'scope',
    message: `What is the ${chalk.green('scope')} of this change ${chalk.gray('(e.g. component or file name)')}:\n`,
    default: ''
  },
  {
    type: 'autocomplete',
    name: 'gitmoji',
    message: `Select a ${chalk.green('gitmoji')}:`,
    source: async (answersSoFar, input) => {
      const gitmojiList = emojis;
      if (!input) return gitmojiList;
      return gitmojiList.filter(gitmoji =>
        gitmoji.name.toLowerCase().includes(input.toLowerCase())
      );
    },
    default: ''
  },
  {
    type: 'input',
    name: 'subject',
    message: `Write a short, imperative tense description(${chalk.green('subject')}) of the change:\n`,
    validate: input => !!input || `${chalk.red('subject is required')}`
  },
  {
    type: 'input',
    name: 'body',
    message: `Provide a longer description(${chalk.green('body')}) of the change:\n`,
    default: ''
  },
  {
    type: 'confirm',
    name: 'isBreaking',
    message: `Are there any ${chalk.red('breaking changes')}?`,
    default: false
  },
  // {
  //   type: 'input',
  //   name: 'breakingBody',
  //   default: '-',
  //   message: `A BREAKING CHANGE commit requires a ${chalk.green('body')}. Please enter a longer description of the commit itself:\n`,
  //   when: function (answers) {
  //     return answers.isBreaking && !answers.body;
  //   },
  //   validate: input => !!input || `${chalk.red('Body is required for BREAKING CHANGE')}`
  // },
  {
    type: 'input',
    name: 'breaking',
    message: `Describe the ${chalk.green('breaking changes')}:\n`,
    when: function (answers) {
      return answers.isBreaking;
    }
  },
  {
    type: 'confirm',
    name: 'isIssueAffected',
    message: `Does this change affect any open ${chalk.red('issues')}?`,
    default: false
  },
  // {
  //   type: 'input',
  //   name: 'issuesBody',
  //   default: '-',
  //   message: `If issues are closed, the commit requires a ${chalk.green('body')}. Please enter a longer description of the commit itself:\n`,
  //   when: function (answers) {
  //     return (
  //       answers.isIssueAffected && !answers.body && !answers.breakingBody
  //     );
  //   }
  // },
  {
    type: 'input',
    name: 'issues',
    message: `Add ${chalk.green('issue')} references (e.g. "fix #123", "re #123".):\n`,
    when: function (answers) {
      return answers.isIssueAffected;
    },
    default: undefined
  }
];

const commitFormat = (answers) => {
  const scope = answers.scope ? `(${answers.scope})` : '';
  const breakingSign = answers.isBreaking ? '!' : '';
  const gitmoji = answers.gitmoji ? `${answers.gitmoji} ` : '';
  const head = `${answers.type}${scope}${breakingSign}: ${gitmoji}${answers.subject}`;
  const body = answers.body || answers.breakingBody || answers.issuesBody;
  const breaking = answers.isBreaking ? `BREAKING CHANGE: ${answers.breaking}` : '';
  const issues = ""
  return filter([head, body, breaking, issues]).join('\n\n');
};

/**
 * Export an object containing a `prompter` method. This object is used by `commitizen`.
 *
 * @type {Object}
 */
module.exports = {
  prompter: (cz, commit) => {
    cz.registerPrompt('autocomplete', autocomplete);
    cz.prompt(questions).then(answers => {
      const commitMessage = commitFormat(answers);
      commit(commitMessage);
    });
  }
}
