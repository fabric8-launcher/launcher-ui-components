import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import filesize from 'rollup-plugin-filesize';
import tslint from 'rollup-plugin-tslint';
import typescript from 'rollup-plugin-typescript2';
import json from 'rollup-plugin-json';
import stripCode from "rollup-plugin-strip-code"

import pkg from './package.json';
const isProduction = process.env.NODE_ENV === 'production';

const config = {
    input: 'src/index.ts',
    output: [
        {
            file: pkg.main,
            format: 'cjs',
        },
        {
            file: pkg.module,
            format: 'es',
        },
    ],
    external: [
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.peerDependencies || {}),
    ],
    plugins: [
        peerDepsExternal(),
        tslint({
            include: './src/**/*.tsx?'
        }),
        typescript({
            clean: true,
            typescript: require('typescript'),
            verbosity: 0,
            useTsconfigDeclarationDir: true
        }),
        json(),
        isProduction && stripCode({
            start_comment: 'test-code',
            end_comment: 'end-test-code'
        }),
        filesize(),
    ],
};

export default config;
