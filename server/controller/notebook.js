const NotebookModel = require('../model/notebook')
const NoteModel = require('../model/note')


const createNotebook = async function(ctx, next){
    const userId = ctx.userId
    const {   bookname, describe } = ctx.request.body
    const book = await NotebookModel.createNotebook(userId,bookname ,describe)

    ctx.body = {
        code:0,
        data:book
    }
}

const deleteNotebook = async function(ctx, next){
    const id = ctx.params.id
    const notes = await NoteModel.findAllByBookId(id)
    console.log(id,notes,123)
    if(notes && notes.length > 0) ctx.throw(500,'笔记还存在笔记')
    const book = await NotebookModel.deleteNotebook(id)
    ctx.body = {
        code:0,
        message:'success'
    }
}

const findBooks = async function(ctx, next){
    const userId = ctx.userId
    const books = await NotebookModel.findBooks(userId)
    ctx.body = {
        code:0,
        data:books
    }
}





module.exports = {
    createNotebook,
    deleteNotebook,
    findBooks
}