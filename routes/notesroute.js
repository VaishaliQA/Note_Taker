const router = require("express").Router();
const { addNewNote, deleteNote } = require("../helpers/notefunctions");
const fs = require("fs");

// GET Route for retrieving all the notes
router.get("/", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.log("There is no any note in file.");
    } else {
      res.json(JSON.parse(data));
    }
  });
});

// POST Route for add new note
router.post("/", (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a note`);
  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;
  if (title && text) {
    const newNote = addNewNote(title, text);
    const response = {
      status: "success",
      body: newNote,
    };
    res.json(response);
    // res.status(201).json(response);
  } else {
    res.json("Error in adding notes");
  }
});

// DELETE Route for delete note through id
router.delete("/:id", (req, res) => {
  // Log that a DELETE request was received
  console.info(`${req.method} request received to delete a note`);
  fs.readFile("./db/db.json", "utf8", (err, Notes) => {
    deleteNote(req.params.id, JSON.parse(Notes));
    res.json(true);
  });
});

module.exports = router;
