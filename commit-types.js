'use strict';

const conventionalTypes = require('conventional-commit-types').types;
const longest = require('longest');
const _map = require('lodash.map');
const chalk = require('chalk');

const format = () => {
  const typeNames = Object.keys(conventionalTypes);
  const maxLength = longest(typeNames).length;

  return _map(conventionalTypes, (type, name) => {
    const formattedName = name.padEnd(maxLength); // 对齐类型名称
    return {
      name: `${chalk.blue(formattedName)} : ${type.description}`,
      value: name
    };
  });
};

const types = format()

module.exports = {
  types
};
