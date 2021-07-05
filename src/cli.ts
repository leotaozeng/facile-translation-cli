#!/usr/bin/env node

import { Command } from 'commander';
import dotenv from 'dotenv';
import pkg from '../package.json';
import { baiduTranslate, googleTranslate, youdaoTranslate } from './main';

dotenv.config();

const program = new Command();
const options = {
  baidu: {
    command: 'baidu <word>',
    description: 'use Baidu Translate',
    action: (word: string) => {
      baiduTranslate(word)
    }
  },
  youdao: {
    command: 'youdao <word>',
    description: 'use Youdao Translate',
    action: (word: string) => {
      youdaoTranslate(word)
    }
  },
  google: {
    command: 'google <word>',
    description: 'use Google Translate',
    action: (word: string) => {
      googleTranslate(word)
    }
  }
};

program
  .version(pkg.version)
  .name(pkg.name)
  .usage('<tool> <word>') // * Usage: facile-translation <tool> <word>
  .helpOption('-H, --help', 'read more information');

Object.values(options).forEach((option) => {
  program
    .command(option.command)
    .description(option.description)
    .action(option.action);
});

program.parse();
