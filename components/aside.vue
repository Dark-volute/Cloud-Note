<template>
    <div class='m-aside'>
          <!-- <div class='info'>
        <header>
          <h3>Note</h3>
          <div>
            <i class='iconfont icon-message'></i>
            <i class='iconfont icon-setting'></i>
          </div>
        </header>
        <ul class='tab-list'>
          <li class='active'>
            <i class='iconfont icon-star'></i>
            <span>快捷方式</span>
          </li>
          <li>
             <i class='iconfont icon-note'></i>
            <span>全部笔记</span>
          </li>
          <li>
            <i class='iconfont icon-notebook'></i>
            <span>笔记本</span>
          </li>
          <li>
             <i class='iconfont icon-tag'></i>
            <span>标签</span>
          </li>
          <li>
             <i class='iconfont icon-trash'></i>
            <span>废纸篓</span>
          </li>    
        </ul>
      </div> -->

      <div class='info'>
        <!-- <header>
          <h3>Note</h3>
          <div>
            <i class='iconfont icon-message'></i>
            <i class='iconfont icon-setting'></i>
          </div>
        </header> -->
        <ul class='tab-list'>
          <li style='color:#ffbd39'>
            <i class='iconfont icon-star'></i>
          </li>
          <li>
             <i class='iconfont icon-note'></i>
          </li>
          <li>
            <i class='iconfont icon-notebook'></i>
          </li>
          <li>
             <i class='iconfont icon-tag'></i>
          </li>
          <li>
             <i class='iconfont icon-trash'></i>
          </li>
         <li>
              <i class='iconfont icon-search'></i> 
          </li>     
        </ul>
      </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  computed: {
    count() {
      return this.$store.state.counter
    }
  }
}
</script>


<style lang='scss'>
.m-aside {
  height: 100%;
  flex-basis: 60px;
  background: #f8f8f8;
  padding: 40px 20px;
  header {
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
  }
  .tab-list {
    color: #263d96;
    font-size: 12px;
    li {
      margin-bottom: 20px;
      border: 1px solid #ccc;
      border-radius: 50%;
      display: inline-block;
      padding: 10px;
      transition: 0.4s;
      &:hover {
        background: #727abd;
        color: #fff;
      }
    }
  }
}

//      .info {
//     flex-basis: 200px;
//     background: linear-gradient(to top, #263d96, #1d2483);
//     padding: 40px 20px;
//     header {
//       color: #fff;
//       display: flex;
//       justify-content: space-between;
//       align-items: center;
//       margin-bottom: 40px;
//     }
//     .tab-list {
//       color: #727abd;
//       font-size: 12px;
//       li {
//         margin-bottom: 20px;
//       }
//       li.active {
//         color: #fff;
//         font-size: 14px;
//         i {
//           color: #ffbd39;
//         }
//       }
//     }
//   }
</style>
