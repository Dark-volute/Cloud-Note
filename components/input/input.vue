<template>
    <div class='m-input_wrapper'>
        <input
        ref='input'
        class='m-input'  
        :class="[{error: validateState === 'error'},{'m-input-left-radius': append}]"
        :value='currentValue' 
        @input='handleInput' 
        @blur='handleBlur'
        :placeholder='placeholder'/>
       <p class='m-input-button' v-if='append'>
          <slot name='append'></slot>
       </p>
    </div>
</template>

<script>
import Emitter from '../emitter.js'
export default {
  name: 'mInput',
  mixins: [Emitter],

  inject: {
    mFormItem: {
      default: ''
    }
  },

  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      currentValue: '',
      append:false
    }
  },
  created(){
     this.currentValue = this.value
  },
  mounted(){
    if(this.$slots.append){
       this.append = true
    }
  },
  computed: {
    validateState() {
      return this.mFormItem.validateState
    }
  },
  watch: {
    value(val) {
      this.currentValue = val
    }
  },
  methods: {
    handleInput(e) {
      const value = event.target.value
      this.currentValue = value
      this.$emit('input', value)
      this.dispatch('mFormItem', 'on-form-change', value)
    },
    handleBlur() {
      this.dispatch('mFormItem', 'on-form-blur', this.currentValue)
    },
  }
}
</script>

<style lang="scss">
.m-input_wrapper{
   height: 30px;
   display: flex;
   width:100%;
}
.m-input {
  height: 30px;
  width:100%;
  border-radius: 4px;
  border: 1px solid #ccc;
  padding-left: 20px;
  transition: border 0.4s;
  &-left-radius {
      border-radius: 4px 0 0 4px;
      border-right: none;
  }
  &-right-radius {
      border-radius: 0 4px 4px 0;
  }
  &:focus {
    border: 1px solid #7568f3;
  }
  &-button{
    background: #7568f3;
    color:#fff;
    font-size: 12px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 0 4px 4px 0;
    width: 100px;
    cursor: pointer;
  }
}
</style>



