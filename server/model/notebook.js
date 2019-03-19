const Sequelize = require('sequelize');
const {sequelize} = require('./index.js')
const uuid = require('uuid/v4')

const {STRING, INTEGER, DATE, UUID, Op} = Sequelize

const NotebookModel = sequelize.define('notebooks', {
    id: {
        type: UUID,
        primaryKey: true
    },
    userId:  STRING,
    bookname: {
        type: STRING(20),
    },
    describe: {
        type: STRING(60),
    },
    created_at: DATE,
    updated_at: DATE
}, {
    timestamps: false,
    indexes: [
        {
            fields: ['id'],
            unique: true
        }
    ]
})

NotebookModel.sync()


NotebookModel.createNotebook = async (userId,bookname,describe)=> {
    return await NotebookModel.create({
        id: uuid(),
        userId,
        bookname,
        describe
    })
}


NotebookModel.findBooks = async (userId)=> {
    return await NotebookModel.findAll({
        where: {
            userId
        }
    })
}



NotebookModel.deleteNotebook = async (id)=> {
   await NotebookModel.destroy({
       where:{
          id
       }
   })
}


module.exports = NotebookModel





