<template>
<div class='login-page'>
    <div class='dialog'>
        <div class='dialog-left'></div>
        <div class='dialog-right'>
            <h4>Login to Note</h4>
            <form class='dialog-form'>
                <div>
                   <input type='text'>
                </div>
                <div>
                   <input type='password'>
                </div>
            </form>
            <div class='reset-password'>
                <span>ForgetPassword？</span>
            </div>
            <button>登 陆</button>
            <p class='sign-up'>Don't have an account?<span>Sign up</span></p>
        </div>
    </div>
</div>  
</template>


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
    background: #fff;
    border-radius: 8px;
    display: flex;
    &-left {
      width: 50%;
      background: url('~assets/images/login.png') no-repeat;
      background-size: cover;
      border-radius: 8px 0 0 8px;
      position: relative;
      &::after{
        content: '';
        background: #faf7fd;
        opacity: .7;
        position: absolute;
        top:0;
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
      .dialog-form {
        margin-bottom: 10px;
        input {
          height: 30px;
          width: 240px;
          border-radius: 4px;
          border: 1px solid #ccc;
          margin-bottom: 10px;
          padding-left: 20px;
          transition: border 0.4s;
          &:focus {
            border: 1px solid #7568f3;
          }
        }
      }
      .reset-password {
        font-size: 12px;
        margin-bottom: 20px;
        color: #7568f3;
        cursor: pointer;
      }
      button {
        width: 240px;
        height: 40px;
        border-radius: 20px;
        background: #7336ff;
        color: #fff;
          margin-bottom: 30px;
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