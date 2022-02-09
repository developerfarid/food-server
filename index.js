const express = require('express')
const app = express()
const cors = require("cors")
const ObjectId = require('mongodb').ObjectId;
const { MongoClient } = require("mongodb");
const port = process.env.PORT || 5000
require("dotenv").config();
app.use(cors())
app.use(express.json())
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.doqsn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function run() {
  try {
    await client.connect();
    const database = client.db('student');
    const addFoodCollection = database.collection('addFood');
    const addStudentCollection = database.collection('student');
    const userCollection = database.collection('user');
    const reviewCollection = database.collection('review');

    app.post("/addFood", async (req, res) => {
      const result = await addFoodCollection.insertOne(req.body)
      res.json(result)
    })
    app.get("/food", async (req, res) => {

      const result = await addFoodCollection.find({}).toArray();
      res.send(result)
    })
    app.get("/student", async (req, res) => {

      const result = await addStudentCollection.find({}).toArray();
      res.send(result)
    })
    app.get("/student/:rollNumber", async (req, res) => {

      const roll = req.params.rollNumber
      console.log(roll);
      const result = await addStudentCollection.findOne({ roll: req.params.rollNumber })
      console.log(result);
      res.json(result)
    })

    app.delete("/addStudent/:id", async (req, res) => {
      const id = req.params.id
      console.log(id, "okkk");
      const query = { _id: ObjectId(id) };
      console.log(query);
      const result = await addStudentCollection.deleteOne(query)
      res.send(result)
    })

    app.get("/food/:id", async (req, res) => {

      const id = req.params.id
      console.log(id);
      const query = { _id: ObjectId(id) };
      const result = await addFoodCollection.findOne(query)
      res.json(result)
    })
    app.get("/addFood/:id", async (req, res) => {

      const id = req.params.id

      const query = { _id: ObjectId(id) };
      const result = await addFoodCollection.findOne(query)
      res.send(result)
    })

    app.get("/addStudent/:id", async (req, res) => {

      const id = req.params.id

      const query = { _id: ObjectId(id) };
      const result = await addStudentCollection.findOne(query)
      res.send(result)
    })

    app.post("/user", async (req, res) => {
      const result = await userCollection.insertOne(req.body)

      res.json(result)
    })
    app.post("/addStudent", async (req, res) => {
      const result = await addStudentCollection.insertOne(req.body)
      console.log(req.body);
      res.json(result)
    })

    app.put("/user", async (req, res) => {
      const user = req.body

      const fillter = { email: user.email }
      const options = { upsert: true };
      const updateSet = { $set: user }
      const result = await userCollection.updateOne(fillter, updateSet, options)
      res.json(result)
    })

    app.get("/user", async (req, res) => {

      const result = await userCollection.find({}).toArray();
      res.send(result)
    })

    app.get("/addFood", async (req, res) => {
      const result = await addFoodCollection.find({}).toArray();
      res.send(result)
    })

    app.put("/addFoodEdit/:id", async (req, res) => {
      console.log("okkkk");
      const id = req.body.id
      console.log("update", id);
      const query = { _id: ObjectId(id) };
      const options = { upsert: true };
      console.log(req.data);
      const updateDoc = {
        $set: {
          foodName: req.body.foodName,
          price: req.body.price,
        }
      }
      const result = await addFoodCollection.updateOne(query, updateDoc, options)
      res.send(result)
    })
    app.put("/addStudent/:id", async (req, res) => {
      console.log("okkkk");
      const id = req.body
      console.log("update", id);
      const query = { _id: ObjectId(id) };
      const options = { upsert: true };
      console.log(req.data);
      const updateDoc = {
        $set: {
          name: req.body.name,
          roll: req.body.roll,
          age: req.body.age,
          class: req.body.class,
          hall: req.body.hall,
          action: req.body.action,
          shift: req.body.shift,
        }
      }
      const result = await addStudentCollection.updateOne(query, updateDoc, options)
      res.send(result)
    })
    app.put("/updateData/:id", async (req, res) => {
      console.log("okkkk");
      const id = req.body
      console.log("update", id);
      const query = { _id: ObjectId(id) };
      const options = { upsert: true };
      console.log(req.data);
      const updateDoc = {
        $set: {
          name: req.body.name,
          roll: req.body.roll,
          age: req.body.age,
          class: req.body.class,
          hall: req.body.hall,
          action: req.body.action,
          food: req.body.food,
          served: req.body.served,
          date: req.body.date,
          shift: req.body.shift,
        }
      }
      const result = await addStudentCollection.updateOne(query, updateDoc, options)
      res.send(result)
    })

    app.put('/user/admin', async (req, res) => {
      const user = req.body;

      const filter = { email: user.email };
      const updateDoc = { $set: { role: 'admin' } };
      const result = await userCollection.updateOne(filter, updateDoc);
      res.json(result);
    })

    app.get("/user/:email", async (req, res) => {
      const email = req.params.email
      const query = userCollection.find({ email: email })
      const result = await query.toArray()
      res.send(result)
    })

    app.delete("/addFood/:id", async (req, res) => {
      const id = req.params.id

      const query = { _id: ObjectId(id) };
      console.log(query);
      const result = await addFoodCollection.deleteOne(query)
      res.send(result)
    })


  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

