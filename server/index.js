const express = require('express')
const app = express()
const cors = require('cors')
const db = require('./database')
const PORT = 3001

app.use(express.json())
app.use(cors())


//read data
app.get("/read", (req, res) => {
 db.query("SELECT * FROM employees",
     (error, results) => {
         if (error) {
             console.error(error);
             res.send("Error retrieving data from the database");
         } else {
             res.send(results);
         }
     });
 })



//  add data
app.post("/create", (req, res) => {
  const {
    firstname,
    initial,
    lastname,
    position,
    department,
    email,
    contact
} = req.body;
    db.query( "INSERT INTO employees (FirstName, Initial, LastName, Position, Department, Email, Contact, DateHired) VALUES (?, ?, ?, ?, ?, ?, ?,  DATE_FORMAT(NOW(), '%Y-%m-%d'))",
    [firstname, initial, lastname, position, department, email, contact],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send("Error inserting data into the database");
      } else {
        res.status(200).send("Data added successfully");
      }
    }
  );
});

//  selected  for update form
app.get("/read/:id", (req, res) => {
  db.query("SELECT * FROM employees",
      (error, results) => {
          if (error) {
              console.error(error);
              res.send("Error retrieving data from the database");
          } else {
              res.send(results);
          }``
      });
  })

// Update
app.put("/update/:id", (req, res) => {
  const {
    firstname,
    initial,
    lastname,
    position,
    department,
    email,
    contact
} = req.body;

    const id = req.params.id;

    db.query(
        "UPDATE employees SET FirstName=?, Initial=?, LastName=?, Position=?, Department=?, Email=?, Contact=? WHERE id=?",
        [firstname, initial, lastname, position, department, email, contact, id],
        (error, result) => {
          if (error) {
            console.error(error);
            res.send("Internal Server Error");
          } else {
            res.send("Updated");
          }
        }
      );
    });


// delete
app.delete("/delete/:id", (req,res) => {
    const id = req.params.id;
    db.query("DELETE FROM employees WHERE id = ?", id, 
    (error, result) => {
        if(error) {
            res.send(error);
        }
        else {
            res.send(result);
        }
    })
})

app.listen(PORT, () => {
    console.log('listening on port', PORT)
});
