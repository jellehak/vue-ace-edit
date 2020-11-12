<script>

import {
  loadScript
  // loadStylesheet
} from './utils'

export default {
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
  }
}
</script>

<template>
  <div />
</template>
