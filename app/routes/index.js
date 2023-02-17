const router = require("express").Router();
const usersController = require('../controllers/users.controllers')
const notesController = require('../controllers/notes.controllers')

router.get("/", (req, res) => {
    try {
      const username = req.cookies.id
      if (!username) {
        return res.status(400).send({STATUS:"ERROR",message: `Signup and login to get authenticated`})  
      }
      return res.status(200).send({STATUS:"OK",message: `hello ${username}, welcome to  keep notes!!! 😉`})
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
    try {
        let user_id = parseInt(req.cookies.id)
        const notesBody = {
            ...req.body,
            "note_creator": user_id
        }
        if (!user_id) {
            return res.status(400).send({STATUS:"ERROR",message: "login to create notes"})
        }
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
    try {
        let user_id = parseInt(req.cookies.id)
        if (!user_id) {
            return res.status(400).send({STATUS:"ERROR",message: "login to view your notes"})
        }
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
    try {
        let user_id = parseInt(req.cookies.id)
        let note_id = parseInt(req.params.id)
        if (!user_id) {
            return res.status(400).send({STATUS:"ERROR",message: "login to update your notes"})
        }
        const notesUpdate = {
            ...req.body
        }
        notesController.getNote(note_id,(err,result) =>{
            if (result.note_creator !== user_id) {
                return res.status(400).send({STATUS:"ERROR",message: "cannot update another user's note"})
            }
        })
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
    try {
        let user_id = parseInt(req.cookies.id)
        let note_id = parseInt(req.params.id)
        if (!user_id) {
            return res.status(400).send({STATUS:"ERROR",message: "login to update your notes"})
        }
        notesController.getNote(note_id,(err,result) =>{
            if (result.note_creator !== user_id) {
                return res.status(400).send({STATUS:"ERROR",message: "cannot delete another user's note"})
            }
        })
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