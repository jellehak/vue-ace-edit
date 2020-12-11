<script>
export default {
  data: vm => ({
    jsonString: '{"hello":"cool"}',
    json: {
      value: {
        hello: 'cool'
      },
      new: {},
      valid: null,
      annotations: []
    },
    html: {
      value: '<div>Hello</div>',
      annotations: []
    },
    themes: [
      // https://github.com/ajaxorg/ace/tree/master/lib/ace/theme
      'ambiance',
      'chaos',
      'chrome',
      'clouds',
      'clouds_midnight',
      'cobalt',
      'crimson_editor',
      'dawn',
      'dracula',
      'dreamweaver',
      'eclipse',
      'github',
      'gob',
      'gruvbox',
      'idle_fingers',
      'iplastic',
      'katzenmilch',
      'kr_theme',
      'kuroir',
      'merbivore',
      'merbivore_soft',
      'mono_industrial',
      'monokai',
      'nord_dark',
      'pastel_on_dark',
      'solarized_dark',
      'solarized_light',
      'sqlserver',
      'terminal',
      'textmate',
      'tomorrow',
      'tomorrow_night',
      'tomorrow_night_blue',
      'tomorrow_night_bright',
      'tomorrow_night_eighties',
      'twilight',
      'vibrant_ink',
      'xcode'
    ]
  }),

  mounted () {
    // Access the ACE's instance
    // <editor ref='myEditor'>
    const editor = this.$refs.editor1.editor
    console.log(editor)
  }
}
</script>

<template>
  <div>
    <div
      class="ace_editor_demo"
      style="display:flex"
    >
      <div>
        <h2>Javascript</h2>
        <AceEditor
          ref="editor1"
          :value="jsonString"
        />
      </div>

      <div>
        <h2>Javascript (binding)</h2>
        <AceEditorJson
          :value="json.value"
          @update:valid="json.valid = $event"
          @update:annotations="json.annotations = $event"
          @input="json.new = $event"
        />
        <p>Valid: {{ json.valid }}</p>
        <p>Output: {{ json.new }}</p>
        <p>Annotations: {{ json.annotations }}</p>
      </div>

      <div>
        <h2>HTML</h2>
        <AceEditor
          mode="html"
          :value="html.value"
          @update:annotations="html.annotations = $event"
        />
      </div>
    </div>

    <div class="ace_editor_demo__row">
      <h2>Themes</h2>
      <div
        v-for="(theme,index) in themes"
        :key="index"
      >
        <h2>{{ theme }}</h2>
        <AceEditor
          mode="html"
          :theme="theme"
          :value="html.value"
          @update:annotations="html.annotations = $event"
        />
      </div>
    </div>
  </div>
</template>

<style>
.ace_editor_demo > div { width: 100%;}

.ace_editor_demo__row { display:flex; flex-wrap: wrap; }
</style>
