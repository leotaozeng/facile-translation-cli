import { translate } from './main';
import { Command } from 'commander';
import dotenv from 'dotenv';
import pkg from '../package.json';

dotenv.config();

const program = new Command();

program
  .version(pkg.version)
  .name(pkg.name)
  .usage('<word>') // * Usage: facile-translation <word>
  .arguments('<word>')
  .description('translate English words')
  .action((word: string) => translate(word));

program.parse();
