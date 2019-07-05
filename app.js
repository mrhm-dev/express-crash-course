const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

const pollController = require('./pollController')

const app = express()

app.set('view engine', 'ejs')

app.use(morgan('dev'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/create', pollController.createPollGetController)
app.post('/create', pollController.createPollPostController)

app.get('/polls/:id', pollController.viewPollGetController)
app.post('/polls/:id', pollController.viewPollPostController)
app.get('/polls', pollController.getAllPolls)


app.get('/', (req, res) => {
    res.render('home')
})

mongoose.connect('mongodb://localhost:27017/express-cc', {useNewUrlParser: true})
    .then(() => {
        app.listen(4545, () => {
            console.log('Application is ready to serve on port 4545')
        })
    })
    .catch(e => {
        console.log(e)
    })