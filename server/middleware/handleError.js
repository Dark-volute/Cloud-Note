
module.exports = function(){
    return async (ctx, next)=> {
        try {
            await next()    
        } catch (error) {
           ctx.status =  error.httpStatusCode || 200 
           ctx.body = {
               code: error.code || -1,
               message: error.msg || error.message
           }
        }
    }
}