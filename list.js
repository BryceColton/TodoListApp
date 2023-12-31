// Define an array to store lists
let lists = [];

// Function to create a new list
function createList(name) {
  const newList = {
    name: name,
    items: [],
  };
  lists.push(newList);
  saveListsToLocalStorage();

  currentListIndex = lists.length - 1;
  displayList(currentListIndex)
}

// Function to display a list
function displayList(listIndex) {
  const selectedList = lists[listIndex];
  const listTitle = document.querySelector('.list-content h2');
  const listItems = document.querySelector('.list-content2');

  listTitle.textContent = selectedList.name;
  listItems.innerHTML = '';

selectedList.items.forEach((item, index) => {
  const div = document.createElement('div');
  div.className = "list-item";
  div.draggable = true;

  const checkMarkIcon = document.createElement('i');
  checkMarkIcon.className = "ri-checkbox-blank-line";
  checkMarkIcon.addEventListener('click', () => {
    checkMarkIcon.classList.toggle("ri-checkbox-fill");
    saveListsToLocalStorage();
  });

  const editButton = document.createElement('i');
  editButton.className = "ri-edit-line";
  editButton.addEventListener('click', () => {
    editItem(listIndex, index);
  });

  div.addEventListener('dragstart', drag)

  const itemText = document.createElement('span');
  itemText.textContent = item;

  const trashDiv = document.getElementById("trashDiv")

  const trash = document.getElementById("trash")
  trash.addEventListener('click', () => {
    const isChecked = checkMarkIcon.classList.contains("ri-checkbox-fill");
    if (isChecked) {
      //Remove Items if selected by checkbox
      selectedList.items.splice(index, 1);
      displayList(listIndex);
      saveListsToLocalStorage();
      // trashDiv.appendChild(trash);
    }
  });

  div.appendChild(checkMarkIcon);
  div.appendChild(itemText);
  listItems.appendChild(div);
  div.appendChild(editButton)
});

}


function funcAddItem(){
const addItemButton = document.getElementById('add-item');
  const newItemText = document.getElementById('new-item-text').value;
  let currentListIndex = getCurrentListIndex();
  if (newItemText.trim() !== '') {
    addTodoItem(currentListIndex, newItemText);
    document.getElementById('new-item-text').value = ''; // Clear the input field
  }
  
}
  
// Function to switch between lists
function switchToList(listIndex) {
  displayList(listIndex);
}

// Function to add a to-do item to the current list
function addTodoItem(listIndex, itemText) {
  lists[listIndex].items.push(itemText)
  displayList(listIndex);
  saveListsToLocalStorage();
}




// Event listener for creating a new list
const createListButton = document.getElementById('create-list');
createListButton.addEventListener('click', () => {
  const newListName = document.getElementById('new-list-name').value;
  if (newListName.trim() !== '') {
    createList(newListName);
    // Add code to update the list of created lists
    updateLists();
  }
  document.getElementById('new-list-name').value = ''
});

// Event listener for switching between lists
function updateLists() {
    const titlesContainer = document.getElementById('titles')
    titles.innerHTML = null;
  
    lists.forEach((list, index) => {
      const listElement = document.createElement('div');
      listElement.textContent = list.name;
      listElement.className = 'list-title'
      listElement.addEventListener('click', () => {
        switchToList(index)
      })

      const removeListButton = document.createElement('i');
      removeListButton.className = "fa-solid fa-trash-can"

      removeListButton.addEventListener('click', () => {
        removeList(index);
      });
      listElement.appendChild(removeListButton);
      titlesContainer.appendChild(listElement);
    });
  }




  function editItem(listIndex, itemIndex) {
    const selectedList = lists[listIndex];
    const itemText = selectedList.items[itemIndex];
  
    const listItem = document.querySelector('.list-content2').children[itemIndex];
    const itemTextElement = listItem.querySelector('span');
  
    const editInput = document.createElement('input');
    editInput.value = itemText;
  
    listItem.replaceChild(editInput, itemTextElement);
    editInput.focus();
  
    editInput.addEventListener('keyup', (event) => {
      if (event.key === 'Enter') {
        selectedList.items[itemIndex] = editInput.value;
        displayList(listIndex);
        saveListsToLocalStorage();
      }
    });

    editInput.addEventListener('blur', (event) => {
      selectedList.items[itemIndex] = editInput.value;
      displayList(listIndex);
      saveListsToLocalStorage();
    });
  }
  
  
  
  document.querySelector('.list-content2').addEventListener('click', (event) => {
    const listItem = event.target.closest('li');
    if (listItem) {
      const listIndex = getCurrentListIndex();
      const itemIndex = [...listItem.parentNode.children].indexOf(listItem);
      editItem(listIndex, itemIndex);
    }
  });
  
  function removeList(listIndex) {
    if (confirm("Are you sure you want to remove this list?")) {
      lists.splice(listIndex, 1);
      saveListsToLocalStorage();
      loadListsFromLocalStorage()
      updateLists();
    }
  }
  
  function getCurrentListIndex() {
    const listTitle = document.querySelector('.list-content h2').textContent;
    return lists.findIndex(list => list.name === listTitle);
  }
// save lists to localstorage
  function saveListsToLocalStorage() {
    localStorage.setItem('todoLists', JSON.stringify(lists));
  }
  
  function loadListsFromLocalStorage() {
    const storedLists = localStorage.getItem('todoLists');
    if (storedLists) {
      lists = JSON.parse(storedLists);
    }
  }
  
  // Initialize the application by loading lists from local storage and displaying them
  loadListsFromLocalStorage();
  updateLists();
  
  // Display the first list or a default list
  if (lists.length > 0) {
    displayList(0);
  }


  function toggleDarkMode() {
    const htmlID = document.documentElement;
    htmlID.classList.toggle('dark');
  }
  
  const moon = document.getElementById("moon")
  moon.addEventListener("click", toggleDarkMode);


// function plus to create a new input for adding a list
  const plus = document.getElementById("plus");
  plus.addEventListener("click", () => {
    // Create a new input field with the id "new-item-text"
    const addItemContainer = document.getElementById("addItemContainer");
    const listContent2 = document.getElementById('list-content2')
  
    const newItemInput = document.createElement("input");
    newItemInput.id = "new-item-text";
    newItemInput.className = "bg-gray-400 text-white h-fit w-full rounded-2xl"
    newItemInput.placeholder = "    Add a new item and press Enter";
    
    // Add an event listener for Enter key press
    newItemInput.addEventListener("keydown", (event) => {
      if (event.key === 'Enter') {
        const newItemText = newItemInput.value;
        const currentListIndex = getCurrentListIndex();
        if (newItemText.trim() !== '') {
          addTodoItem(currentListIndex, newItemText);
          newItemInput.value = ''; 

          // listContent2.removeChild(newItemInput);
        }
      }
    });
  

    listContent2.appendChild(newItemInput);
  });

  function allowDrop(event) {
    event.preventDefault();
  }

  function drag(event) {
    event.dataTransfer.setData("text/plain", event.target.innerText);
  }


  function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData('text/plain');
    const target = event.target;
  
    if (target.classList.contains('list-item')) {
      const sourceIndex = [...target.parentNode.children].indexOf(event.target);
      const destinationIndex = [...target.parentNode.children].indexOf(target);
  
      const listIndex = getCurrentListIndex();
      const selectedList = lists[listIndex];
      selectedList.items.splice(sourceIndex, 1);
      selectedList.items.splice(destinationIndex, 0, data);
  
      displayList(listIndex);
      saveListsToLocalStorage();
    }
  }
  
  









