const router = require("express").Router();
const usersController = require('../controllers/users.controllers')
const notesController = require('../controllers/notes.controllers')

router.get("/", (req, res) => {
    try {
      const username = req.cookies.id
      if (!username) {
        return res.status(400).send({STATUS:"ERROR",message: `Signup and login to get authenticated`})  
      }
      return res.status(200).send({STATUS:"OK",message: `hello user ${username}, welcome to  keep notes!!! 😉`})
    } catch (err) {
      res.status(500).send({STATUS:"ERROR",message: err.message})
    }
});

// router.get("/users", (req, res) => {
//     try {
//     //   const username = req.cookies.id
//         usersController.getUsers((err,result) =>{
//             return res.status(200).send({STATUS:"OK",message: result})
//         })
//     } catch (err) {
//       res.status(500).send({STATUS:"ERROR",message: err.message})
//     }
// });

router.post("/signup", (req, res) => {
    try {
        const userDetails = {
            ...req.body
        };
        if (!userDetails.user_name || !userDetails.user_mobile || !userDetails.user_password) {
            return res.status(400).send({STATUS: "ERROR", message: "Name, mobile, and password are required"});
        }
        usersController.createUser(userDetails, (err, results) => {
            if (err) {
                return res.status(500).send({STATUS: "ERROR", message: err.message});
            }
            return res.status(201).send({STATUS: "OK", data: results});
        });
    } catch (err) {
        res.status(500).send({STATUS: "ERROR", message: err.message});
    }
});


router.post("/login", (req, res) => {
    try {
        const userDetails = {
            ...req.body
        };
        if (!userDetails.user_name || !userDetails.user_password) {
            return res.status(400).send({STATUS: "ERROR", message: "name and password are required"});
        }
        usersController.getUser(userDetails, (err, results) => {
            if (err) {
                return res.status(500).send({STATUS: "ERROR", message: err.message});
            }
            if (results.length === 0) {
                return res.status(401).send({STATUS: "ERROR", message: "Invalid name or password"});
            }
            res.cookie('id', results[0].user_id);
            return res.status(200).send({STATUS: "OK", data: results});
        });
    } catch (err) {
        res.status(500).send({STATUS: "ERROR", message: err.message});
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
            return res.status(400).send({STATUS:"ERROR", message: "Login to create notes"})
        }
        if (!notesBody.note_title || !notesBody.note_content || !notesBody.note_status) {
            return res.status(400).send({STATUS:"ERROR", message: "Title, status and content are required"})
        }
        notesController.createNote(notesBody,(err, results) => {
            if (err) {
                return res.status(500).send({STATUS:"ERROR", message: err.message})
            }
            return res.status(201).send({STATUS:"OK", data: results})
        });
    } catch (err) {
        res.status(500).send({STATUS:"ERROR", message: err.message})
    }
});


router.get("/notes", (req, res) => {
    try {
        const user_id = parseInt(req.cookies.id);
        if (!user_id) {
            return res.status(401).send({STATUS: "ERROR", message: "Unauthorized: login to view your notes"});
        }
        notesController.getNotes(user_id, (err, results) => {
            if (err) {
                return res.status(500).send({STATUS: "ERROR", message: err.message});
            }
            return res.status(200).send({STATUS: "OK", data: results});
        });
    } catch (err) {
        res.status(500).send({STATUS: "ERROR", message: err.message});
    }
});


router.put("/notes/:id", (req, res) => {
    try {
        const user_id = parseInt(req.cookies.id);
        const note_id = parseInt(req.params.id);
        if (!user_id) {
            return res.status(401).send({STATUS: "ERROR", message: "Unauthorized: login to update your notes"});
        }
        notesController.getNote(note_id, (err, result) => {
            if (err) {
                return res.status(500).send({STATUS: "ERROR", message: err.message});
            }
            if (!result) {
                return res.status(404).send({STATUS: "ERROR", message: "Note not found"});
            }
            if (result.note_creator !== user_id) {
                return res.status(403).send({STATUS: "ERROR", message: "Forbidden: cannot update another user's note"});
            }
            const notesUpdate = {...req.body};
            notesController.updateNotes(note_id, notesUpdate, (err, results) => {
                if (err) {
                    return res.status(400).send({STATUS: "ERROR", message: err.message});
                }
                return res.status(200).send({STATUS: "OK", data: results});
            });
        });
    } catch (err) {
        res.status(500).send({STATUS: "ERROR", message: err.message});
    }
});


router.delete("/notes/:id", (req, res) => {
try {
    const user_id = parseInt(req.cookies.id)
    const note_id = parseInt(req.params.id)
    if (!user_id) {
    return res.status(401).send({ STATUS: "ERROR", message: "Unauthorized: Login to delete your notes" })
    }
    notesController.getNote(note_id,(err,note)=>{
        if (!note) {
        return res.status(404).send({ STATUS: "ERROR", message: "Note not found" })
        }
        if (note.note_creator !== user_id) {
        return res.status(403).send({ STATUS: "ERROR", message: "Forbidden: Cannot delete another user's note" })
        }
        if (err) {
        return res.status(400).send({STATUS:"ERROR",message: err.message})
    }
    })
    notesController.deleteNote(note_id, (err, results) => {
    if (err) {
        return res.status(400).send({STATUS:"ERROR",message: err.message})
    }
    return res.status(200).send({ STATUS: "OK", message: "Note deleted successfully" })
}) ;
} catch (err) {
    console.error(err)
    res.status(500).send({ STATUS: "ERROR", message: "Internal Server Error" })
}
});
  


module.exports = router;