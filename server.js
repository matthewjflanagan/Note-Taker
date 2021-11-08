const fs = require('fs');
const express = require('express');
const path = require('path');
const uuid = require('./Assets/uuid');

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => {
    fs.readFile('db/db.json', 'utf8', (error, data) => {
        error ? console.error(error) : console.log(data)
        res.json(JSON.parse(data))
    })
});


app.post('/api/notes'), (req, res) => {
   // console.log(req.body)
   const { title, text } = req.body
   if (title && text) {
       const newNote = {
           title,
           text,
           id: uuid(),
       }
       console.log(id)

       const notes = fs.readFile('db/db.json', 'utf8', (error, data) => {
      error ? console.error(error) : console.log(data)
      res.json(JSON.parse(data))
      })
      
      console.log(notes)
      

      notes.push(newNote)

       // Write updated note back to the file
       fs.writeFile(
           './db/db.json',
           JSON.stringify(notes, null, 4),
           (writeErr) =>
               writeErr
                   ? console.error(writeErr)
                   : console.info('Successfully updated notes!')
       );

       const response = {
           status: "success",
           body: newNote,
       }
       console.log(response)
       res.status(201).json(response);

   } else {
       res.status(500).json('Error in posting review');
   }
}

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);