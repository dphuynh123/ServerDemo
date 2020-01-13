var mongoose = require('mongoose')


class Database {
    constructor() {
        this.connect()
    }
    connect() {
        mongoose.connect(`mongodb://localhost:27017/business`,
            {
                useUnifiedTopology: true,
                useNewUrlParser: true,
            })
            .then(() => {
                console.log('Database connection successful')
            })
            .catch(err => {
                console.error('Database connection error')
            })
    }
}

module.exports = new Database()




