const minimist = require('minimist')
const execa = require('execa')
const args = minimist(process.argv.slice(2))

const target = args._.length ? args._[0] : 'reactivity'
const formats = args.f || 'global'; // esm global cjs
const sourcemap = args.s || false; // 

execa('rollup', [
    '-wc', // --watch --config
    '--environment',
    [
        `TARGET:${target}`,
        `FORMATS:${formats}`,
        sourcemap ? `SOURCE_MAP:true` : ''
    ].filter(Boolean).join(',')
],{
    stdio:'inherit', // 子进程输出是在我们当前命令行中输出
})

