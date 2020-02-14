const express = require('express');
const router = express.Router();
const Projects = require('../data/helpers/projectModel.js');

router.get('/', (req, res) => {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Server could not process your request" })
        })
});
router.get('/:id', validateProjectId, (req, res) => {
    const { id } = req.params
    Projects.get(id)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Server could not process your request" })
        })
});
router.post('/', validateProjectBody, (req, res) => {
    Projects.insert(req.body)
    .then(project => {
        res.status(201).json(project)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Server could not process your request" })
    })
});
router.delete('/:id', validateProjectId, (req, res) => {
    const { id } = req.params;
    Projects.remove(id)
        .then(del => {
            res.status(200).json(del)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Server could not process your request" })
        })
});
router.put('/:id', validateProjectId, validateProjectBody, (req, res) => {
    const { id } = req.params;
    const body = req.body;
    Projects.update(id, body)
        .then(newProj => {
            res.status(200).json(newProj)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Server could not process your request" })
        })
});
router.get('/:id/actions', validateProjectId, (req, res) => {
    const {id} = req.params;
    Projects.getProjectActions(id)
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Server could not process your request" })
        })
})

module.exports = router;

function validateProjectBody(req, res, next){
    const body = req.body;
    if(body.name && body.description){
        next();
    } else {
        res.status(400).json({ error: "Name and description properties are required" })
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