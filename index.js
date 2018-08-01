'use strict'



const app = require("./app")
const config = require('./config')

app.listen(config.port, () => {
    console.log(`API REST Runing on port ${config.port}`)
})
