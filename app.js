const app = require('express')()

console.log('running');

app.use('/', (req, res) => {
    res.send('hello world')
})

app.listen(8090, () => {
    'running on 8090'
})