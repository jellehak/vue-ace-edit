> Ace editor component for Vue

# Installation
Install with `npm i vue-ace-edit`
> Or clone the repo in your project
```
git clone https://github.com/jellehak/vue-ace-edit
```

# Usage
Add the CDN build of Ace to your app
```html
  <script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.3/ace.min.js"></script>
```

Add the plugin: 
```js
import VueAceEdit from "vue-ace-edit"
Vue.use(VueAceEdit)
```

This will add two global components: `AceEditor`, `AceEditorJson`

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
