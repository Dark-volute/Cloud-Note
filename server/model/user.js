const Sequelize = require('sequelize');
const {sequelize} = require('./index.js')
const uuid = require('uuid/v4')
const {pbkdf2, randomBytes} = require('crypto')
const {promisify} = require('util')
const Errors = require('../error.js')

const pbkdf2P = promisify(pbkdf2)
const randomBytesP = promisify(randomBytes)


async function genCryptedPassword(RawPassword, salt) {
    if(!salt) salt = await randomBytesP(32)
    const cryptedPassword = await pbkdf2P(RawPassword, salt.toString(), 10000, 128, 'sha512')

    return {
        salt: salt.toString(),
        cryptedPassword: cryptedPassword.toString()
    }
}

const {STRING, INTEGER, DATE, UUID, Op} = Sequelize

const UserModel = sequelize.define('user', {
    id: {
        type: UUID,
        primaryKey: true
    },
    username: {
        type: STRING(30),
    },
    password: {
        type: STRING(256)
    },
    salt: {
        type: STRING(128)
    },
    mail: STRING
}, {
    indexes: [
        {
            fields: ['username'],
            unique: true
        }
    ]
})

UserModel.sync()


UserModel.register = async (username ,password)=> {
    const {cryptedPassword, salt} = await genCryptedPassword(password)
    return await UserModel.create({
        id: uuid(),
        username,
        password:cryptedPassword,
        salt
    })
}


UserModel.login = async (username ,password)=> {
    const user =  await UserModel.findOne({
        attributes:['password','id','salt','username'],
        where: {
            username
        }
    })
    if(!user) throw new Errors.ValidationError('用户不存在')

    const {cryptedPassword} = await genCryptedPassword(password, user.salt)

    if(user.password !== cryptedPassword) throw new Errors.ValidationError('密码错误')

    return user 
}

UserModel.user = async (userId)=> {
    return await UserModel.findOne({
        where: {
            id: userId
        }
    })
}

module.exports = UserModel
