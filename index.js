const express = require('express');
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const cors = require('cors')

//Middlewares
app.use(cors())
app.use(express.json())


//Import Routes
const authRoute = require('./routes/auth');
const Document = require('./routes/document');

//Connect to db
mongoose.connect(`${process.env.MONGODB_URI}`,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('Connected to db'))

//Route Middlewares
app.use('/', (req,res) => {
    console.log('server is up')
    return res.send({
        message: 'Server is up and running'
    })

})
app.use('/api/user', authRoute)
app.use('/api/document', Document )

app.listen(3001, () => console.log('Server is up and running'))