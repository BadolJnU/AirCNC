const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

// middlewares
app.use(cors())
app.use(express.json())

// Database Connection
const uri = process.env.DB_URI
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
})

async function run() {
  try {
    const homesCollection = client.db('aircnc-db').collection('homes')
    const usersCollection = client.db('aircnc-db').collection('users')

    //save the user email and generate jwt token

    app.put('/users/:email', async(req, res)=>{
      const email = req.params.email
      const user = req.body
      const filter = {email: email}
      const option = {upsert: true}
      const updateUser = {
        $set: user,
      }
      const result = await usersCollection.updateOne(filter, updateUser, option)
      console.log(result)
      const token = jwt.sign(user, process.env.ACCESS_TOKEN, {
        expiresIn: '1d',
      })
      res.send({result, token})
    })

    console.log('Database Connected...')
  } finally {
  }
}

run().catch(err => console.error(err))

app.get('/', (req, res) => {
  res.send('Server is running... in session')
})

app.listen(port, () => {
  console.log(`Server is running...on ${port}`)
})
