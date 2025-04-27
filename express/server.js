import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import product from './routes/product.js'

dotenv.config()
const app = express()

//* Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Terjadi kesalahan di server' })
})

//* routes
app.use('/', product)

app.listen(8000, '0.0.0.0', () => {
  console.log('Server running on port 8000')
})
