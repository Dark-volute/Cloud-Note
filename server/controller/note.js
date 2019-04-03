const NoteModel = require('../model/note')
const NoteBookModel = require('../model/notebook')

const createNote = async function (ctx, next) {
  let {title, content, notebookId} = ctx.request.body

  if (!notebookId) {
    const {id} = await NoteBookModel.findDefaultBook()
    notebookId = id
  }
  const userId = ctx.userId
  const note = await NoteModel.createNote(userId, notebookId, title, content)
  ctx.body = {
    code: 0,
    data: note
  }
}


const deleteNote = async function (ctx, next) {
  const id = ctx.params.id
  const note = await NoteModel.deleteNote(id)
  ctx.body = {
    code: 0,
    message: 'success'
  }
}

const findAllNotes = async function (ctx, next) {
  const userId = ctx.userId
  const {isTrashed} = ctx.request.query
  const found = await NoteModel.findAllNotes(userId)
  const notes = found.filter(v => v.isTrashed == isTrashed)

  ctx.body = {
    code: 0,
    data: notes
  }
}


const updateNote = async function (ctx, next) {
  const noteId = ctx.params.id
  const data = ctx.request.body
  const notes = await NoteModel.updateNote(noteId, data)
  ctx.body = {
    code: 0,
    data: notes
  }
}

const trashOrRecoverNote = async function (ctx,next) {
  const {isTrashed} = ctx.request.body
  const noteId = ctx.params.id
  const notes = await NoteModel.trashOrRecoverNote(noteId, isTrashed)
  ctx.body = {
    code: 0,
    data: notes
  }
}

const search = async function (ctx, next) {
  const keyword = ctx.params.keyword

  const notes = await NoteModel.search(keyword)
  ctx.body = {
    code: 0,
    data: notes
  }
}


module.exports = {
  createNote,
  deleteNote,
  findAllNotes,
  updateNote,
  search,
  trashOrRecoverNote
}
