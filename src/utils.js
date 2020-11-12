export const loadScript = (url = '') => {
  return new Promise(function (resolve, reject) {
    var head = document.getElementsByTagName('head')[0]
    var script = document.createElement('script')
    script.type = 'text/javascript'
    script.addEventListener('load', function () {
    //   this.removeEventListener('load', arguments.callee)
      resolve(script)
    })
    script.src = url
    head.appendChild(script)
  })
}

export const loadStylesheet = (url = '') => {
  var styles = document.createElement('link')
  styles.rel = 'stylesheet'
  styles.type = 'text/css'
  styles.media = 'screen'
  styles.href = url
  document.getElementsByTagName('head')[0].appendChild(styles)
}
