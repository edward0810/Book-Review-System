require("dotenv").config();
const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())


const userRouter = require('./router/user')
const bookRouter=require('./router/book')
const homeRouter=require('./router/home')
const genreRouter=require('./router/genre')
const authorRouter=require('./router/author')
const reviewRouter=require('./router/review')

app.use('/',homeRouter)
app.use('/user', userRouter)
app.use('/book', bookRouter)
app.use('/genre',genreRouter)
app.use('/author',authorRouter)
app.use('/review',reviewRouter)

//port
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
});



