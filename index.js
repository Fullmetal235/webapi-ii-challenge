// implement your API here
const express = require('express');
const db = require('./data/db.js');
const server = express();
server.use(express.json());

 const port = 5000;
 //GET Request
 server.get('/api/posts', (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({
                err: err,
                message: 'The users information could not be retrieved.'                      
            });
        });
});
//GET Request with certain user
server.get('/api/posts/:id', (req, res) => {
    const {id} = req.params;
    db.findById(id)
        .then(user => {
            if(user) {
                res.json(user)
            } 
            else {
                res.status(404).json({
                    message: 'The user with the specified ID does not exist.'
                });
            };
        })
        .catch(err => {
            res.status(500).json({
                err: err,
                message: 'The user information could not be retrieved.'
            });
        });
});

//GET post comments
server.get('/api/posts/:id/comments', (req, res) => {
    const {id} = req.params;
    db.findById(id)
        .then(user => {
            if(user) {
                res.json(user)
            } 
            else {
                res.status(404).json({
                    message: 'The user with the specified ID does not exist.'
                });
            };
        })
        .catch(err => {
            res.status(500).json({
                err: err,
                message: 'The user information could not be retrieved.'
            });
        });
});
//POST Request
server.post('/api/posts', (req, res) => {
    const {name, bio} = req.body;
    db.insert(req.body)
        .then(user => {
            if(user) {
                res.status(201).json(user);
            }
            else {
                res.status(400).json({
                    message: 'Please provide a name and bio for the user.'
                });
            };
        })
        .catch(err => {
            res.status(500).json({
                err: err,
                message: 'There was an error saving user to the database.'
            });
        });
});
//PUT Request
server.put('/api/posts/:id', (req, res) => {
    const {id} = req.params;
    const {name, bio} = req.body;
    if(name && bio) {
        db.update(id, req.body)
            .then(updatedUser => {
                if(updatedUser) {
                    res.status(200).json(updatedUser);
                }
                else {
                    res.status(404).json({
                        message: 'The user with the specified ID does not exist.'
                    });
                };
            })
            .catch(err => {
                res.status(500).json({
                    err: err,
                    message: 'The user information could not be modified.'
                });
            });
    }
    else {
        res.status(400).json({
            message: 'Please provide a name and bio for the user.'
        });
    };
});
//DELETE Request
server.delete('/api/posts/:id', (req, res) => {
    const {id} = req.params;
    db.remove(id)
        .then(deletedUser => {
            if(deletedUser) {
                res.status(200).json(deletedUser);
            }
            else {
                res.status(404).json({
                    message: 'The user with the specified ID does not exist.'
                });
            };
        })
        .catch(err => {
            res.status(500).json({
                err: err,
                message: 'The user could not be removed.'
            })
        })
})

//Server listening
 server.listen(5000, () => {
    console.log(`server listening on port ${port}`)
}) 