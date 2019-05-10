<template>
  <section class="container">
    <m-aside></m-aside>
    <div class='trash-list'>
      <div class="recover" v-if="selected_Id">
        <m-button @click='recoverNote'>恢复笔记</m-button>
        <m-button @click='deleteNote'>彻底删除</m-button>
      </div>
      <ul class='list'>
        <li 
        v-for='(item, index) in notes' 
        :key='item.id' 
        @click=selectNote(item,index) 
        :class='{active:active === index}'
        @mousedown='mousedown(item,$event)' 
        @mousemove='mousemove(item,$event)'
        @mouseleave='mouseup(item,$event)'>
          <div class='title'>
            <h4>{{item.title}}</h4>
            <span @click.stop='recoverNote(item.id,index)'></span>
          </div>
          <time>{{item.update_date | timestampToDate}}</time>
          <div class='content' v-html='substr(item.content)'></div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import mAside from '@/components/aside.vue'
import mButton from '@/components/button.vue'
import '@/components/confirm/confirm.js'

let posLeft
let posTop
let current

export default {
  async fetch({ app, store, params }) {},
  async asyncData({ app }) {
    const result = await app.$axios.get('/note', {
      params: { isTrashed: 1 }
    })
    const selected_Id =
      result.data && result.data.length > 0 ? result.data[0].id : null
    return {
      notes: result.data,
      selected_Id
    }
  },
  data() {
    return {
      active: 0
    }
  },
  computed: {
    substr(val) {
      return function(val) {
        return val && val.length > 20 ? val.substr(0, 20) + '...' : val
      }
    }
  },
  methods: {
    mousedown(item, e) {
      e = e || event
      current = e.currentTarget
      posLeft = e.currentTarget.getBoundingClientRect().left
      posTop= e.currentTarget.getBoundingClientRect().top
      this.isMoving = true
      //获取元素距离定位父级的x轴及y轴距离
      this.x0 = e.currentTarget.offsetLeft
      this.y0 = e.currentTarget.offsetTop
      //获取此时鼠标距离视口左上角的x轴及y轴距离
      this.x1 = e.clientX
      this.y1 = e.clientY
      //按下鼠标时，表示正在运动
      this.isMoving = true
      //鼠标按下时，获得此时的页面区域
      this.L0 = 0
      this.R0 = document.documentElement.clientWidth
      this.T0 = 0
      this.B0 = document.documentElement.clientHeight
      //鼠标按下时，获得此时的元素宽高
      this.EH = e.currentTarget.offsetHeight
      this.EW = e.currentTarget.offsetWidth
      e.currentTarget.style.top =posTop + 'px'
      e.currentTarget.style.left =  posLeft + 'px'
      e.currentTarget.classList.add('dropStyle')
    },
    mousemove(item, e) {
      //如果没有触发down事件，而直接触发move事件，则函数直接返回
      if (!this.isMoving) {
        return
      }
      e = e || event
      //获取此时鼠标距离视口左上角的x轴及y轴距离
      var x2 = e.clientX
      var y2 = e.clientY

      //计算此时元素应该距离视口左上角的x轴及y轴距离
      var X = this.x0 + (x2 - this.x1)
      var Y = this.y0 + (y2 - this.y1)
      /******磁性吸附*******/
      //获取鼠标移动时元素四边的瞬时值
      var L = X
      var R = X + this.EW
      var T = Y
      var B = Y + this.EH
      //在将X和Y赋值给left和top之前，进行范围限定。只有在范围内时，才进行相应的移动
      //如果到达左侧的吸附范围，则left置L0
      if (L - this.L0 < 10) {
        X = this.L0
      }
      //如果到达右侧的吸附范围，则left置为R0
      if (this.R0 - R < 10) {
        X = this.R0 - this.EW
      }
      //如果到达上侧的吸附范围，则top置T0
      if (T - this.T0 < 10) {
        Y = this.T0
      }
      //如果到达下侧的吸附范围，则top置为B0
      if (this.B0 - B < 10) {
        Y = this.B0 - this.EH
      }

      //将X和Y的值赋给left和top，使元素移动到相应位置
      e.currentTarget.style.left = X + 'px'
      e.currentTarget.style.top = Y + 'px'
    },
    mouseup(item, e) {
     
    },
    selectNote(item, index) {
      // this.active = index
      // this.selected_Id = item.id
    },
    recoverNote() {
      console.log(this.selected_Id)
      this.$axios
        .patch(`/note/trashOrRecover/${this.selected_Id}`, { isTrashed: 0 })
        .then(res => {})
    },
    deleteNote() {
      this.$confirm('确认彻底删除?').then(() => {
        this.$axios.delete(`/note/${this.selected_Id}`).then(res => {
          if (res.code === 0) this.initNotes()
        })
      })
    }
  },
  mounted() {
    document.addEventListener('mouseup',(e)=>{
      this.isMoving = false
      current.style.top = posTop + 'px'
      current.style.left =  posLeft + 'px'
      current.classList.remove('dropStyle')
    })
  },
  beforeDestroy() {
  },
  components: { mAside, mButton }
}
</script>

<style lang='scss'>
.dropStyle {
  position: absolute;
  z-index: 996;
  background: #ccc;
  color: #fff;
  opacity: 0.8;
}
.container {
  position: relative;
}
.trash-list {
  flex-basis: 100%;
  .recover {
    padding-bottom: 20px;
    border-bottom: 1px solid #ccc;
  }
  padding: 20px;
  .list {
    display: flex;
    flex-wrap: wrap;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .list li {
    box-sizing: border-box;
    cursor: pointer;
    padding: 20px 20px 40px 20px;
    margin: 10px 10px 10px 0;
    justify-content: space-between;
    border: 1px solid #ccc;
    height: 160px;
    width: 180px;
    border-radius: 4px;
    user-select: none;
    &.active {
      border: 1px solid #727abd;
    }
    .title {
      display: flex;
      justify-content: space-between;
      margin-bottom: 5px;
    }
    time {
      display: inline-block;
      margin-bottom: 10px;
      color: #ccc;
      font-size: 12px;
    }
    .content {
      max-width: 200px;
      word-wrap: break-word;
    }
  }
}
</style>

