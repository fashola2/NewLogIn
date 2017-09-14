const express = require("express")
const session = require("express-session")
const app = express()
const mustache = require("mustache-express")
const bodyparser = require('body-parser');
const expressvalidator = require('express-validator');
const users = require('./user.js');
app.use(bodyparser.urlencoded({extended: false}))
app.engine('mustache', mustache())
app.set('view engine', 'mustache')
app.use( express.static('public'))
app.use(expressvalidator())


let sess = {
  secret: "Mans world",
  cookie: {},
  saveUninitialized: true,
  resave: true
}
app.use(session(sess))

app.get('/', function(req, res, next) {
  if(req.session.user == null){
    res.redirect("/login")
  } else {
    res.redirect('/')
  }

  })
app.get("/login", function(req, res, next){
  res.render("login")
})
app.post('/login', function(req, res) {
  let username = req.body.username
  let password = req.body.password
  console.log(users);
let user
for (var i = 0; i < users.length; i++) {
if (users[i].username === username && users[i].password === password) {
  user = users[i]
}

} if (user){
  req.session.users = user
  req.session.authorized = true
res.redirect('/index')
} else {
  res.render('login', {

  })
}
})
app.get('/index', function (req, res, next) {
  res.render('index')
})

app.listen(3000, function(){
  console.log("Express started on port 3000")
})
