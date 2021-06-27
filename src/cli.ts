import dotenv from 'dotenv';
import pkg from '../package.json';
import { Command } from 'commander';
import { translate } from './main';

dotenv.config();

const program = new Command();

program
  .version(pkg.version)
  .name(pkg.name)
  .usage('<word>')
  .arguments('<word>')
  .action((word: string) => translate(word));

program.parse();
