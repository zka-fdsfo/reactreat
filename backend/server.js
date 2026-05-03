require('dotenv').config()
const app = require('./src/app')
const connectDB = require('./db/db')

connectDB()
const dns = require('dns');

// Use Google DNS
dns.setServers(['8.8.8.8', '8.8.4.4']);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})