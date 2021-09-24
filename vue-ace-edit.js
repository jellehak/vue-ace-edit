/**
 * VueAceEdit
 * @version: latest
 * @param {*} url
 * @returns
 */

const loadScript = (url = '') => {
  return new Promise(function (resolve, reject) {
    const head = document.getElementsByTagName('head')[0]
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.addEventListener('load', function () {
      resolve(script)
    })
    script.src = url
    head.appendChild(script)
  })
}

const AceResolver = {
  props: {
    path: { type: String, default: 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12' }
  },

  async mounted () {
    const { path } = this

    if (!window.ace) {
      await loadScript(`${path}/ace.min.js`)
    }

    const { ace } = window
    ace.config.set('basePath', path)

    // Tell parent
    this.$emit('ready', ace)
  },

  render (_c) {
    return _c('div')
  }
}

export const AceEditor = {
  components: {
    AceResolver
  },

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
    options: {
      type: Object,
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
    // Watchers
    this.$watch('value', newValue => {
      if (this.disableWatcher) return

      this.setValue(newValue)
    })
  },

  created () {
    let editor

    this.ready = (ace) => {
      editor = ace.edit(this.$refs.editor, {
        // mode: 'ace/mode/javascript',
        mode: `ace/mode/${this.mode}`,
        ...this.options
      })

      editor.setTheme(`ace/theme/${this.theme}`)

      // Set initial value
      this.setValue(this.value)

      // Then add change handler
      editor.on('change', this.onChange)

      // Based on https://stackoverflow.com/questions/9506154/determine-if-javascript-syntax-is-valid-in-change-handler-of-ace
      editor.on('changeMode', () => {
        // session.$worker is available when 'changeMode' event triggered
        // You could subscribe worker events here, whatever changes to the
        // content will trigger 'error' or 'ok' events.

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

      // Tell parent
      this.$emit('ready', ace)
    }

    this.setValue = (value) => {
      if (!editor) {
        console.warn('Editor not ready')
        return
      }
      // https://stackoverflow.com/questions/18614169/set-value-for-ace-editor-without-selecting-the-whole-editor
      //      You can use the second parameter to control cursor position after setValue
      // editor.setValue(str, -1) // moves cursor to the start
      // editor.setValue(str, 1) // moves cursor to the end
      editor.setValue(value)
      editor.clearSelection() // This will remove the highlight over the text
    }

    this.onChange = (e) => {
      this.disableWatcher = true
      // Tell parent
      this.$emit('input', editor.getValue())

      this.$nextTick(() => {
        this.disableWatcher = false
      })
    }
  },

  render (_c) {
    const _vm = this

    return _c(
      'div',
      {
        ref: 'editor',
        staticClass: 'aceeditor',
        style: 'min-height:' + _vm.minHeight + 'px'
      },
      [_c('AceResolver', { on: { ready: _vm.ready } })],
      1
    )
  }
}

export const AceEditorJson = {
  props: {
    value: { type: [Object, Array], default: () => {} }
  },

  data: vm => ({
    valueStringified: '',
    disableInputEmit: null // Protect against loops
  }),

  created () {
    // Detect incoming change
    this.$watch('value',
      (newValue) => {
        // Protect against loops
        if (this.disableInputEmit) {
          return
        }

        // Detect change
        this.disableInputEmit = true

        this.format()

        this.$nextTick(function () {
          this.disableInputEmit = false
        })
      }, {
        immediate: true,
        deep: true
      })
  },

  methods: {
    onInput (newValue = '') {
      // Protect against loops
      if (this.disableInputEmit) {
        return
      }

      try {
        this.disableInputEmit = true
        const parsed = JSON.parse(newValue)
        // Tell parent
        this.$emit('input', parsed)
      } catch (err) {
        // Parse failed

        // Tell parent
        this.$emit('fail', err)
      }

      this.$nextTick(function () {
        this.disableInputEmit = false
      })
    },
    format () {
      this.valueStringified = JSON.stringify(this.value, null, 2)
    }
  },

  render (_c) {
    const _vm = this

    return _c('AceEditor', {
      ref: 'editor',
      attrs: { mode: 'json', value: _vm.valueStringified },
      on: { input: _vm.onInput }
    })
  }
}
