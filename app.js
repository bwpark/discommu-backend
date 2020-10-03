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
const PassportJWT = require('passport-jwt')
const mongoose = require('mongoose')
const {ApolloServer} = require('apollo-server-express')
const User = require('./models/User')

mongoose.connect(config.database, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=>console.info('Connected to mongodb session'))

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
}, async (accessToken,refreshToken,profile,cb) => {
  if (!await User.exists({id: profile.id})) {
    console.log(`[CREATE] 와 새로운 유저! id: ${profile.id}`)
    const user = new User({
      id: profile.id
    })
    await user.save()
  }
  cb(null,{profile})
}))

passport.use(new PassportJWT.Strategy({
  secretOrKey: config.jwt,
  jwtFromRequest: PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken()
} ,(payload,done) => {
  return done(null,{
    profile: payload
  })
}))

const gql = {
  typeDefs: fs.readFileSync('./graphql/schema/schema.graphql', {encoding: 'utf-8'}),
  resolvers: require('./graphql/resolver')
}

const indexRouter = require('./routes/index')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(passport.initialize())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)

app.use('/graphql', (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (user) {
      req.user = user
    }
    next()
  })(req, res, next)
})

const apollo = new ApolloServer({typeDefs: gql.typeDefs, resolvers: gql.resolvers, context: ({req}) => ({
  user: req.user
})})

apollo.applyMiddleware({app})

app.use(function(req, res, next) {
  next(createError(404))
})

app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  res.json({code:err.status || 500,error: err.message})
})

module.exports = app
