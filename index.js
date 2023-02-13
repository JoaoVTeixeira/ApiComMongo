const express = require('express')
const { MongoClient } = require('mongodb')
const app = express()
const port = 27017


const DB_URL = "mongodb+srv://Joao:jT1456cluster@cluster0.jtcgil2.mongodb.net/?retryWrites=true&w=majority";
const DB_NAME = "api_teste";

  async function main(){
  console.log("Conectado com o banco de dados");
  const client = await MongoClient.connect(DB_URL);
  const db = client.db(DB_NAME);
  const collection = db.collection("itens");
  console.log("Banco de dados conectado");

  app.use(express.json())

  app.get('/', (req, res) => {
    res.send('Hello World!')
  })

  app.get('/oi', (req, res) => {
    res.send('Olá mundo!')
  })

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

  const itens = 
    [
      "Caneca",
      "Xícara",
      "Copo", 
      "Garrafa"
    ];

  //Endpoint ReadAll

  app.get('/item', async (req, res) => {
    res.send(itens);
  });

  app.get('/item/:id', (req, res) =>{
    const id = +req.params.id;
    res.send(itens[id - 1]);
  })

  app.post('/item', (req,res) =>{
    const item = req.body;
    itens.push(item.nome)
    res.send("Adicionado com sucesso")
  })

  app.delete('/item/:id' , (req,res) =>{
    const id = +req.params.id;
    delete itens[id];
    res.send("Deletado com sucesso");
  })
}

main();