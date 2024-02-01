
require('./db.config')
const express = require('express')
const app = express()
const router = require('../routes/router')

app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))
//routes
app.use('/api/v1/', router)
app.use((req, res, next) => {
    next({ code: 404, messsage: "Route not found" })
})

// ********error handling**********//
app.use((error, req, res, next) => {
    console.log("Garbage", error)
    const code = error.code ?? 500
    const message = error.message ?? "server error"
    const result = error.result ?? null
    res.status(code).json({
        result: result,
        message: message,
        meta: null
    })
})
module.exports = app;