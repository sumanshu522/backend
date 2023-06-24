const express = require('express')
const cors = require('cors')
const app = express()
const dotenv = require('dotenv')
const connectDB = require("./config/db")
const authRouter = require("./routes/authRotes")
const postRouter = require("./routes/postRoutes")
const aiRouter = require("./routes/aiRoutes")

dotenv.config()

connectDB()
const port = process.env.PORT || 5000

app.use(cors())

app.use(express.json())
app.use("/api/user",authRouter)
app.use("/api/post",postRouter)
app.use("/api/ai",aiRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
