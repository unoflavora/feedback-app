const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const multer  = require('multer')
const path = require('path')

const User = require('../models/user')

const router = express.Router()

//define destination and filename for saved user photo
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,path.join(__dirname,'../public/assets/user-images'))
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 1048576  } 
})

router.post('/login', async (req, res) => {
  try {
    const body = req.body
    const fetchedUser = await User.find({username: body.username})
    
    const user = fetchedUser[0]
    const passwordCheck = user 
      ? await bcrypt.compare(body.password, user.password)
      : null

    //check user
    if(user && passwordCheck) {
      const token = jwt.sign({
        id: user.id,
        name: user.name,
        username: user.username,
        image: user.image,
        privilege: user.privilege
      }, process.env.JWT, {expiresIn: 60 * 60})
  
      res.status(200).json({token})
    } else {
      res.status(401).json({error: 'Invalid Username or Password!'})
    }
  } catch(e) {
    next(e)
  } 
})


router.post('/register', upload.single('user-photo'), async (req, res, next) => {
  //user data in form-data
  const user = JSON.parse(req.body.data)

  //generating hash and saving the user data into db
  try {
    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(user.password, salt)
    const newUser = new User({
      ...user, password,
      image: `./assets/user-images/${req.file.filename}`
    })
    const savedUser = await newUser.save()
    const token = jwt.sign({
      name: savedUser.name,
      username: savedUser.username,
      privilege: savedUser.privilege,
      image: savedUser.image
    }, process.env.JWT, {expiresIn: 60 * 60})

    res.status(200).json({token})
  } catch(e) {
    next(e)
  }
})

module.exports = router