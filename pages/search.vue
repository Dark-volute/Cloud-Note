<template>
  <div class="search">
    <m-aside></m-aside>
    <div class='search-main'>
      <div class='search-bar'>
        <i class='iconfont icon-search'></i>
        <input class="search-input" type="text" @input="change" v-model="keyword" placeholder="搜索笔记">
      </div>
      <ul class="search-list" v-show="list && list.length > 0">
        <li  
        :key='item.id' 
        v-for="item in list" 
        v-html="item.content" 
        @click="search(item)"></li>
      </ul>
    </div>
  </div>
</template>

<script>
  import mAside from '@/components/aside.vue'
  export default {
    name: "search",
    components: {mAside},
    data(){
      return {
        list: [],
        keyword:''
      }
    },
    methods: {
      change(){
        this.$axios.get(`/search/${this.keyword}`).then(res => {
            this.list = res.data
        })
      },
      search(item){
        this.$store.dispatch('setCurrentNote',item)
        this.$router.push('/main')
      }
    }
  }
</script>

<style lang="scss">
  .search{
    height: 100%;
    display: flex;
    .search-main{
      flex-basis: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top:10%;
    }
    .search-bar{
      position: relative;
      .iconfont{
        position: absolute;
        top:50%;
        transform: translateY(-50%)
      }
    }
    .search-input{
      border-bottom: 1px solid #ccc;
      width:600px;
      height:40px;
      padding-left: 20px;
    }
    .search-list{
      border: 1px solid #ccc;
      width:600px;
      max-height:400px;;
      overflow-y: scroll;
      border-top:none;
       &::-webkit-scrollbar {
        display: none;
      }
      li{
        padding:10px;
        cursor: pointer;
        &:not(:last-child){
           border-bottom: 1px solid #ccc;
        }
        &:hover{
          background: #727abd;
          color:#fff;
        }
      }
    }

  }

</style>
