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

  watch: {
    value () {
      this.setValue()
    }
  },

  mounted () {
    const { ace } = window

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
      this.editor.setValue(this.value, 1)
    },

    onChange (e) {
      this.$emit('input', this.editor.getValue())
    }
  }
}
</script>

<template>
  <div ref="editor" class="aceeditor" :style="`min-height:${minHeight}px`">
    loading...
  </div>
</template>

<style>
.aceeditor {
  width: 100%;
  min-width: 200px;
  /* Fit to height */
  height:inherit!important;
}
</style>
