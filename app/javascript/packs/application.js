/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb


// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)

import 'core-js/stable'
import 'regenerator-runtime/runtime'

import 'bootstrap-4-grid/css/grid.min.css'

import '../css/main.css'

const csrf = document.querySelector('meta[name="csrf-token"]').content;

async function updateTask(id) {
    const response = await fetch(`/api/task/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrf
          },
    })
    console.log(response.status)
}

const checkboxes = document.querySelectorAll('.todo-check');

checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('click', (e) => {
        const id = e.target.id.split('-')[2];
        console.log(id)
        updateTask(id)
    })
})

async function getData() {
    const response = await fetch('/api/tasks');
    const data = await response.json()
}

async function addTask() {
    const project = document.querySelector('#add-task-select-project').value
    const title = document.querySelector('#add-task-title').value
    console.log(project, title)
    const data = {
        project,
        title
    }
    const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrf
          },
        body: JSON.stringify(data)
    })

    console.log(response.status)
}

const addTaskButton = document.querySelector('#add-task-submit');

addTaskButton.addEventListener('click', addTask)
