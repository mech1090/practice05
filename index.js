const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('config')

const app = express()

app.use(express())
app.use(cors())
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))

app.get('.',(req,res)=>{
    res.send('OOK')
})

app.get('*',(req,res)=>{
    res.send('BAD_REQUEST')
})

const port = config.get('port') || 8080

app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})