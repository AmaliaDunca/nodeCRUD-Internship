const Joi = require('joi');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const projects = require('./routes/projects')

mongoose.connect('mongodb://localhost/projects')
    .then(() => console.log('Connect to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'))

app.use(express.json());
app.use('/projects', projects);

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}..`)
})


// mongoose.connect('mongodb://localhost/playground')
//     .then(() => console.log('Connect to MongoDB...'))
//     .catch(err => console.error('Could not connect to MongoDB...', err))

// const projectSchema = new mongoose.Schema({
//     name: String,
//     author: String,
//     parent_project_id: String,
//     date: { type: Date, default: Date.now },
//     description : String


// });

// const Project = mongoose.model('Project', projectSchema);

// async function CreateProject() {

//     const project = new Project({
//         name: ' JS Project',
//         author: 'Amy',
//         parent_project_id: String,
//         description: 'This is a JS project for exam'
//     });

//     const result = await project.save();
//     console.log(result)
// }

// CreateProject();