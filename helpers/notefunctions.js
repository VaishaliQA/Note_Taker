const allNotes = require('../db/db.json');
// Helper method for generating unique ids
const uuid = require('./uuid');
const fs = require('fs');
const path = require("path");

function deleteNote(id,allNotes) {
    for (let i = 0; i < allNotes.length; i++) {
        let note = allNotes[i];
        if (note.id == id) {
            allNotes.splice(i, 1);
           
            fs.writeFile(
              path.join(__dirname, '../db/db.json'),
                JSON.stringify(allNotes),
                (writeErr) => 
                writeErr? 
                console.error(writeErr): 
                console.info('Successfully deleted note!')
              );
        }
        
        }
    }

function addNewNote(title, text)
{
  // Variable for the object we will save
  const newNote = {
    title,
    text,
    id: uuid(),
  };
  fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        // Convert string into JSON object
        const allNotes = JSON.parse(data);

        // Add a new review
        allNotes.push(newNote);

        // Write updated reviews back to the file
        fs.writeFile(
          path.join(__dirname, '../db/db.json'),
          JSON.stringify(allNotes, null, 4),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info('Successfully updated notes!')
        );
      }
    });
    return newNote;
}


module.exports = {
    addNewNote,
    deleteNote
};