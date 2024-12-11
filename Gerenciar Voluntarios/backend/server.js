const express = require('express')
const cors = require('cors')
const voluntarioRoutes = require('./routes/voluntarioRoutes.js')
const app =express()

app.use(cors())
app.use(express.json())

app.use('/voluntario',voluntarioRoutes)

app.listen(3000, ()=>console.log('Servidor rodando na porta 3000'))