const functions = require('firebase-functions');
const express = require('express');
const app = express();
var resData = require('./modules/get-firebase-data');

app.get('/', (req,res) => {
    res.sendFile('index.html')
});

app.get('/sap-data-redirect', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    resData.get();
    res.send(JSON.stringify(resData.data));
})

app.get('*', (req, res) => { 
    res.render('404');
 });




exports.app = functions.https.onRequest(app);
