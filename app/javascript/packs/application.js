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

import 'pretty-checkbox/src/pretty-checkbox.scss'

class App {

    //let's declare all stuff we need in our app (like buttons, inputs etc)
    constructor() {
        this.csrf = document.querySelector('meta[name="csrf-token"]').content;
        this.addTaskShowButton = document.querySelector('#add-task-show');
        this.addTaskHideButton = document.querySelector('#add-task-cancel')
        this.checkboxes = document.querySelectorAll('.todo-check');
        this.addTaskButton = document.querySelector('#add-task-submit');
    }

    //it this method we add all required event listeners
    mount() {
        //update task if checbox is changed
        this.checkboxes.forEach((checkbox) => {
            checkbox.addEventListener('click', (e) => {
                const id = e.target.id.split('-')[2];
                this.updateTask(id)
                const label = e.target.nextElementSibling.querySelector('label');
                label.classList.toggle('crossed-out')
            })
        })

        //show add task form
        this.addTaskShowButton.addEventListener('click', () => {
            document.querySelector('.add-task-container').classList.remove('d-none')
        })

        //hide add task form
        this.addTaskHideButton.addEventListener('click', () => {
            document.querySelector('.add-task-container').classList.add('d-none')
        })

        //add new task
        this.addTaskButton.addEventListener('click', () => {this.addTask()})

    }

    //this method updates task
    async updateTask(id) {
        const response = await fetch(`/api/task/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': this.csrf
              },
        })
    }

    async addTask() {
        const project = document.querySelector('#add-task-select-project').value
        const title = document.querySelector('#add-task-title').value
        const data = {
            project,
            title
        }
        const response = await fetch('/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': this.csrf
              },
            body: JSON.stringify(data)
        })

        console.log(response.status)
        document.querySelector('.add-task-container').classList.add('d-none')
        document.location.reload(true)
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const app = new App();
    app.mount()
})

