const http = require('http'); //Otetaan http lisäosa käyttöön
const validUrl = require('valid-url');

const config = {
  http_server_port: process.env.HTTP_SERVER_PORT,
  http_proxy_port: process.env.HTTP_PROXY_PORT
}

http.createServer(function (req, res) {
  res.end('Hei')
}).listen(config.http_server_port)

http.createServer(function (req, res) { //Luodaan palvelin vastaanottamaan pyyntöjä
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
