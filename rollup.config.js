// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

export default {
  input: 'src/main.js',       // Your entry point
  output: {
    file: 'dist/bundle.js',     // Output file (you could also use 'dist/bundle.js' if you prefer)
    format: 'iife',
    name: 'ShoppingListApp',
    sourcemap: true,
  },
  plugins: [
    resolve({
      browser:true,
      preferBuiltins:false
    }),
    commonjs(),
    json()
  ],
  onwarn(warning, warn) {
    // Use `console.warn` instead of `warn` to see warnings directly in the console
    console.warn(warn.message);
  },
};
