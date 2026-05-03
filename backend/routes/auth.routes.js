const {Router} = require('express')

const router = Router()
const {register,login} = require('../controllers/auth')
const { verifyToken } = require('../middleware/token.middleware')
const { createPost } = require('../controllers/post')
router.post('/register', register)
router.post('/login', login)
router.post("/create-post", verifyToken, createPost)


module.exports = router