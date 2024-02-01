require('dotenv').config()
const http = require('http')
const app = require('./src/config/express.config')
const httpServer = http.createServer(app)
const PORT = process.env.PORT
httpServer.listen(PORT, "127.0.0.1", (error) => {
    if (!error) {
        console.log(`Server running on port:${PORT}`)
    }
})