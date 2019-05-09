const UserModel = require('../model/user')

module.exports = function(){
    return async (ctx, next) => {
        const userid = ctx.cookies.get('key',{ signed: true })
        const user = await UserModel.user(userid)

        if(user) {
           ctx.userId = user.id
           await next()
        } else {
            ctx.throw(401, 'no Auth', { code: 401 });
        }
    };

}
