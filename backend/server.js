const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const port = 3001
var cors = require('cors')
const { writeFile } = require('fs');
var fs = require('fs');
const forms = require("./database.json");

app.use(cors())

app.use(express.raw({ type: '*/*', limit: '10mb' }));

app.get('/pivo', (req, res) => {
    const forms = require("./database.json");
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    res.send(forms)
})

app.post('/pivo', (req, res) => {
    console.log('Получена заявка!')
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    const rawBody = req.body
    const form = JSON.parse(rawBody.toString('utf-8'))
    console.log(`ФИО: ${form.FIO}`)
    console.log(`Номер телефона: ${form.phone}`)
    console.log(`Город отправления: ${form.townFrom}`)
    console.log(`Город прибытия: ${form.townTo}`)
    console.log(`Стоимость: ${ Math.floor(form.distance) * 35}`)

    const forms = require("./database.json");

    forms.push(form);

    writeFile('database.json', JSON.stringify(forms), err => {
        // Checking for errors
        if (err) throw err;

        // Success
        console.log("Done writing");
    });

    res.send('Hello Worlasdd!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})