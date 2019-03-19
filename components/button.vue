<template>
    <button
            class='m-button'
            :class="[`icon-${iconPosition}`, disabled ? 'm-button--disabled': '']"
            @click="$emit('click')"
            :disabled="disabled">
        <!-- <m-icon class='icon' v-if='icon && !loading' :name='icon'></m-icon>
        <m-icon class='loading icon' v-if='loading' name='loading'></m-icon> -->
        <div class='m-button-content'>
            <slot></slot>
        </div>
    </button>
</template>
<script>

    export default {
        name: 'mButton',
        props: {       
            icon: {},
            loading: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            iconPosition: {
                type: String,
                default: 'left',
                validator(value) {
                    return !(value !== 'left' && value !== 'right')
                }
            },
        }
    }
</script>
<style lang='scss'>
.m-button {

  font-size: 14px;
  height: 2em;
  padding: 0 1em;
  border-radius: 4px;
  border: 1px solid #727abd;
  background: #727abd;
  color:#fff;

  cursor: pointer;
}



</style>
