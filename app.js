const app = require('express')()

const TodoModel = require('./Schema/todo.js')

app.use(require('cors')())

app.get('/', (req, res) => {
    new TodoModel({
        content: Date.now(),
        done: false
    })
        .save()
        .then(doc => {
            res.send(doc)
        })
})

app.listen(8090, () => {
    'running on 8090'
})
