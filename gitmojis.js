'use strict';

const gitmojis = require('gitmojis').gitmojis;
const longest = require('longest');
const _map = require('lodash.map');
const chalk = require('chalk');

const format = () => {
  const emojiNames = gitmojis.map(gitmoji => gitmoji.code);
  const maxLength = longest(emojiNames).length;

  const Emojis = _map(gitmojis, gitmoji => {
    const formattedName = gitmoji.code.padEnd(maxLength);
    return {
      name: `${gitmoji.emoji}${chalk.blue(formattedName)} ${gitmoji.description}`,
      value: gitmoji.code
    };
  });

  Emojis.unshift({
    name: `  ${chalk.blue(':None:'.padEnd(maxLength))} Not use gitmoji`,
    value: ''
  })

  return Emojis
};

const emojis = format()

module.exports = {
  emojis
}
