const router = require("express").Router();
const usersController = require('../controllers/users.controllers')
const notesController = require('../controllers/notes.controllers')

router.get("/", (req, res) => {
    try {
      const username = req.cookies.id
      return res.status(200).send({STATUS:"OK",message: `hello ${username}, welcome to  keep notes!!! 😉`})
    } catch (err) {
      res.status(500).send({STATUS:"ERROR",message: err.message})
    }
});

router.get("/users", (req, res) => {
    try {
      usersController.getUsers((err, results) => {
       if (err) {
        return res.status(400).send({STATUS:"ERROR",message: err.message})
       }
       
       return res.status(200).send({STATUS:"OK",data:results})
      });
    } catch (err) {
      res.status(500).send({STATUS:"ERROR",message: err.message})
    }
});

router.post("/login", (req, res) => {
    try {
        const userDetails = {
            ...req.body
          }
      usersController.getUser(userDetails,(err, results) => {
       if (err) {
        return res.status(400).send({STATUS:"ERROR",message: err.message})
       }
       res.cookie('id', results[0].user_id);
       return res.status(200).send({STATUS:"OK",data:results})
      });
    } catch (err) {
      res.status(500).send({STATUS:"ERROR",message: err.message})
    }
});

router.post("/signup", (req, res) => {
    try {
      const userDetails = {
        ...req.body
      }
      usersController.createUser(userDetails, (err, results) => {
        if (err) {
          return res.status(400).send({STATUS:"ERROR",message: err.message})
         }
         return res.status(201).send({STATUS:"OK", data:results})
      });
  
    } catch (err) {
        res.status(500).send({STATUS:"ERROR",message: err.message})
    }
});

router.post("/notes", (req, res) => {
    const notesBody = {
        ...req.body,
        "note_creator": parseInt(req.cookies.id)
    }
    try {
      notesController.createNote(notesBody,(err, results) => {
       if (err) {
        return res.status(400).send({STATUS:"ERROR",message: err.message})
       }
       return res.status(200).send({STATUS:"OK",data:results})
      });
    } catch (err) {
      res.status(500).send({STATUS:"ERROR",message: err.message})
    }
});

router.get("/notes", (req, res) => {
    let user_id = parseInt(req.cookies.id)
    try {
      notesController.getNotes(user_id,(err, results) => {
       if (err) {
        return res.status(400).send({STATUS:"ERROR",message: err.message})
       }
       return res.status(200).send({STATUS:"OK",data:results})
      });
    } catch (err) {
      res.status(500).send({STATUS:"ERROR",message: err.message})
    }
});

router.put("/notes/:id", (req, res) => {
    let note_id = parseInt(req.params.id)
    const notesUpdate = {
        ...req.body
    }
    try {
      notesController.updateNotes(note_id,notesUpdate, (err, results) => {
       if (err) {
        return res.status(400).send({STATUS:"ERROR",message: err.message})
       }
       return res.status(200).send({STATUS:"OK",data:results})
      });
    } catch (err) {
      res.status(500).send({STATUS:"ERROR",message: err.message})
    }
});

router.delete("/notes/:id", (req, res) => {
    let note_id = parseInt(req.params.id)
    try {
      notesController.deleteNote(note_id, (err, results) => {
       if (err) {
        return res.status(400).send({STATUS:"ERROR",message: err.message})
       }
       return res.status(200).send({STATUS:"OK",data:results})
      }) ;
    } catch (err) {
      res.status(500).send({STATUS:"ERROR",message: err.message})
    }
});


module.exports = router;