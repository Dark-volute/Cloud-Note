const Router =  require('koa-router')
const router = new Router()
const auth = require('./middleware/auth')
const NotebookModel = require('./model/notebook.js')

const UserController = require('./controller/user')
const NotebookController = require('./controller/notebook')
const NoteController = require('./controller/note')




router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/user', auth(), UserController.user)


router.post('/notebook/create',auth(), NotebookController.createNotebook)
router.get('/notebook',auth(), NotebookController.findBooks)
router.delete('/notebook/delete/:id',auth(), NotebookController.deleteNotebook)

router.get('/note',auth(), NoteController.findAllNotes)
router.post('/note/create', auth(), NoteController.createNote)
router.delete('/note/delete/:id',auth(), NoteController.deleteNote)
router.patch('/note/update/:id',auth(), NoteController.updateNote)
router.patch('/note/trashOrRecover/:id',auth(), NoteController.trashOrRecoverNote)

router.get('/search/:keyword', NoteController.search)






module.exports = router
