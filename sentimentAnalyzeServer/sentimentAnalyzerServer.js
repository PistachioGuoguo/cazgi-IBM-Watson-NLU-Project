const express = require('express');
const app = new express();

const {emotionAnalyzer, sentimentAnalyzer} = require('./ibmAnalyzer');  // self-written file of IBM NLU Service

app.use(express.static('client'));

const cors_app = require('cors');

app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
  });


app.get("/text/emotion/text=:target", (req,res) => {

    const target = req.params.target;
    emotionAnalyzer(target, 'text')
        .then(result => {
            return res.send(result);
        })
});

app.get("/text/sentiment/text=:target", (req,res) => {
    const target = req.params.target;
    sentimentAnalyzer(target, 'text')
        .then(result => {
            return res.send(result);
        })
});


app.get(/\/url\/emotion\/url=(.*)/, (req,res) => {
    const target = req.params[0];
    emotionAnalyzer(target, 'url')
        .then(result => {
            return res.send(result);
        })
});

app.get(/\/url\/sentiment\/url=(.*)/, (req,res) => {
    const target = req.params[0];
    sentimentAnalyzer(target, 'url')
        .then(result => {
            return res.send(result);
        })
});


let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

