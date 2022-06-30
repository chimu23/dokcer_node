const express = require('express')
const { PORT, SECRET } = require('./utils/config.js')()

const app = express()

app.set('secret', SECRET)

app.use(require('cors')())
app.use(express.json())

require('./utils/conn')
require('./routes/admin')(app)

// app.use('/admin/api/user/register', async (req, res) => {
//     console.log(req.body)
//     res.send('register')
// })

app.use('/test', async (req, res) => {
    const d = new Date().toLocaleString()
    res.send(d)
})

app.listen(PORT, () => {
    console.log(`running on ${PORT}`)
})
