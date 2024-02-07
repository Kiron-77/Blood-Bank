const express = require('express')
const app = express()
const authRouter = require("../models/auth/auth.router")
const inventoryRouter = require("../models/inventory/inventory.router")
const organizationRouter = require("../models/organization/organization.router")
const hospitalRouter = require("../models/hospital/hospital.router")


const userRouter = require("../models/user/user.router")

app.use("/auth", authRouter)
app.use("/inventory", inventoryRouter)
app.use("/organization", organizationRouter)
app.use("/hospital",hospitalRouter)

app.use('/user', userRouter);
module.exports = app;