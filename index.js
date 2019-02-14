// implement your API here
const express = require("express");
const db = require("./data/db.js");
const server = express();
require("dotenv").config();
server.use(express.json());

// POST /api/users:
server.post("/api/users", (req, res) => {
    const newUser = req.body;
    if (!newUser.name || !newUser.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else {
        db
        .insert(newUser)
        .then(users => {
                res.status(201).json({users})
        })
        .catch(err => {
            res.status(500).json({ error: "There was an error while saving the user to the database" })
        })
    }
});

// GET /api/users:
server.get("/api/users", (req, res) => {
    db
        .find()
        .then(users => {
            res.status(200).json({users})
        })
        .catch(err => {
            res.status(500).json({ error: "The users information could not be retrieved." })
        })
});

// GET /api/users/:id: 
server.get("/api/users/:id", (req, res) => {
    const { id } = req.params;
    db
        .findById(id)
        .then(user => {
            if (user) {
                res.status(200).json({user})
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist." })
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The user information could not be retrieved." })
        })
})

// DELETE /api/users/:id:
server.delete("/api/users/:id", (req, res) => {
    const { id } = req.params;
    db
        .remove(id)
        .then(deleted => {
            if (!deleted) {
                res.status(404).json({ message: "The user with the specified ID does not exist." })
            } else {
                res.status(200).json({deleted})
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The user could not be removed" })
        })
})

// PUT /api/users/:id:
server.put("/api/users/:id", (req, res) => {
    const { id } = req.params;
    updatedUser = req.body;
    if (!updatedUser.name || !updatedUser.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else {
        db
        .update(id, updatedUser)
        .then(updated => {
            if (!updated) {
                res.status(404).json({ message: "The user with the specified ID does not exist." })
            }
            res.status(200).json({updated})
        })
        .catch(err => {
            res.status(500).json({ error: "The user information could not be modified." })
        })
    }
});

const port = process.env.PORT || 4000;
server.listen(port, () => {
    console.log(`\n*** Running on port ${port} ***\n`)
})

