<template>
  <section class="container">
    <m-aside></m-aside>
      <div class='note-list'>
        <div class='header'>
          <div class='row'>
              <h3>全部笔记</h3>
              <i class='iconfont icon-add-note' style='color:#311abf;font-size:24px'></i>
          </div>
          <div class='row'>
            <h6>2条笔记</h6>
            <span>选项</span>
          </div>
        </div>
         <ul class='list'>
            <li>1</li>
             <li class='active'>2</li>
          </ul>
      </div>
      <div class='editor'>
        <div class='header'>
          <div class='left'>
            <i class='iconfont icon-notebook'></i>
            <span>笔记本</span>
            <i class='iconfont icon-tag'></i>
             <span>添加标签</span>
          </div>
           <div class='right'>
             <i class='iconfont icon-clock'></i>
            <i class='iconfont icon-star'></i>
             <i class='iconfont icon-trash'></i>
              <i class='iconfont icon-extend'></i>  
          </div>
        </div>
         <div class="quill-editor" 
         :content="content"
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
export default {
  async asyncData({ app }) {
  }, 
  data() {
    return {
      content: '<p>I am Example</p>',
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
  methods: {
    onEditorBlur(editor) {
      console.log('editor blur!', editor)
    },
    onEditorFocus(editor) {
      console.log('editor focus!', editor)
    },
    onEditorReady(editor) {
      console.log('editor ready!', editor)
    },
    onEditorChange({ editor, html, text }) {
      console.log('editor change!', editor, html, text)
      this.content = html
    }
  },
  mounted() {},
  components: {mAside}
}
</script>

<style lang='scss'>
.container {
  display: flex;
  height: 100%;
  .note-list {
    flex-basis: 400px;
    .header {
      margin-bottom: 20px;
      padding: 20px 20px 10px 20px;
      border-bottom: 2px solid #ccc;
      display: flex;
      flex-wrap: wrap;
      align-content: space-between;
      height:100px;
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
      padding: 0 20px;
    }
    .list li {
      padding: 10px;
      &.active {
      }
    }
  }
  .editor {
    flex-basis: calc(100% - 460px);
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
