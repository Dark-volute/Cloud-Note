<template>
<transition name="fade">
    <div v-show='visible'>
    <div class='m-layer'>
        <slot></slot>
    </div>
        <div class="m-shade"></div>
    </div>
</transition>
</template>
<script>
export default {
  name: 'mLayer',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  mounted() {
    document.addEventListener('keydown', (e)=>{
      if(27 == e.keyCode) {
        this.$parent.visible = false
      }
    })
  },
  methods: {}
}
</script>

<style lang='scss'>
.fade-enter-active, .fade-leave-active {
  transition: opacity .1s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.m-layer {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
  width:100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.m-shade {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  border-bottom: 0;
  width: 100%;
  height: 100%;
  opacity: 0.8;
  background: #fff;
  z-index: 98;
}
</style>
