const Sequelize = require('sequelize');
const {sequelize} = require('./index.js')
const uuid = require('uuid/v4')

const {STRING, INTEGER, DATE, UUID, Op,BOOLEAN} = Sequelize

const NoteModel = sequelize.define('notes', {
    id: {
        type: UUID,
        primaryKey: true
    },
    userId:  STRING,
    notebookId:  STRING,
    title: {
        type: STRING(20),
    },
    content: {
        type: STRING(60),
    },
    tag: STRING,
    clock:DATE,
    isTrashed: BOOLEAN
}, {
    indexes: [
        {
            fields: ['id'],
            unique: true
        }
    ]
})

NoteModel.sync()


NoteModel.createNote= async (userId,notebookId,title,content)=> {
    return await NoteModel.create({
        id: uuid(),
        userId,
        notebookId,
        title,
        content,
        isTrashed: false
    })
}

NoteModel.deleteNote = async (id) => {
    await NoteModel.destroy({
        where: {
            id
        }
    })
}
NoteModel.findNoteById = async (id) => {
    return await NoteModel.findOne({
         where: {
             id
         }
     })
 }

NoteModel.findAllByBookId = async (notebookId) => {
   return await NoteModel.findAll({
        where: {
            notebookId
        }
    })
}

NoteModel.findAllNotes = async (userId)=> {
    return await NoteModel.findAll({
        where: {
            userId
        }
    })
}





module.exports = NoteModel





