const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const fs = require('fs')
const config = require('./config.json')
const passport = require('passport')
const DiscordStrategy = require('passport-discord').Strategy
const jwt = require('jsonwebtoken')

passport.serializeUser((user,cb) => {
  cb(null,jwt.sign(user,config.jwt))
})

passport.serializeUser((user,cb) => {
  let payload
  try {
    payload = jwt.decode(user,config.jwt)
    return cb(null,payload)
  } catch(e) {
    return cb(e,null)
  }
})

passport.use(new DiscordStrategy({
  clientID: config.oauth2.clientID,
  clientSecret: config.oauth2.clientSecret,
  callbackURL: config.oauth2.callback,
  scope: ['identify', 'email']
}, (accessToken,refreshToken,profile,cb) => {
  cb(null,{profile})
}))

const gql = {
  typeDefs: fs.readFileSync('./graphql/schema/schema.graphql', {encoding: 'utf-8'}),
  resolvers: require('./graphql/resolver')
}

const indexRouter = require('./routes/index')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(passport.initialize())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)

const {ApolloServer} = require('apollo-server-express')

const apollo = new ApolloServer({typeDefs: gql.typeDefs, resolvers: gql.resolvers})

apollo.applyMiddleware({app})

app.use(function(req, res, next) {
  next(createError(404))
})

app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  res.json({code:err.status || 500,error: err.message})
})

module.exports = app
