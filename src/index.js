import style from './main.css';
// import component from './component.js';
// import logo from './logo.svg';co


const listsContainer = document.querySelector('[data-lists]')
const newListFormat = document.querySelector('[data-new-list-form]')
const newListInp = document.querySelector('[data-new-list-input]')
const deleteListButt = document.querySelector('[data-delete-list-button]')

const LOCAL_STORAGE_LIST_KEY = 'task.lists'
const LOCAL_STORAGE_SELECT_LIST_ID_KEY = 'task.selectListId'
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || []
let selectListId = localStorage.getItem(LOCAL_STORAGE_SELECT_LIST_ID_KEY)


listsContainer.addEventListener('click', ev => {
    if (ev.target.tagName.toLowerCase() === 'li') {
      selectListId = ev.target.dataset.listId
      saveAndRender()
    }
  })


deleteListButt.addEventListener('click', ev => {
    ev.preventDefault()
    lists = lists.filter(list => list.id !== selectListId)
    selectListId = null
    saveAndRender()
  })

newListFormat.addEventListener('submit', ev => {
    ev.preventDefault()
    const listName = newListInp.value
    if (listName == null || listName === '') return
    const list = createList(listName)
    newListInp.value = null
    lists.push(list)
    render()
})

function createList(name) {
   return { id: Date.now().toString(), name: name, tasks: [] }
}

function saveAndRender() {     
    save() 
    render()
  }
  
  
  
  
  function save() {   
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists))
    localStorage.setItem(LOCAL_STORAGE_SELECT_LIST_ID_KEY, selectListId)
  
  }
  


function render() {
    clearElement(listsContainer)
    renderLists()

    
}



function renderLists() {
    lists.forEach(list => {
        const listElement = document.createElement('li')
        listElement.dataset.listId = list.id
        listElement.classList.add("list-name")
        listElement.innerText = list.name
        if (list.id === selectListId) listElement.classList.add('active-list')
        listsContainer.appendChild(listElement)
        listsContainer.appendChild(listElement)
      


    })

}

function clearElement(element) {
    while (element.firstChild) {
            element.removeChild(element.firstChild)
    }
}

render()

