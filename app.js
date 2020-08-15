const http = require('http'); //Otetaan http lisäosa käyttöön
const validUrl = require('valid-url');
const fs = require('fs');
const express = require('express');
const path = require('path');


const app = express();

const config = {
  uri: 'http://proxy.kaikkitietokoneista.net',
  http_server_port: process.env.HTTP_SERVER_PORT,
  http_proxy_port: process.env.HTTP_PROXY_PORT
}
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//setup public folder

app.get('*',function (req, res) {
  res.render('index', {
    proxy_port: config.http_proxy_port,
    web_port: config.http_server_port,
    uri: config.uri
  })
});

app.listen(config.http_server_port);

/* Proxy */

http.createServer(function (req, res) { //Luodaan palvelin vastaanottamaan pyyntöjä
  console.log(`Käyttäjä IP:stä ${req.connection.remoteAddress} lataa sivua ${req.url}`);
  if (validUrl.isUri(req.url)){
    http.get(req.url, (vastaus) => { //Tehdään pyyntö perustuen käyttäjän luoman pyynnön sisältävään urliin
      let data = '' //Luodaan vain tälle lohkolle oma data muuttuja
      vastaus.on('data', (osio) => { //Aina kun urlista tulee dataa laitetaan se data muuttujaan
        data += osio
      })
      vastaus.on('end', () => { //Kun datan tulo loppuu lähetetään http palvelimen avulla data. Säästetään tilaa käyttämällä vain res.endiä eikä res.writeä ja res.endiä
        res.end(data)
      })
    }).on("error", (err) => { //Jos tulee virhe sanotaan palvelimen puolella siitä
      console.log("Pyyntöä suorittaessa tapahtui virhe", err)
    })
  } else {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end('<p>Kyseessä ei ollut toimiva URL-osoite</p>')
  }
}).listen(config.http_proxy_port) //Asetetaan palvelimen portti


let startmessage = `
Server has started:
  HTTP PROXY on port: ${config.http_proxy_port}
  HTTP SERVER on port: ${config.http_server_port}
`


console.log(startmessage);
