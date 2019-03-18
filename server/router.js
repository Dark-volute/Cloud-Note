const Router =  require('koa-router')
const router = new Router()

const NotebookModel = require('./model/notebook.js')


router.get('/findAll',async (ctx, next) => {
    const result = await NotebookModel.findAll()

    ctx.body = {
        code: 0,
        data: result
    }
})

router.post('/create',async (ctx, next) => {
    const result = await NotebookModel.create()
    ctx.body = {
        code: 0,
        data: result
    }
})

module.exports = router