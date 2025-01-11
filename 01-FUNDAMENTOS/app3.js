const fs = require('fs');
const content = fs.readFileSync('README.md', 'utf8');
const wordCount = content.split(' ');
//const reactWordCount = wordCount.filter(word => word.toLowerCase() === 'react').length
const reactWordCount = content.match(/react/g).length;
console.log('Palabras: ', wordCount);
console.log('Palabras React: ', reactWordCount);