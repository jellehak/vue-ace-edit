import { AceEditor, AceEditorJson } from './vue-ace-edit.js'

function plugin (Vue, config = {}) {
  Vue.component('AceEditor', AceEditor)
  Vue.component('AceEditorJson', AceEditorJson)
}

// Install by default if using the script tag
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin
export { AceEditor, AceEditorJson }
