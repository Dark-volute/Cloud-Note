<template>
  <section class="container">
    <m-aside></m-aside>
    <div class='trash-list'>
      <div class="recover" v-if="selected_Id">
        <m-button @click='recoverNote'>恢复笔记</m-button>
        <m-button @click='deleteNote'>彻底删除</m-button>
      </div>
      <ul class='list'>
        <li v-for='(item, index) in notes' :key='item.id' @click=selectNote(item,index) :class='{active:active === index}'>
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
  export default {
    async fetch({ app, store, params }) {
    },
    async asyncData({ app }) {
      const result = await app.$axios.get('/note',{
        params: {isTrashed:1}
      })
      const selected_Id = (result.data && result.data.length > 0) ? result.data[0].id : null
      return {
        notes: result.data,
        selected_Id
      }
    },
    data() {
      return {
        active: 0,
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
      selectNote(item, index) {
        this.active = index
        this.selected_Id = item.id
      },
      recoverNote() {
        console.log(this.selected_Id)
            this.$axios.patch(`/note/trashOrRecover/${this.selected_Id}`,{isTrashed:0}).then(res => {
          })
      },
      deleteNote() {
        this.$confirm('确认彻底删除?').then(() => {
          this.$axios.delete(`/note/delete/${this.selected_Id}`).then(res => {
            if (res.code === 0) this.initNotes()
          })
        })
      },
    },
    mounted() {},
    components: { mAside, mButton }
  }
</script>

<style lang='scss'>
  .trash-list {
    flex-basis: 100%;
    .recover {
      padding-bottom: 20px;
      border-bottom: 1px solid #ccc;
    }
    padding:20px;
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
      width:180px;
      border-radius: 4px;
      &.active {
        border: 1px solid #727abd;
      }
      .title {
        display: flex;
        justify-content: space-between;
        margin-bottom: 5px;
      }
      time{
        display: inline-block;
        margin-bottom: 10px;
        color:#ccc;
        font-size: 12px;
      }
      .content {
        max-width: 200px;
        word-wrap: break-word;
      }
    }
  }

</style>

