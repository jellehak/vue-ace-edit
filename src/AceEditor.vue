<script>
export default {
  props: {
    value: { type: [Object, String], default: '' },
    mode: {
      type: String,
      // https://github.com/ajaxorg/ace/tree/master/lib/ace/mode
      default: 'javascript'
    },
    theme: {
      type: String,
      // https://github.com/ajaxorg/ace/tree/master/lib/ace/theme
      default: 'twilight'
    },
    minHeight: { type: Number, default: 200 },
    options: { type: Object,
      default: () => ({
      // selectionStyle: 'text',
      // maxLines: 30,
        wrap: true,
        autoScrollEditorIntoView: true
      })
    }
  },

  data: vm => ({
    disableWatcher: null
  }),

  mounted () {
    const { ace } = window

    // Watchers
    this.$watch('value', newValue => {
      if (this.disableWatcher) return

      // console.log('Value change')
      this.setValue()
    })

    const editor = ace.edit(this.$refs.editor, {
      // mode: 'ace/mode/javascript',
      mode: `ace/mode/${this.mode}`,
      ...this.options
    })

    editor.setTheme(`ace/theme/${this.theme}`)

    // Tell Vue
    this.editor = editor

    // Set initial value
    this.setValue()

    // Then add change handler
    editor.on('change', this.onChange)
    // editor.getSession().on('change', this.onChange)

    // Based on https://stackoverflow.com/questions/9506154/determine-if-javascript-syntax-is-valid-in-change-handler-of-ace
    editor.on('changeMode', () => {
      // session.$worker is available when 'changeMode' event triggered
      // You could subscribe worker events here, whatever changes to the
      // content will trigger 'error' or 'ok' events.

      // console.log('cool')
      // editor.$worker.on('error', ko)
      // editor.$worker.on('ok', ok)
      const handle = (e) => {
        const { data } = e
        // console.log('update:annotations', e)

        this.$emit('update:annotations', data)
        this.$emit('update:valid', data.length === 0)
      }

      const session = editor.getSession()
      session.$worker.on('annotate', handle)
      session.$worker.on('terminate', handle)
    })
  },

  methods: {
    setValue () {
      // https://stackoverflow.com/questions/18614169/set-value-for-ace-editor-without-selecting-the-whole-editor
      //      You can use the second parameter to control cursor position after setValue
      // editor.setValue(str, -1) // moves cursor to the start
      // editor.setValue(str, 1) // moves cursor to the end
      this.editor.setValue(this.value)
    },

    onChange (e) {
      this.disableWatcher = true
      // Tell parent
      this.$emit('input', this.editor.getValue())

      this.$nextTick(() => {
        this.disableWatcher = false
      })
    }
  }
}
</script>

<template>
  <div ref="editor" class="aceeditor" :style="`min-height:${minHeight}px`" />
</template>

<style>
.aceeditor {
  width: 100%;
  min-width: 200px;
  /* Fit to height */
  /* height:inherit!important; */
}
</style>
