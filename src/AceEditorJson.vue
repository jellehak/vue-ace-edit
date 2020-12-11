<script>
export default {
  props: {
    value: { type: [Object, Array], default: () => {} }
  },

  data: vm => ({
    valueStringified: '',
    disableInputEmit: null // Protect against loops
  }),

  watch: {
    // Detect incoming change
    value (newValue) {
      // Protect against loops
      if (this.disableInputEmit) {
        return
      }

      // Detect change
      this.disableInputEmit = true
      // console.log('Change', newValue)
      this.format()
      this.$nextTick(function () {
        this.disableInputEmit = false
      })
    }
  },

  created () {
    this.format()
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
        // console.warn(err)
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
  }
}
</script>

<template>
  <AceEditor
    ref="editor"
    mode="json"
    :value="valueStringified"
    @input="onInput"
  />
</template>
