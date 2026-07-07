import db, { sequelize } from '../../db/models'
import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { getOne } from '../../helpers/crud'
import config from '../../configs/app.config'

// JWT options
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.get('jwt.loginTokenSecret') // Ensure JWT_SECRET is set in your environment variables
}

// JWT strategy definition
passport.use(
  new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      // Find the user based on the JWT payload
      const user = await getOne({
        model: db.User,
        data: { id: payload.id },
        attributes: ['id']
      })

      if (!user) {
        return done(null, false, { message: 'We couldn’t find your account.' })
      }

      return done(null, { detail: { ...user.toJSON(), sessionId: payload.sessionId } }) // Attach user details to req
    } catch (error) {
      return done(error, false)
    }
  })
)

// Serialize and deserialize user (optional)
passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))

// Export initialized Passport
export default passport
