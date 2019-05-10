<template>
  <section class="container">
    <m-aside></m-aside>
      <div class='note-list' :class={animate:editing}>
        <div class='header'>
          <div class='row'>
              <m-popover position="bottom">
              <h3>{{currentBook.name}} <i class='iconfont icon-arrow-bottom'></i></h3>
               <template slot="content">
                 <ul>
                   <li @click='selectBook()'>全部笔记</li>
                    <li @click='selectBook(book)' v-for='book in books' :key='book.id'>{{book.bookname}}</li>
                </ul>   
               </template>
             </m-popover>
              <i @click='addNote' class='iconfont icon-add-note' style='color:#311abf;font-size:24px'></i>
          </div>
      <div class='row'>
         <h6>2条笔记</h6>
       <m-popover position="bottom">
        <span>选项 <i class='iconfont icon-arrow-bottom'></i></span>
         <template slot="content">
           <ul class='sort-list'>
             <li @click='sort("update_date")'>按更新日期排序(最早)</li>
             <li @click='sort("update_date","DESC")'>按更新日期排序(最新)</li> 
             <li @click='sort("create_date")'>按创建日期排序(最早)</li> 
             <li @click='sort("create_date","DESC")'>按创建日期排序(最新)</li> 
           </ul>   
         </template>
        </m-popover>
        
          </div>
        </div>
         <ul class='list' ref="list">
            <li :ref='item.id' v-for='(item, index) in notes' :key='item.id' @click=selectNote(item) :class='{active:currentNote.id === item.id}'>
              <div class='title'>
                <h4>{{item.title}}</h4>
                <span @click='deleteNote(item.id,index)'><i class='iconfont icon-trash'></i></span>
              </div>
              <time>{{item.create_date | timestampToDate}}</time>
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
            <input type='text' 
            placeholder="标题"  
            v-model='noteEditing.title'
            @change='updateNote'/>
          </div>
           <div class='right'>
             <m-button @click='saveNote' v-show='editing'>保存</m-button>
             <m-button @click='cancelEditing' v-show='editing'>取消</m-button>
             <i class='iconfont icon-clock'></i>
            <i class='iconfont icon-star'></i>
             <i class='iconfont icon-trash' @click='deleteNote(noteEditing.id)'></i>
             <i class='iconfont icon-extend' @click='enterFullScreen'></i>
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
import mPopover from '@/components/popover.vue'
import mAside from '@/components/aside.vue'
import mButton from '@/components/button.vue'
import '@/components/confirm/confirm.js'
import '@/components/message/message.js'
export default {
  async fetch({ app, store, params }) {},
  async asyncData({ app }) {
    const books = await app.$axios.get('/notebook')
    const notes = await app.$axios.get('/note', {
      params: { isTrashed: 0 }
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
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block']
          ]
        }
      },
      currentBook:{
        id: null,
        name:'全部笔记'
      }
    }
  },
  created() {
    this.noteEditing = { ...this.currentNote }
  },
  mounted() {
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
    currentNote() {
      return this.$store.state.currentNote
    }
  },
  methods: {
    sort(type, sort) {
      this.notes.sort(
        (a, b) => (sort === 'DESC' ? b[type] - a[type] : a[type] - b[type])
      )
    },
    enterFullScreen() {
      var de = document.documentElement
      if (de.requestFullscreen) {
        de.requestFullscreen()
      } else if (de.mozRequestFullScreen) {
        de.mozRequestFullScreen()
      } else if (de.webkitRequestFullScreen) {
        de.webkitRequestFullScreen()
      } else {
        alert('该浏览器不支持全屏')
      }
    },
    async initNotes() {
      let res = await this.$axios.get('/note', {
        params: { isTrashed: 0 }
      })
      this.notes = res.data

      let result = res.data.find((v, idx) => {
        if (this.noteEditing.id === v.id) {
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
    async selectBook(book) {
      if(!book) {
        this.currentBook = {
          name: '全部笔记',
          id:''
        }
        this.initNotes()
        return
      }
      this.currentBook.name = book.bookname
      this.currentBook.id = book.id
      const res = await this.$axios.get(`/note/${book.id}`)
      this.notes = res.data
    },
    selectNote(item) {
      this.$store.dispatch('setCurrentNote', item)
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
        id: ''
      }
    },
    cancelEditing() {
      this.editing = false
      this.noteEditing = {
        title: '',
        content: '',
        id: ''
      }
    },
    deleteNote(id) {
      if (!id) return
      this.$confirm('确认删除?').then(() => {
        this.$axios
          .patch(`/note/trashOrRecover/${id}`, { isTrashed: 1 })
          .then(res => {
            if (res.code === 0) this.initNotes()
          })
      })
    },
    saveNote() {
      if(! this.noteEditing.notebookId) this.noteEditing.notebookId = this.currentBook.id
      this.$axios.post('/note', this.noteEditing).then(res => {
        if (res.code === 0) {
          this.editing = false
          this.noteEditing.id = res.data.id
          this.notes.push(res.data)
        } else {
          this.$message.error(res.message)
        }
      })
    },
    updateNote() {
      if (this.noteEditing.id) {
        this.$axios
          .patch(`/note/${this.noteEditing.id}`, this.noteEditing)
          .then(res => {
            this.initNotes()
          })
      }
    },
    onEditorReady() {},
    onEditorBlur(editor, html) {},
    onEditorFocus(editor) {},
    onEditorChange({ editor, html, text }) {
      if (html !== this.noteEditing.content) {
        this.updateNote()
      }
      this.noteEditing.content = html
    }
  },
  components: { mAside, mButton, mPopover }
}
</script>

<style lang='scss'>
.sort-list {
  padding: 20px 0;
  li {
    margin-bottom: 10px;
  }
}
.container {
  display: flex;
  height: 100%;
  .note-list {
    flex-basis: 300px;
    min-width: 300px;
    transition: min-width 0.4s, flex-basis 0.4s, transform 0.4s;
    &.animate {
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
  .editor {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    height: calc(100% - 90px);
    .header {
      display: flex;
      justify-content: space-between;
      border-left: 1px solid #ccc;
      padding: 15px 20px;
    }
  }
}
</style>
