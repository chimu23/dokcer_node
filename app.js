const app = require('express')()

console.log('running');

app.use('/', (req, res) => {
    res.send('hello world')
})

app.listen(3000, () => {
    'running on 3000'
})