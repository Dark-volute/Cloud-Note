<template>
    <div class='m-aside'>
      <div class='info'>
        <ul class='tab-list'>
          <li style='color:#ffbd39'>
            <i class='iconfont icon-star'></i>
          </li>
            <nuxt-link  to='/' tag='li'><i class='iconfont icon-note'></i></nuxt-link>
            <nuxt-link to='/book' tag='li'><i class='iconfont icon-notebook'></i></nuxt-link>
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
        <div class='user' v-if='user'>
          {{user.username}}
        </div>
      </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  computed: {
    user() {
      return this.$store.state.user
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
      cursor: pointer;
      margin-bottom: 20px;
      border: 1px solid #ccc;
      border-radius: 50%;
      display: inline-block;
      padding: 10px;
      transition: 0.4s;
      &:hover {
        background: #727abd;
        color: #fff;
        border-color: #727abd;
      }
    }
    .nuxt-link-exact-active {
      background: #727abd;
      color: #fff;
      border-color: #727abd;
    }
  }
}
</style>
