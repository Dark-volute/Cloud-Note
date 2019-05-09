import Alert from './message.vue'
import Vue from 'vue'

let instance

let s = 0

const initInstance = function(opts){
  instance = new Vue({
    render(h) {
      return h(Alert, {
        props: opts
      })
    }
  }).$mount()
  document.body.appendChild(instance.$el)
  return instance.$children[0]
}

function createAlert(opts) {
  const alert = initInstance(opts)
    alert.type = opts.type || 'success'
    alert.add({
      content:  alert.text || '请输入提示文字'
  })
}

createAlert.success = function(content){
  const alert = initInstance()
  alert.type = 'success'
  alert.add({
    content
})
}

createAlert.error = function(content){
  const alert = initInstance()
  alert.type = 'error'
  alert.add({
    content
})
}


Vue.prototype.$message = createAlert

