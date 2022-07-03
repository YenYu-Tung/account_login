const users = require('./users.json')

function validation(email, password){
  const user = users.find(user => user.email === email)
  if(user){
    if(password === user.password){
      return [true, user.firstName]
    }else {
      return [false, 'Invalid Password! Please try again.']
    }
  }else {
    return [false, 'Username not found! Please try again.']
  }
}

module.exports = validation