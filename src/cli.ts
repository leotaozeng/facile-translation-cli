#!/usr/bin/env node

import { baiduTranslate, youdaoTranslate, googleTranslate } from './main';
import { Command } from 'commander';
import dotenv from 'dotenv';
import pkg from '../package.json';

dotenv.config();

const program = new Command();

program
  .version(pkg.version)
  .name(pkg.name)
  .usage('<tool> <word>') // * Usage: facile-translation <tool> <word>
  .helpOption('-H, --help', 'read more information');

program
  .command('baidu <word>')
  .description('use Baidu Translate')
  .action((word: string) => baiduTranslate(word));

program
  .command('youdao <word>')
  .description('use Youdao Translate')
  .action((word: string) => youdaoTranslate(word));

program
  .command('google <word>')
  .description('use Google Translate')
  .action((word: string) => googleTranslate(word));

program.parse();
