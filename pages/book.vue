<template>
<div class='books'>
    <m-aside></m-aside>
    <div class='container-right'>
        <div class="add-book">
            <m-button @click='addbook'>添加笔记本</m-button>
        </div>
        <ul class='book-list'>
            <li v-for='item in books' :key='item.id' >
              <div>
                <i class='iconfont icon-notebook'></i>
                <span>{{item.bookname}}</span>
                <span class='describe'>{{item.isDefault ? '默认' : ''}} {{item.describe}}</span>
                </div>
                <span @click='deleteBook(item.id)'>x</span>
            </li>
        </ul>
    </div>
    <m-layer :visible='visible' class='layer'>
            <h2>添加笔记</h2>
            <div class='book-describe'>
                <input placeholder="笔记名" v-model='bookname'>
                <input placeholder="描述" v-model='describe'>
            </div>
            <div class='btns'>
                <m-button @click='visible = false'>取消</m-button>
                <m-button @click='createbook'>创建</m-button>
            </div>
    </m-layer>
</div>

</template>
<script>
import mAside from '@/components/aside.vue'
import mLayer from '@/components/layer/layer.vue'
import mButton from '@/components/button.vue'
export default {
  components: { mAside, mLayer, mButton },
  async asyncData({ app }) {
    let res = await app.$axios.get('/notebook')
    return {
      books: res.data
    }
  },
  data() {
    return {
      visible: false,
      describe: '',
      bookname: ''
    }
  },
  methods: {
    addbook() {
      this.visible = true
    },
    async getBooks(){
        let res = await this.$axios.get('/notebook')
        this.books = res.data;
    },
    createbook() {
      this.$axios
        .post('/notebook', {
          describe: this.describe,
          bookname: this.bookname
        })
        .then(res => {
          this.visible = false;
          this.getBooks()
        })
    },
    deleteBook(id) {
      this.$axios.delete(`/notebook/${id}`).then(res => {
            this.getBooks()
      })
    }
  }
}
</script>

<style lang="scss">
.books {
  height: 100%;
  display: flex;
  .container-right {
    flex: auto;
  }
  .add-book {
    padding: 20px;
    border-bottom: 1px solid #ccc;
  }
  .book-list {
    padding: 40px;
    li {
      cursor: pointer;
      margin-bottom: 20px;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      display: flex;
      justify-content: space-between;
    }
    .describe {
      font-size: 12px;
      color: #ccc;
    }
  }
  .layer {
    h2 {
      margin-bottom: 40px;
    }
  }
  .book-describe {
    margin-bottom: 40px;
    input {
      display: block;
      height: 30px;
      width: 100px;
    }
  }
}
</style>


