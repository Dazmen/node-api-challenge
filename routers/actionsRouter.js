const express = require('express');
const router = express.Router();
const Actions = require('../data/helpers/actionModel.js');
const Projects = require('../data/helpers/projectModel.js');

router.get('/', (req, res) => {
    Actions.get()
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Server could not process your request" })
        })
});
router.get('/:id', validateActionId, (req, res) => {
    const { id } = req.params;
    Actions.get(id)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Server could not process your request" })
        })
});
router.post('/project/:id', validateProjectId, validateActionBody, (req, res) => {
    const { id } = req.params;
    const body = req.body;
    body.project_id = id
    Actions.insert(body)
        .then(newAction => {
            res.status(201).json(newAction)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Server could not process your request" })
        })
});
router.put('/:id', validateActionId, validateActionBody, (req, res) => {
    const { id } = req.params;
    const body = req.body;
    Actions.update(id, body)
        .then(editAct => {
            res.status(200).json(editAct)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Server could not process your request" })
        })
});
router.delete('/:id', validateActionId, (req, res) => {
    const { id } = req.params;
    Actions.remove(id)
        .then(del => {
            res.status(200).json(del)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Server could not process your request" })
        })
});

module.exports = router;

function validateActionBody(req, res, next){
    const body = req.body;
    if(body.description && body.description.length <= 128 && body.notes){
        next();
    } else {
        res.status(400).json({ error: "Description (up to 128 characters max) and notes properties are required"})
    }
};
function validateProjectId(req, res, next){
    const { id } = req.params;
    Projects.get(id)
        .then(project => {
            if(project){
                next();
            } else {
                res.status(404).json({ error: "Invalid Project Id" })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Server could not process your request" })
        })
};
function validateActionId(req, res, next){
    const { id } = req.params;
    Actions.get(id)
        .then(project => {
            if(project){
                next();
            } else {
                res.status(404).json({ error: "Invalid Action Id" })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Server could not process your request" })
        })
};