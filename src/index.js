import AceEditor from './AceEditor.vue'
import AceEditorJson from './AceEditorJson.vue'

function plugin (Vue) {
  Vue.component('AceEditor', AceEditor)
}

// Install by default if using the script tag
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin

// Export all components
export {
  AceEditor,
  AceEditorJson
}
