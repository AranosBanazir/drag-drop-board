// ? Grab references to the important DOM elements.
const timeDisplayEl = $('#time-display');
const swimlanes = $('.swim-lanes');
const projectFormEl = $('#project-form');
const projectNameInputEl = $('#project-name-input');
const projectTypeInputEl = $('#project-type-input');
const projectDateInputEl = $('#taskDueDate');
//lanes
const todoList = $('#todo-cards')
const inprogressList = $('#in-progress-cards')
const doneList = $('#done-cards')

//TODO display current date and time
function timeDisplay(){
  const currentDateTime = dayjs().format('MMM DD, YYYY hh:mm:ss')

    timeDisplayEl.text(currentDateTime)
}



//create cards by ID
function createCard(data) {
  const card = $(`
    <div class="card draggable" data-id="${data.id}" data-status="${data.status}">
      <div class="card-body">
        <h5 class="card-title">${data.name}</h5>
        <p class="card-text">${data.type}</p>
        <p class="card-text">${data.date}</p>
        <button class="btn btn-danger">Delete</button>
      </div>
    </div>
  `)
  return card
}
//LOOK to newTask()

//render new cards
function renderCards(){
  const projects = getProjects()
  todoList.empty()
  inprogressList.empty()
  doneList.empty()
  for(const data of projects){
    const cardEl = createCard(data)
    if (data.status == 'todo'){
      todoList.append(cardEl)
    } else if (data.status === 'in-progress'){
      inprogressList.append(cardEl)
    }else{
      doneList.append(cardEl)
    }
  }

 $('.draggable').draggable({
  stack: '.swim-lanes'
 })
}

//helper load/save

function getProjects(){
  const projects = JSON.parse(localStorage.getItem('projects')) || []
  return projects
}

function saveProjects(array){
  localStorage.setItem('projects', JSON.stringify(array))
}




//create cards by form values
function newTask(){
  const todo = $('#todo-cards')
  const newCard = $(
    `
    <div class="card">
  <div class="card-header text-align-center">
    ${projectNameInputEl.val()}
  </div>
  <div class="card-body">
    <h5 class="card-title">${projectTypeInputEl.val()}</h5>
    <p class="card-text">${projectDateInputEl.val()}</p>
    <a href="#" class="btn btn-danger">Delete</a>
  </div>
</div>
    `
  )
  newCard.appendTo(todo)
}



function handleFormSubmit(e){
  e.preventDefault()
  const projDate = projectDateInputEl.val()
  const projName = projectNameInputEl.val()
  const projType = projectTypeInputEl.val()
  const projects = getProjects()
  const newProject = {
    name: projName,
    type: projType,
    date: projDate,
    id: Math.floor(Math.random() * 10000),
    status: 'todo'
  }

  projects.push(newProject)

  saveProjects(projects)
  renderCards()

  projectDateInputEl.val('')
  projectNameInputEl.val('')
  projectTypeInputEl.val('')
}






$(document).ready(function(){
  projectDateInputEl.datepicker()
  timeDisplay()
  setInterval(timeDisplay, 1000)
  renderCards()
  projectFormEl.on('submit', handleFormSubmit)
  $(swimlanes).droppable({
    drop: function(e,u){
      const targetListID = e.target.id.replace('-cards', '')

      console.log(targetListID)
    }
  })
})



 