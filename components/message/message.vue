<template>
    <div class='m-message'>
        <transition name='slide-fade'>
            <div :class="[type ? `m-message--${type}` : '']" class='m-message--main' v-for='(item,index) in notices'
                 :key='index'>
                <span class='m-message--message'>{{item.content}}</span>
            </div>
        </transition>
    </div>
</template>

<script>
    let seed = 0

    function getUuid() {
        return 'alert' + seed++
    }
    export default {
        data() {
            return {
                notices: [],
            }
        },
        methods: {
            add(notice) {
                const name = getUuid()
                let _notice = {name: name, ...notice}
                this.notices.push(_notice)

                const duration = notice.duration || 1
                let timer = setTimeout(() => {
                    this.remove(name)
                    clearTimeout(timer)
                }, duration * 2000)
            },

            remove(name) {
                const notices = this.notices

                for (let i = 0; i < notices.length; i++) {
                    if (notices[i].name === name) {
                        this.notices.splice(i, 1)
                        break
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
$m-message--success: #f0f9eb;
$m-message--warning: #fdf6ec;
$m-message--danger: #fef0f0;
$m-success-color: #67c23a;
$m-primary-color: #409eff;
$m-warning-color: #e6a23c;
$m-danger-color: #f56c6c;


.m-message {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  top:20px;
  width: 380px;
  text-align: center;
  z-index: 99;
  &--main {
    padding: 10px 10px;
    background: #ccc;
    border-radius: 4px;
    display: flex;
    align-items: center;
  }
  &--icon{
    margin-right: 5px;
  }
  &--success{
    color: $m-success-color;
    background: $m-message--success;
    border-color: $m-success-color;
  }
  &--warning{
    color: $m-warning-color;
    background: $m-message--warning;
    border-color: $m-warning-color;
  }
  &--error{
    color: $m-danger-color;
    background: $m-message--danger;
    border-color: $m-danger-color;
  }
  .slide-fade-enter-active,.slide-fade-leave-active {
    transition: all .5s ease;
  }

  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateY(-40px);
    opacity: 0;
  }
}
</style>


