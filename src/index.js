

const listsContainer = document.querySelector('[data-lists]')
const newListFormat = document.querySelector('[data-new-list-form]')
const newListInp = document.querySelector('[data-new-list-input]')
const deleteListButt = document.querySelector('[data-delete-list-button]')

const listDisplayContainer = document.querySelector('[data-list-display-container]')
const listTitleEl = document.querySelector('[data-list-title]')
const listCountEl = document.querySelector('[data-list-count]')
const tasksCont = document.querySelector('[data-tasks]')



const LOCAL_STORAGE_LIST_KEY = 'task.lists'
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedListId'
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || []
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY)


listsCont.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'li') {
      selectedListId = e.target.dataset.listId
      saveAndRender()
    }
  })


deleteListButt.addEventListener('click', e => {
    lists = lists.filter(list => list.id !== selectedListId)
    selectedListId = null
    saveAndRender()
  })

newListFormat.addEventListener('submit', e => {
    e.preventDefault()
    const listName = newListInput.value
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
    localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId)
  
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
        if (list.id === selectedListId) listElement.classList.add('active-list')
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

