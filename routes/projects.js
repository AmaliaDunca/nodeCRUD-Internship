const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


const Project = mongoose.model('Project', new mongoose.Schema({

    parent_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    description: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100
    },



}))

router.get('/', async (req, res) => {
    const projects = await Project.find().sort('name');
    res.send(projects);
});

router.get('/:project_id', async (req, res) => {

    const project = await Project.findById(req.params.project_id);

    if (!project) return res.status(404).send('Project with given ID not found')
    res.send(project)
});

router.post('/', async (req, res) => {
    const { error } = validateProject(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const parent_id = await Project.findById(req.body.parent_id);
    if (!parent_id) return res.status(400).send('Invalid parent_id');

    let project = new Project({
        // id: req.body.id,
        parent_id: req.body.parent_id,
        name: req.body.name,
        description: req.body.description

    });

    project = await project.save();
    res.send(project);
});

router.put('/:project_id', async (req, res) => {
    const { error } = validateProject(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const project = await Project.findByIdAndUpdate(req.params.project_id,
        {
            name: req.body.name,
            description: req.body.description
        }, { new: true });

    if (!project) return res.status(404).send('Project with given ID not found')

    res.send(project)

})

router.delete('/:project_id', async (req, res) => {
    const project = await Project.findByIdAndRemove(req.params.project_id);
    if (!project) return res.status(404).send('Project with given ID not found');

    res.send(project);

})

function validateProject(project) {
    const schema = {
        // id: Joi.string().min(3).max(10).required(),
        parent_id: Joi.required(),
        name: Joi.string().min(5).max(50).required(),
        description: Joi.string().min(5).max(100).required()
    }

    return result = Joi.validate(project, schema);
}

module.exports = router;