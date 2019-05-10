
const Sequelize = require('sequelize');
const {sequelize} = require('./index.js')
const uuid = require('uuid/v4')

const {STRING, INTEGER, DATE, UUID, Op,BOOLEAN} = Sequelize

const NotebookModel = sequelize.define('notebooks', {
    id: {
        type: UUID,
        primaryKey: true
    },
    userId: {
        type:UUID,
        allowNull: false,
    } ,
    bookname: {
        type: STRING(20),
    },
    describe: {
        type: STRING(60),
    },
    isDefault: BOOLEAN,
    created_at: DATE,
    updated_at: DATE
}, {
    timestamps: false,
    indexes: [
        {
            fields: ['id', 'userId'],
            unique: true
        }
    ]
})

NotebookModel.sync()


NotebookModel.createNotebook = async (userId,bookname,describe)=> {
    const { count } = await NotebookModel.findAndCountAll({
        where: {
            userId
        }
     })
    const isDefault = count === 0 ? 1 : 0
    return await NotebookModel.create({
        id: uuid(),
        userId,
        bookname,
        describe,
        isDefault
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


NotebookModel.findDefaultBook = async function(userId){
    return await NotebookModel.findOne({
        attributes:['id'],
        where: {
            userId,
            isDefault: 1
        }
    })
}



module.exports = NotebookModel





