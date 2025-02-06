import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

export const yarg = yargs(hideBin(process.argv))
    .option('b', {
        alias: 'base',
        type: 'number',
        demandOption: true,
        describe: 'Base number for the multiplication table'
    })
    .option('l', {
        alias: 'limit',
        type: 'number',
        default: 10,
        describe: 'Limit for the multiplication table'
    })
    .option('s', {
        alias: 'show',
        type: 'boolean',
        default: false,
        describe: 'Show multiplication table'
    })
    .option('n', {
        alias: 'name',
        type: 'string',
        default: 'multiplication-table',
        describe: 'Name of the file'
    })
    .option('d', {
        name: 'directory',
        type: 'string',
        default: 'outputs/tables',
        describe: 'Directory for the file'
    })
    .check((argv) => {
        if (isNaN(argv.b)) {
            throw new Error('Error: base must be a number');
        }
        if (argv.b < 1) {
            throw new Error('Error: Base must be a greater than 0');
        }
        if (isNaN(argv.l)) {
            throw new Error('Error: Limit must be a number');
        }
        return true;
    })
    .fail((_, err, yargs) => {
        if (err) throw err.message;
    })
    .parseSync();
