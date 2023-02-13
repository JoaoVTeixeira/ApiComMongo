const express = require('express')
const { MongoClient, ObjectId } = require('mongodb')
const app = express()
const port = 27017


const DB_URL = "mongodb+srv://Joao:xxxxxxxxxxxxx@cluster0.jtcgil2.mongodb.net/?retryWrites=true&w=majority";
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
    
    const documentos = await collection.find().toArray();
    console.log("acessado");
    res.send(documentos);
  });

  app.get('/item/:id', async (req, res) =>{
    const id = req.params.id;
    const item = await collection.findOne({ _id: new ObjectId(id) });
    res.send(item);
  })

  app.post('/item', async (req,res) =>{
    const item = req.body;
    await collection.insertOne(item);
    res.send(item);
  })

 
  app.put("/item/:id", async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    // console.log(id, body);

    await collection.updateOne({ _id: new ObjectId(id) }, { $set: body });

    res.send(body);
  });


 
  app.delete('/item/:id' , async (req,res) =>{
    const id = req.params.id;

    await collection.findOneAndDelete({ _id: new ObjectId(id)})

    res.send("Deletado")
})
}

main();