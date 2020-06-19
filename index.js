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


// get orders

app.get('/orders', (req,res) =>{
    client = new MongoClient(uri, { useNewUrlParser: true });
   client.connect(err => {
       const collection = client.db("onionDataStore").collection("orders");
           
           collection.find().toArray((err, documents) =>{
               
               if(err){
                   console.log(err);
                   res.status(500).send({massage:err});
                   
               }else{
                   res.send(documents [0]);
               }
               
           });
     
         
       client.close();
     });
});



app.get('/food/:id', (req, res) =>{
    
    const id = req.params.id;

    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("onionDataStore").collection("foods");
        collection.find({id}).toArray((err, documents)=>{
    
            if(err){
                console.log(err);
                res.status(500).send({massage:err});
                
            }
            else{
               
                res.send(documents [0]);
            }
            
            
        });
          
        client.close();
      });
})


app.post('/getFoodId', (req, res) =>{
    
    const id = req.params.id;
    const foodId = req.body;
   console.log(foodId);
   
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("onionDataStore").collection("foods");
        collection.find({id:{$in: foodId}}).toArray((err, documents)=>{
    
            if(err){
                console.log(err);
                res.status(500).send({massage:err});
                
            }
            else{
               
                res.send(documents);
            }
            
            
        });
          
        client.close();
      });
})

// Post 

app.post('/addFood', (req, res) =>{
    const food = req.body;
     console.log(food);
    client = new MongoClient(uri, { useNewUrlParser: true });

    client.connect(err => {
        const collection = client.db("onionDataStore").collection("foods");
            
            collection.insert(food,(err, result) =>{
                
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


app.post('/orderDetails', (req, res) =>{
    const orderDetail = req.body;
    orderDetail.orderTime = new Date();
   console.log(orderDetail );
   
    client = new MongoClient(uri, { useNewUrlParser: true });

    client.connect(err => {
        const collection = client.db("onionDataStore").collection("orders");
            
            collection.insertOne(orderDetail,(err, result) =>{
                
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