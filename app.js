const express = require('express')
const app = express()
const exphbs = require('express-handlebars')

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

//新增cookie功能確定使用者的登入情況
const cookieParser = require('cookie-parser')
app.use(cookieParser('123456789'))

const validation = require('./validation')

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/login', (req, res) => {
  const email = req.body.Email
  const password = req.body.Password
  const [valid, response] = validation(email, password)
  if(valid){
    //set cookie, 在 /cookie之下有效，使用簽章，cookie生存10分鐘
    res.cookie('email', email, { path: '/cookie', signed: true, maxAge: 60000 })
    res.cookie('firstName', response, { path: '/cookie', signed: true, maxAge: 60000 })
    return res.redirect('/cookie')   
  }else {
    console.error(response)
    res.render('index', {response})
  }
})
app.get('/cookie', (req, res) => {
  const firstName = req.signedCookies.firstName
  res.render('success', {firstName})
})
//清除cookie
app.get('/logout', (req, res) => {
  res.clearCookie('email', {path: '/cookie'})
  res.clearCookie('firstName', {path: '/cookie'})
  const response = 'Log out successfully! See you next time.'
  res.render('index', {response})
})

app.listen(3000, () => {
  console.log('App is listening on localhost: 3000')
})