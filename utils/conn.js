const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://muliice:7k7msXZKrfpwUT3i@cluster0.7yygu.mongodb.net/?retryWrites=true&w=majority'

const conn = mongoose.createConnection(
    MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
   }
)
conn.on('open', () => {
	console.log(' mongodb connected');
})
conn.on('err', (err) => {
	console.log('err:' + err);
})

module.exports = conn;