const { ENV } = process.env

const PREFIX = 'MN_'

module.exports = () => {
    let config = {
        PORT: 8090,
        SECRET: 'IOHIDAS8D0Andkalsy7',
        MONGO_URI: 'mongodb+srv://muliice:7k7msXZKrfpwUT3i@cluster0.7yygu.mongodb.net/?retryWrites=true&w=majority'
    }
    switch (ENV) {
        case 'development':
            config = {
                MONGO_URI:
                    'mongodb+srv://muliice:7k7msXZKrfpwUT3i@cluster0.7yygu.mongodb.net/?retryWrites=true&w=majority'
            }
            break
        case 'production':
            Object.keys(process.env).forEach(key => {
                if (key.startsWith(PREFIX)) {
                    config[key.slice(PREFIX.length)] = process.env[key]
                }
            })
            break
    }
    return {
        ENV,
        ...config
    }
}
