const express = require('express')
const app = express()
const exphbs = require('express-handlebars')

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

const validation = require('./validation')

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/login', (req, res) => {
  const email = req.body.Email
  const password = req.body.Password
  const [valid, response] = validation(email, password)
  if(valid){
    res.render('success', {firstname: response})
  }else {
    console.error(response)
    res.render('index', {response})
  }
})

app.listen(3000, () => {
  console.log('App is listening on localhost: 3000')
})