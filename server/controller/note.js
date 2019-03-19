const NoteModel = require('../model/note')


const createNote = async function(ctx, next){
    const {   title, content ,notebookId } = ctx.request.body
    const userId = ctx.cookies.get('sessionid')
    const note = await NoteModel.createNote(userId,notebookId,title, content)

    ctx.body = {
        code:0,
        data:note
    }
}


const deleteNote = async function(ctx, next){
    const id = ctx.params.id
    const note = await NoteModel.deleteNote(id)
    ctx.body = {
        code:0,
        message:'success'
    }
}

const findAllNotes = async function(ctx, next){
    const userId = ctx.userId
    const notes = await NoteModel.findAllNotes(userId)
    ctx.body = {
        code:0,
        data:notes
    }
}


module.exports = {
    createNote,
    deleteNote,
    findAllNotes
}