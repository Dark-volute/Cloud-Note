<template>
  <section class="container">
    <m-aside></m-aside>
      <div class='note-list' :class={animate:editing}>
        <div class='header'>
          <div class='row'>
              <h3>全部笔记 <i @click='selectBook' class='iconfont icon-arrow-bottom'></i></h3>
              <i @click='addNote' class='iconfont icon-add-note' style='color:#311abf;font-size:24px'></i>
          </div>
          <ul>
            <li v-for='item in books'>{{item.bookname}}</li>
          </ul>
          <div class='row'>
            <h6>2条笔记</h6>
            <span>选项</span>
          </div>
        </div>
         <ul class='list' ref="list">
            <li :ref='item.id' v-for='(item, index) in notes' :key='item.id' @click=selectNote(item) :class='{active:currentNote.id === item.id}'>
              <div class='title'>
                <h4>{{item.title}}</h4>
                <span @click='deleteNote(item.id,index)'><i class='iconfont icon-trash'></i></span>
              </div>
              <time>{{item.update_date | timestampToDate}}</time>
               <div class='content' v-html='substr(item.content)'></div>
            </li>
          </ul>
      </div>
      <div class='editor'>
        <div class='header'>
          <div class='left'>
            <i class='iconfont icon-notebook'></i>
            <span>笔记本</span>
            <i class='iconfont icon-tag'></i>
            <input type='text' placeholder="标题"  v-model='noteEditing.title'/>
          </div>
           <div class='right'>
             <m-button @click='saveNote' v-show='editing'>完成</m-button>
             <m-button @click='editing=false' v-show='editing'>取消</m-button>
             <i class='iconfont icon-clock'></i>
            <i class='iconfont icon-star'></i>
             <i class='iconfont icon-trash'></i>
             <i class='iconfont icon-extend'></i>
          </div>
        </div>
         <div class="quill-editor"
         :content="noteEditing.content"
         @change="onEditorChange($event)"
         @blur="onEditorBlur($event)"
         @focus="onEditorFocus($event)"
         @ready="onEditorReady($event)"
         v-quill:myQuillEditor="editorOption">
    </div>
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
    const books = await app.$axios.get('/notebook')
    const notes = await app.$axios.get('/note',{
      params: {isTrashed:0}
    })

    let noteEditing = {}
    if (notes.data && notes.data.length > 0) {
      const { title, content, id } = notes.data[0]
      noteEditing = {
        title,
        content,
        id
      }
    }
    return {
      notes: notes.data,
      noteEditing: {},
      books: books.data
    }
  },
  data() {
    return {
      editing: false,
      editorOption: {
        // some quill options
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block']
          ]
        }
      }
    }
  },
  created() {
    this.noteEditing = {...this.currentNote}
  },
  mounted(){
    const currentNote = this.$refs[this.currentNote.id]
    var currentNoteOffsetTop = currentNote && currentNote[0].offsetTop

    const list = this.$refs.list
    var listOffsetTop = list && list.offsetTop

    list.scrollTop = currentNoteOffsetTop - listOffsetTop
  },
  computed: {
    substr(val) {
      return function(val) {
        return val && val.length > 20 ? val.substr(0, 20) + '...' : val
      }
    },
    currentNote(){
      return this.$store.state.currentNote
    }
  },
  methods: {
    async initNotes() {
      let res = await this.$axios.get('/note',{
        params: {isTrashed:0}
      })
      this.notes = res.data

      let result = res.data.find((v,idx) => {
        if(this.noteEditing.id === v.id){
          this.active = idx
          return true
        }
      })
      if (result) {
        this.noteEditing = {
          title: result.title,
          content: result.content,
          id: result.id
        }
      }
    },
    selectBook(){
    },
    selectNote(item) {
      this.$store.dispatch('setCurrentNote',item)
      const { title, content, id } = item
      this.noteEditing = {
        title,
        content,
        id
      }
    },
    addNote() {
      this.editing = true
      this.noteEditing = {
          title: '',
          content: '',
          id:  ''
      }
    },
    deleteNote(id) {
      this.$confirm('确认删除?').then(() => {
        this.$axios.patch(`/note/trashOrRecover/${id}`,{isTrashed:1}).then(res => {
          if (res.code === 0) this.initNotes()
        })
      })
    },
    saveNote() {
      this.$axios.post('/note/create', this.noteEditing).then(res => {
        if (res.code === 0) {
          this.editing = false
          this.noteEditing.id = res.data.id
          this.initNotes()
        }
      })
    },
    onEditorReady(){},
    onEditorBlur(editor) {},
    onEditorFocus(editor) {},
    onEditorChange({ editor, html, text }) {
      this.noteEditing.content = html
       if (this.noteEditing.id) {
        this.$axios
          .patch(`/note/update/${this.noteEditing.id}`, this.noteEditing)
          .then(res => {
            this.initNotes()
          })
      }
    }
  },
  components: { mAside, mButton }
}
</script>

<style lang='scss'>

.container {
  display: flex;
  height: 100%;
  .note-list {
    flex-basis: 300px;
    min-width: 300px;
    transition: min-width .4s, flex-basis .4s, transform .4s;
    z-index: 0;
    &.animate{
       opacity: 0;
       transform: translateX(-300px);
       min-width: 0px;
       flex-basis: 0px;
    }
    .header {
      padding: 20px 20px 10px 20px;
      border-bottom: 1px solid #ccc;
      display: flex;
      flex-wrap: wrap;
      align-content: space-between;
      height: 100px;
      .row {
        flex-basis: 100%;
        display: flex;
        justify-content: space-between;
      }
      h3 {
        color: #311abf;
      }
    }
    .list {
      overflow-y: scroll;
      height: calc(100% - 100px);
      &::-webkit-scrollbar {
        display: none;
      }
    }
    .list li {
      box-sizing: border-box;
      cursor: pointer;
      padding: 20px 20px 40px 20px;
      justify-content: space-between;
      border: 1px solid #fff;
      height: 140px;
      &.active {
        border: 1px solid #727abd;
      }
      &:hover {
        background: #727abd;
        color: #fff;
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
  .editor {
    flex-basis: 100%;
    display: flex;
    flex-direction: column;
    .header {
      display: flex;
      justify-content: space-between;
      border-left: 1px solid #ccc;
      padding: 10px 20px;
    }
  }
}
</style>
