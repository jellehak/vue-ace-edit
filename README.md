> Ace editor component for Vue

# Roadmap
- [x] Option to dynamicly load the Ace assets
- [ ] Build version

# Installation
Install with `npm i vue-ace-edit`
> Or clone the repo in your project
```
git clone https://github.com/jellehak/vue-ace-edit
```

# Usage
Add the plugin: 
```js
import VueAceEdit from "vue-ace-edit"
Vue.use(VueAceEdit)
```
This will add two global components: `AceEditor`, `AceEditorJson`

# Ace library
If no `ace` global can be found this plugin will async load the library from `https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12`.

If you want to load it from a different location or a specific version then make sure a `ace` global exist by loading something from a CDN like:
```html
  <script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.3/ace.min.js"></script>
```

# Components
## AceEditor
```html
<AceEditor :value="`<div>Hello</div>`" mode="html"/>
```

## AceEditorJson
Wrapper component that encode/ decodes JSON objects
```html
<AceEditorJson :value="{hello:'cool'}" />
```

> See `AceEditorDemo.vue` for more usage examples
