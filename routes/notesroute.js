const router = require("express").Router();
const {addNewNote,deleteNote} = require('../helpers/notefunctions');
const allNotes = require('../db/db.json');

router.get('/', (req, res) => {
    res.json(allNotes);
});

router.post('/',(req,res) =>{
    // Log that a POST request was received
   console.info(`${req.method} request received to add a note`);
   // Destructuring assignment for the items in req.body
    const { title, text } = req.body;
    if (title && text) {
     const newNote = addNewNote(title,text)
     const response = {
       status: 'success',
       body: newNote,
     };
     res.json(response);
    // res.status(201).json(response);
     } else {
     res.json('Error in adding notes');
     }
   });


   router.delete('/:id', (req, res) => {
    // Log that a DELETE request was received
        console.info(`${req.method} request received to delete a note`);
        deleteNote(req.params.id, allNotes);
        res.json(true);
    });


   

    module.exports = router;
    