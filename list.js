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
}

// Function to display a list
function displayList(listIndex) {
  const selectedList = lists[listIndex];
  const listTitle = document.querySelector('.list-content h2');
  const listItems = document.querySelector('.list-content2');

  listTitle.textContent = selectedList.name;
  listItems.innerHTML = '';

  selectedList.items.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = item;
    li.className = "list-item"

    
    
    const removeButton = document.createElement("i");
    removeButton.className = "fa-solid fa-x delete"

    removeButton.addEventListener('click', () => {
      selectedList.items.splice(index, 1);
      displayList(listIndex);
      saveListsToLocalStorage();
    });

    
    li.appendChild(removeButton);
    
    listItems.appendChild(li);
  });
}

const addItemButton = document.getElementById('add-item');
addItemButton.addEventListener('click', () => {
  const newItemText = document.getElementById('new-item-text').value;
  const currentListIndex = getCurrentListIndex();
  if (newItemText.trim() !== '') {
    addTodoItem(currentListIndex, newItemText);
    document.getElementById('new-item-text').value = ''; // Clear the input field
  }
  

  
});

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

function dark() {
  let moon = document.querySelector("fa-regular fa-moon")
  moon.addEventListener("click", function() {
    moon.className = "dark"
  })
}



// Event listener for creating a new list
const createListButton = document.getElementById('create-list');
createListButton.addEventListener('click', () => {
  const newListName = document.getElementById('new-list-name').value;
  if (newListName.trim() !== '') {
    createList(newListName);
    // Add code to update the list of created lists
    displayLists();
  }
  document.getElementById('new-list-name').value = ''
});

// Event listener for switching between lists
function displayLists() {
    const listsContainer = document.querySelector('.lists');
    listsContainer.innerHTML = '';
  
    lists.forEach((list, index) => {
      const listElement = document.createElement('div');
      listElement.textContent = list.name;
      listElement.classList.add('list-item');
      listElement.addEventListener('click', () => {
        switchToList(index)
      })
  
      const checkMarkIcon = document.createElement('i')
      checkMarkIcon.className = 'fa-solid fa-square';
      checkMarkIcon.addEventListener('click', () => {
        checkMarkChecked(index);
      })


      const removeListButton = document.createElement('i');
      removeListButton.className = "fa-solid fa-x delete"

      removeListButton.addEventListener('toggle', () => {
        removeList(index);
      });
      
      listElement.appendChild(removeListButton);
      listsContainer.appendChild(listElement);
    });
  }


function checkMarkChecked(index) {
    const checkMarkIcon = document.querySelector('fa-solid fa-square');
    const checked = checkMarkIcon.classList.add("fa-solid fa-square-check")
}



  function editItem(listIndex, itemIndex) {
    const selectedList = lists[listIndex];
    const itemText = selectedList.items[itemIndex];
  
    const listItem = document.querySelector('.list-content ul').children[itemIndex];
    const editInput = document.createElement('input');
    editInput.value = itemText;
  
    listItem.innerHTML = '';
    listItem.appendChild(editInput);
    editInput.focus();
  
    editInput.addEventListener('keyup', (event) => {
      if (event.key === 'Enter') {
        selectedList.items[itemIndex] = editInput.value;
        displayList(listIndex);
        saveListsToLocalStorage();
      }
    });
  
  }
  
  
  document.querySelector('.list-content ul').addEventListener('click', (event) => {
    const listItem = event.target.closest('li');
    if (listItem) {
      const listIndex = getCurrentListIndex();
      const itemIndex = Array.from(listItem.parentNode.children).indexOf(listItem);
      editItem(listIndex, itemIndex);
    }
  });
  
  function removeList(listIndex) {
    if (confirm("Are you sure you want to remove this list?")) {
      lists.splice(listIndex, 1);
      saveListsToLocalStorage();
      displayLists();
    }
  }
  
  function getCurrentListIndex() {
    const listTitle = document.querySelector('.list-content h2').textContent;
    return lists.findIndex(list => list.name === listTitle);
  }
// saves lists to localstorage
  function saveListsToLocalStorage() {
    localStorage.setItem('todoLists', JSON.stringify(lists));
  }
  
  // Function to retrieve lists from local storage
  function loadListsFromLocalStorage() {
    const storedLists = localStorage.getItem('todoLists');
    if (storedLists) {
      lists = JSON.parse(storedLists);
    }
  }
  
  // Initialize the application by loading lists from local storage and displaying them
  loadListsFromLocalStorage();
  displayLists();
  
  // Display the first list or a default list
  if (lists.length > 0) {
    displayList(0);
  }


  function toggleDarkMode() {
    const htmlID = document.documentElement;
    htmlID.classList.toggle('dark');
    console.log('Dark mode clicked')
  }
  
  const moon = document.getElementById("moon")
  moon.addEventListener("click", toggleDarkMode);

 