import express, { Application } from 'express'
import cors from 'cors'
import { userRoutes } from './app/modules/user/user.route'

const app: Application = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/user', userRoutes)

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'ums auth service is running',
  })
})

export default app
