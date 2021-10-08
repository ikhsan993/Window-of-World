const express = require('express')

const router = express.Router()

// Controller
const { addUsers, getUsers, getUser, updateUser, deleteUser } = require('../controllers/user')
const { addBook, getBooks, getBook, updateBook, deleteBook } = require('../controllers/book')
const { addBookList,getBookList,deleteBookList } = require('../controllers/bookList')
const { addSubscribe,getSubscribe,getSubscribes,updateSubscribe } = require('../controllers/subscribe')
const {register,login} = require('../controllers/auth')

// Middlewares
const {auth} = require('../middlewares/auth');
const {uploadFile}  = require('../middlewares/uploadFile')
// const {uploadBookFile}  = require('../middlewares/uploadBookFile')

// Route
// user
router.post('/user', addUsers)
router.get('/users', getUsers)
router.get('/user/:id', getUser)
router.patch('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)

//book 
router.post('/book',auth,uploadFile('cover'), addBook)
router.get('/books', auth, getBooks)
router.get('/book/:id',getBook)
router.patch('/book/:id',auth,uploadFile('cover'), updateBook)
router.delete('/book/:id',auth, deleteBook)

//book list
router.post('/book-list',auth, addBookList)
router.get('/book-list',auth, getBookList)
router.delete('/book-list/:id',auth, deleteBookList)

// subscribes
router.post('/subscribe',auth,uploadFile('transferProof'), addSubscribe)
router.get('/subscribes',auth, getSubscribes)
router.get('/subscribe/:id',auth, getSubscribe)
router.patch('/subscribe/:id',auth, updateSubscribe)

// register

router.post('/register', register)
router.post('/login', login)

module.exports = router