const express = require("express");
const mongodb = require("mongodb");

const app = express();

app.get("/count", async function (req, res) {
  const client = new mongodb.MongoClient("mongodb://mongo/local");
  try {
    await client.connect();
    const database = await client.db();
    const views = database.collection('views');
    await views.insertOne({date: new Date()});
    const amount = await views.find().count();
    res.send(`Cantidad de visitas a la pagina: ${amount}`);
  }catch(error){
    console.log(error);
  }  
  finally {
    await client.close();
  }
});

app.get("/ping", (req, res) => res.send("OK"));

app.get("/", (req, res)=>{
    res.sendFile(__dirname + '/index.html');
})

app.listen(3001);
