<template>
    <div>
    <div class='m-confirm' v-show='visible'>
        <div class='m-confirm--container'>
            <div class='header'>
                <span>{{title}}</span>
                <span class='close' @click='handleAction("cancel")'>x</span>
            </div>
            <div class='body'>
                {{message}}
            </div>
            <div class='footer'>
                <button class="cancel" @click='handleAction("cancel")'>取消</button>
                <button class="confirm" @click='handleAction("success")'>确认</button>
            </div>
        </div>
    </div>
        <div class="m-modal" v-show='visible'></div>
    </div>
</template>

<script>

    export default {
        name: 'mConfirm',
        data() {
            return {
                visible: false
            }
        },
        mounted() {
            this.onRouteChange()
            this.localScroll()

        },
        methods: {
            handleAction(type) {
                type === 'success' ? this.success() : this.cancel()
                this.canScroll()
            },
            onRouteChange(){
                const remove = () => {
                    this.handleAction()
                }
                window.addEventListener('hashchange', remove);
                window.addEventListener('popstate', remove);
                window.addEventListener('pagehide', remove);
            },
            localScroll(){
                document.documentElement.style.overflowY = 'hidden'
            },
            canScroll(){
                document.documentElement.style.overflowY = 'scroll';
            }
        },
        beforeDestroy() {
            this.canScroll()
            this.$el.remove()
        },
    }
</script>

<style lang='scss'>
.m-confirm{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #eee;
  box-sizing: border-box;
  z-index: 99;
  background: #fff;
  border-radius: 4px;
  &--container {
    padding: 10px;
    width: 300px;
    .header{
      display: flex;
      justify-content: space-between;
      .close{
        cursor: pointer;
        font-size: 16px;
      }
    }
    .body {
      padding: 10px 0 40px 0;
    }
    .footer {
      display: flex;
      justify-content: flex-end;
      button{
        outline: none;
        padding:.5em 1em;
        border: none;
        background: #fff;
        border-radius: 4px;
        cursor: pointer;
      }
      .confirm {
        background: #409eff;
        color: #fff;
        border: 1px solid #409eff;
        margin-left: 6px;
      }
      .cancel{
        border: 1px solid #eee;
      }
    }
  }
}

.m-modal{
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  border-bottom: 0;
  width: 100%;
  height: 100%;
  opacity: .5;
  background: #000;
  z-index: 98;
}
</style>
