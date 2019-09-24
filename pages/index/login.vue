<template>
    <div>
        <h4>Login to Note</h4>
           <m-form ref='form' :model="formValidate" :rules="ruleValidate">
               <m-form-item prop="username">
                   <m-input type='text' v-model='formValidate.username' placeholder="用户名"></m-input>
                </m-form-item>
              <m-form-item  prop="password">
                   <m-input type='password' v-model='formValidate.password' placeholder="密码"></m-input>
               </m-form-item>
            </m-form>
            <div class='reset-password'>
                  <nuxt-link to='/retrievePassword' tag='span'>ForgetPassword？</nuxt-link>
            </div>
            <button class='m-button' @click='submitForm'>Login</button>
            <p class="login-group"><i class='iconfont icon-github' @click="loginByGithub"></i></p>
            <p class='sign-up'>Don't have an account?<nuxt-link to='/sign' tag='span'>Sign up</nuxt-link></p>
    </div>
</template>

<script>
import mInput from '@/components/input/input.vue'
import mForm from '@/components/form/form.vue'
import mFormItem from '@/components/form/form-item.vue'
import '@/components/message/message.js'


function getQueryString(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
}


export default {
  components: { mInput, mForm, mFormItem },
  data() {
    return {
      formValidate: {
        username: '',
        password: '',
      },
      ruleValidate: {
        username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
        mail: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ]
      }
    }
  },
  mounted(){
    const code = getQueryString('code')
    if(!code) return
    this.$axios.get('/github/user', {params:{code}}).then(res=> {
      if(res.code === 0){
        this.$store.commit('setUser', res.data)
        this.$router.push('/book')
      }
    })
  },
  methods: {
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
            this.login()
        }
      })
    },
    restForm() {
      this.$refs.form.resetFields()
    },
    async login() {
      const res = await this.$axios.post('/login', this.formValidate)
      if(res.code === 0){
        this.$store.commit('setUser', res.data)
        this.$router.push('/book')
      } else {
        this.$message.error(res.message || '登陆失败')
      }

    },
    async loginByGithub(){
      const res = await this.$axios.get('/loginByGithub')
      window.location.href = res.path
    }
  }
}
</script>

<style>
  .icon-github{
    font-size: 24px;
  }
</style>
