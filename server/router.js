const Router =  require('koa-router')
const router = new Router({
    prefix:'/api'
})
const auth = require('./middleware/auth')
const NotebookModel = require('./model/notebook.js')

const UserController = require('./controller/user')
const NotebookController = require('./controller/notebook')
const NoteController = require('./controller/note')



router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/logOut', UserController.logOut)
router.get('/user', auth(), UserController.user)
router.post('/emailValidate',UserController.emailValidate)
router.post('/retrievePassword',UserController.retrievePassword)
router.get('/loginByGithub',UserController.loginByGithub)
router.get('/github/user',UserController.getUserByGithub)

router.post('/notebook',auth(), NotebookController.createNotebook)
router.get('/notebook',auth(), NotebookController.findBooks)
router.delete('/notebook/:id',auth(), NotebookController.deleteNotebook)

router.get('/note',auth(), NoteController.findAllNotes)
router.get('/note/:bookId',auth(), NoteController.findAllByBookId)

router.post('/note', auth(), NoteController.createNote)
router.delete('/note/:id',auth(), NoteController.deleteNote)
router.patch('/note/:id',auth(), NoteController.updateNote)
router.patch('/note/trashOrRecover/:id',auth(), NoteController.trashOrRecoverNote)

router.get('/search/:keyword', NoteController.search)









module.exports = router
