import pkg from 'pg'
import dotenv from 'dotenv'

dotenv.config()
const { Client } = pkg

const client = new Client({
  host: process.env.POSTGRES_HOST, // Ganti dengan endpoint Amazon RDS Anda
  port: 5432, // Port default PostgreSQL
  user: process.env.POSTGRES_USERNAME, // Username PostgreSQL
  password: process.env.POSTGRES_PASSWORD, // Password PostgreSQL
  database: process.env.POSTGRES_DATABASE, // Nama database yang ingin digunakan
  ssl: { rejectUnauthorized: false }, // Menambahkan SSL
})

client
  .connect()
  .then(() => console.log('Connection to PostgreSQL successfull!'))
  .catch((err) => console.error('Connection failed!', err.stack))

export default client
