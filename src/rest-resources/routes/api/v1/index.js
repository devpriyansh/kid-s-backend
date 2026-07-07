import express from 'express'
import userRoutes from './user.routes'
import childRoutes from './child.routes'
import quizRoutes from './quiz.routes'
import parentRoutes from './parent.routes'
import aiRoutes from './ai.routes'

const v1Router = express.Router()

v1Router.use('/user', userRoutes)
v1Router.use('/child', childRoutes)
v1Router.use('/quiz', quizRoutes)
v1Router.use('/parent', parentRoutes)
v1Router.use('/ai', aiRoutes)

export default v1Router
