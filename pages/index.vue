<template>
<div class='login-page'>
    <div class='dialog'>
        <div class='dialog-left'></div>
        <div class='dialog-right'>
           <router-view />
        </div>
    </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      repeatPassword: '',
      identifyingCode: '',
      login_status: true,
      email: ''
    }
  },
  methods: {
    async sendEmail() {
      if(!this.email) return
      const res = await this.$axios.post('/emailValidate', {
        email: this.email,
      })
    },
    async login() {
      const res = await this.$axios.post('/login', {
        username: this.username,
        password: this.password
      })
      this.$store.commit('setUser', res.data)
      this.$router.push('/book')
    },
    async signUp() {
      const res = await this.$axios.post('/register', {
        username: this.username,
        password: this.password,
        identifyingCode: this.identifyingCode,
        email: this.email
      })
    }
  }
}
</script>


<style lang='scss'>
.login-page {
  height: 100%;
  background: linear-gradient(to left top, #7568f3, #d195ec);
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  .dialog {
    height: 500px;
    width: 800px;
    border-radius: 8px;
    display: flex;

    // background: radial-gradient(circle at top right, transparent 5%, #fff 0) top
    //     right,
    //   radial-gradient(circle at bottom right, transparent 5%, #fff 0) bottom
    //     right;
    // background-size: 50% 50%;
    // background-repeat: no-repeat;

    background: linear-gradient(to left bottom, transparent 50%, #ddd 0)
        no-repeat 100% 0 /2em 2em,
      linear-gradient(-135deg, transparent 1.414em, #fff 0);

    &-left {
      width: 50%;
      background: url('~assets/images/login.png') no-repeat;
      background-size: cover;
      border-radius: 8px 0 0 8px;
      position: relative;
      &::after {
        content: '';
        background: #faf7fd;
        opacity: 0.7;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10;
        border-radius: 8px 0 0 8px;
      }
    }
    &-right {
      width: 50%;
      padding: 90px 80px;
      h4 {
        margin-bottom: 30px;
        text-align: left;
      }
      .reset-password {
        font-size: 12px;
        margin-bottom: 20px;
        color: #7568f3;
        cursor: pointer;
      }
      .m-button {
        font-size: 12px;
        display: inline-block;
        text-align: center;
        width: 240px;
        height: 40px;
        line-height: 40px;
        border-radius: 20px;
        background: #7336ff;
        color: #fff;
        cursor: pointer;
        margin-bottom: 12px;
      }
      .login-group{
        margin-bottom: 12px;
        text-align: center;
      }
      .sign-up {
        text-align: center;
        font-size: 12px;
        span {
          color: #7568f3;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
