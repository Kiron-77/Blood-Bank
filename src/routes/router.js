const express = require('express')
const app = express()
const authRouter = require("../models/auth/auth.router")
const inventoryRouter = require("../models/inventory/inventory.router")

const userRouter = require("../models/user/user.router")

app.use("/auth", authRouter)
app.use("/inventory", inventoryRouter)

app.use('/user', userRouter);
module.exports = app;