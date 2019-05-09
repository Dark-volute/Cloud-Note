const UserModel = require('../model/user')
const {generateIdentifyingCode, sendEmail} = require('../email.js')
const redis = require('../redis')

const {promisify} = require('util');
const getAsync = promisify(redis.get).bind(redis);

const emailValidate = async function(ctx, next) {
    const email = ctx.request.body.email
    const code = await getAsync(email)

    if(code) {
        ctx.throw(200, '验证码还未过期');
    }
    const identifyingCode = generateIdentifyingCode()
    const res = await sendEmail(email, identifyingCode).catch(err => {
        ctx.throw(500, err);
    })

    if(res) {
        redis.set(email, identifyingCode, 'EX', 60 * 5);
    }
    ctx.body = {
        code: 0,
        message:'success'
    }
}

const retrievePassword = async function(ctx, next){
    const {username ,password, email, identifyingCode} = ctx.request.body
    const code = await getAsync(email)
    if(identifyingCode !==  code) {
        ctx.throw(200, '验证码错误');
    }
    const user = await UserModel.retrievePassword(email,password)
    ctx.body = {
        code:0,
        data:user
    }
}


const register = async function(ctx, next){
    const {username ,password, email, identifyingCode} = ctx.request.body
    const code = await getAsync(email)
    if(identifyingCode !==  code) {
        ctx.throw(200, '验证码错误');
    }

    const user = await UserModel.register(username ,password,email)
    ctx.cookies.set("key",user.id,{
        maxAge:1000*60*60,
        signed: true
      })
    ctx.body = {
        code:0,
        data:user
    }
}

const login = async function(ctx, next){
    const {username ,password} = ctx.request.body
    const user = await UserModel.login(username ,password)
    ctx.cookies.set("key",user.id,{
        maxAge:1000*60*60,
        signed: true
      })
    ctx.body = {
        code:0,
        data: user
    }
}

const logOut = async function(ctx, next){
    ctx.cookies.set("key",null)
    delete ctx.userId
    ctx.body = {
        code:0,
        message:'success'
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
    user,
    logOut,
    emailValidate,
    retrievePassword
}
