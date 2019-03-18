const Sequelize = require('sequelize');
const {sequelize} = require('./index.js')
const uuid = require('uuid/v4')

const {STRING, INTEGER, DATE, UUID, Op} = Sequelize

const NotebookModel = sequelize.define('notebooks', {
    id: {
        type: UUID,
        primaryKey: true
    },
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


const findAll = async ()=> {
    return await NotebookModel.findAll()
}

const create = async ()=> {
    return await NotebookModel.create({
        id: uuid(),
        bookname:'123',
        describe: '12'
    })
}


module.exports = {
    findAll,
    create
}





