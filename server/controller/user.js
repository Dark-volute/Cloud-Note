const UserModel = require('../model/user')


const register = async function(ctx, next){
    const {username ,password} = ctx.request.body
    const user = await UserModel.register(username ,password)
    ctx.body = {
        code:0,
        data:user
    }
}

const login = async function(ctx, next){
    const {username ,password} = ctx.request.body
    const user = await UserModel.login(username ,password)
    ctx.cookies.set("sessionid",user.id,{
        maxAge:1000*60*60
      })
    ctx.body = {
        code:0,
        data: user
    }
}

const user = async function(ctx, next){
    const userId = ctx.userId
    const user = await UserModel.user(userId)
    ctx.body = {
        code:0,
        data: user
    }
}


module.exports = {
    register,
    login,
    user
}