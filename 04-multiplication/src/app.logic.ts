import * as fs from 'fs';
import { yarg } from './config/plugins/yargs.plugin';

const { b: base, l: limit, s: show } = yarg;

const path = 'outputs/tables';
const fsConfig = {
    filePathName: `${path}/${base}-table.txt`,
    options:  { flag: 'a' }
};

const header = `
    ================================
            ${ base } times table       
    ================================
`;

show && console.log(header);
fs.mkdirSync(path, { recursive: true });
fs.writeFileSync(fsConfig.filePathName, header, { flag: 'w' });

let count = 1;
while (count <= limit) {
    show && console.log(`${base} x ${count} = ${base * count}`);
    fs.writeFileSync(fsConfig.filePathName, `${base} x ${count} = ${base * count}\n`, fsConfig.options);
    count++;
}

console.log(`\nFinished! File created at ${fsConfig.filePathName}\n`);

