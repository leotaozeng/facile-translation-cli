import { Command } from 'commander';
import pkg from '../package.json';

const program = new Command();

program
  .version(pkg.version)
  .name(pkg.name)
  .usage('<word>')
  .arguments('<word>')
  .action((word: string) => {
    console.log('word:', word);
  });

program.parse();
