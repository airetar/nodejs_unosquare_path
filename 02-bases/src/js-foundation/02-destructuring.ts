// console.log(process.env);

const { SHELL, HOMEBREW_PREFIX, npm_lifecycle_script } = process.env;
//console.table({ SHELL, HOMEBREW_PREFIX, npm_lifecycle_script });

export const characters = ['Flash', 'Arrow', 'Superman', 'Batman'];
const [_, __, superman] = characters;
const [flash, ...rest] = characters;