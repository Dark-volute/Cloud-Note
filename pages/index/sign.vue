<template>
    <div>
         <h4>Sign up Note</h4>
            <m-form ref='form' :model="formValidate" :rules="ruleValidate"> 
                <m-form-item prop="email">
                   <m-input type='text' v-model='formValidate.email' placeholder="邮箱"></m-input>
                </m-form-item > 
                <m-form-item prop="identifyingCode">
                   <m-input  type='text' v-model='formValidate.identifyingCode' placeholder="邮箱验证码">
                    <div slot='append' @click='sendEmail'>发送验证码</div>
                   </m-input>
                </m-form-item> 
                 <m-form-item prop="username">
                   <m-input type='text' v-model='formValidate.username' placeholder="用户名"></m-input>
                </m-form-item>
              <m-form-item  prop="password">
                   <m-input type='password' v-model='formValidate.password' placeholder="密码"></m-input>
               </m-form-item> 
                   <m-form-item>
                   <m-input type='password' v-model='repeatPassword' placeholder="重复密码"/>
                 </m-form-item> 
            </m-form>
            <div class='reset-password'>
              <nuxt-link to='/retrievePassword' tag='span'>ForgetPassword？</nuxt-link>
            </div>
            <span class='m-button' @click='submitForm'>Sign up</span>
            <p class='sign-up'><nuxt-link to='/login' tag='span'>back to login</nuxt-link></p>
    </div>
</template>

<script>
import mInput from '@/components/input/input.vue'
import mForm from '@/components/form/form.vue'
import mFormItem from '@/components/form/form-item.vue'
export default {
  components: { mInput, mForm, mFormItem },
  data() {
    return {
      repeatPassword: '',
      formValidate: {
       username: '',
       password: '',
       identifyingCode: '',
       email: '',
      },
      ruleValidate: {
        identifyingCode: [{ required: true, message: '验证码不能为空', trigger: 'blur' }],
        username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
      submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
            this.signUp()
        } 
      })
    },
    async sendEmail() {
      if(!this.formValidate.email) return
      const res = await this.$axios.post('/emailValidate', {
        email: this.formValidate.email,
      })
      if(res.code === 0){
          this.$message.success('邮件发送成功')
      } else {
         this.$message.error(res.message || '发送验证码失败')
      }
    },
    async signUp() {
      const res = await this.$axios.post('/register', this.formValidate)
       if(res.code === 0){
          this.$message.success('注册成功')
          this.$store.commit('setUser', res.data)
          this.$router.push('/book')
      } else {
         this.$message.error( res.message || '注册失败')
      }
    }
  }
}
</script>

