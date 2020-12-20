import vue from 'rollup-plugin-vue'

export default {
  input: './index.js',
  output: {
    format: 'esm',
    file: 'dist/vue-ace-edit.js'
  },
  plugins: [
    vue()
  ]
}
