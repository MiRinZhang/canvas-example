import babel from 'rollup-plugin-babel';

export default {
    input: 'src/index.js',
    output: {
        file: 'dist/bundle.js',
        format: 'iife',
        sourcemap: true,
        name: 'draw',
    },
    plugins: [
        babel({
            exclude: 'node_modules/**'
        })
    ]
}