// import express
const express = require('express');

// import nedb
const Datastore = require('nedb');

// import body-parser
const bodyParser = require('body-parser');


// setting up the app
const app = express();

// set up a new database
const db = new Datastore();

// global variable for id
let id = 1;

// adding body-parsing functionality to our app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// get app to serve static files from the public directory
app.use(express.static(__dirname + '/public'));

// create (post)
app.post('/create', (req,res) => {
  console.log(`\nCreate - POST`);
  // create an item from the data in the request body
  let item = { name : req.body.name, _id: id.toString()};
  // increment our id by 1
  id++;
  //insert it into our DB
  db.insert(item, (err, item) => {
    // if there is an error, send back the error
    if (err) res.send(err);
    // otherwise 201 - Created and the item (JSON)
    res.status(201).send(item);
    // log it to console
    console.log(`Created item: ${JSON.stringify(item)}`)
  });
});

//update
//curl -s -X PUT http://localhost:8080/update/1 -H 'Content-type:application/json' -d '{"name":"updated name"}'
app.put(`/update/:id`, (req,res) => {
    console.log(`\nupdate - UPDATE`);
    //id needed and what to update it with
    let item = {name : req.body.name, _id: req.params.id}
    //curly brackets needed to specify what it is going to update and then item has the values with the same error catch at the end
    db.update({_id: req.params.id}, item, (err, item) => 
    {
        if (err) res.send(err);
    res.status(201).send(`id:${item}`);
    console.log(`Updated item:`)
    })
})
//delete
//-X needed for delete and update curls
//curl -s -X DELETE http://localhost:8080/delete/1 
app.delete('/delete/:id', (req,res) => {
    console.log(`\ndelete - DELETE`);
    let item = {_id: req.params.id}
    db.remove(item, (err, item) => 
    {
    if (err) res.send(err);
    res.status(201).send(`Item has been deleted`);
    console.log(`Deleted item:}`)
  });
});

// read (get)
app.get('/read', (req,res) => {
  console.log(`\nRead - GET`);
  // get all data from the database
  db.find({}, (err, items) => {
    // if there is an error, send back the error
    if (err) res.send(err);
    // otherwise send back the items
    res.status(200).send(items);
    // log the items being returned
    console.log(`Reading items: ${JSON.stringify(items)}`);
  });
});

// read (get) by ID
app.get('/read/:id', (req,res) => {
  console.log(`\nRead - GET`);
  // find data in database BY using the id
  db.find({_id : req.params.id}, (err, item) => {
    // if there is an error, send back the error
    if (err) res.send(err);
    // otherwise 200 - OK and send back the item
    res.status(200).send(item);
    // log the item being returned
    console.log(`Reading item: ${JSON.stringify(item)}`);
  });
});

// setting the app to listen on post 8080
app.listen(8080, () => {
  console.log(`API listening on http://localhost:8080`);
});