const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();



const  app = express();

app.use(cors());
app.use(bodyParser.json());

const uri = process.env.DB_PATH;



 let client = new MongoClient(uri, { useNewUrlParser: true });

const user = ['Ashik', 'Khandakar', 'Rofik', 'Tamime','Al-amin']


app.get('/foods', (req,res) =>{
     client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("onionDataStore").collection("foods");
            
            collection.find().toArray((err, documents) =>{
                
                if(err){
                    console.log(err);
                    res.status(500).send({massage:err});
                    
                }else{
                    res.send(documents);
                }
                
            });
      
          
        client.close();
      });
});

app.get('/users/:id', (req, res) =>{

    const id = req.params.id;
    const name = user[id]
    res.send({id, name});
})
// Post 

app.post('/addFood', (req, res) =>{
    const food = req.body;
     console.log(food);
    client = new MongoClient(uri, { useNewUrlParser: true });

    client.connect(err => {
        const collection = client.db("onionDataStore").collection("foods");
            
            collection.insertOne(food,(err, result) =>{
                
                if(err){
                    console.log(err);
                    res.status(500).send({massage:err});
                    
                }else{
                    res.send(result.ops[0]);
                }
                
            });
      
          
        client.close();
      });
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log('Listening to  port 8000'))