/* eslint-disable no-unused-vars */
import cors from 'cors'
import express, { Application } from 'express'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import { userRoutes } from './app/modules/user/user.route'

const app: Application = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//console.log(app.get('env'))
//console.log(process.env)
app.use('/user', userRoutes)

app.get('/', (req, res, next) => {
  next('error testing')
})

app.use(globalErrorHandler)

export default app
