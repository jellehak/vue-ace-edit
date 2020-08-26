import { AceEditor, AceEditorJson } from './src'
export * from './src'

function plugin (Vue) {
  Vue.component('AceEditor', AceEditor)
  Vue.component('AceEditorJson', AceEditorJson)
}

// Install by default if using the script tag
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin
