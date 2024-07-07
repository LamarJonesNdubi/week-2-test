document.addEventListener('DOMContentLoaded', () => {
  const itemInput = document.getElementById('item-input');
  const addButton = document.getElementById('add-button');
  const clearButton = document.getElementById('clear-button');
  const shoppingList = document.getElementById('shopping-list');

  
  let items = JSON.parse(localStorage.getItem('shoppingList')) || [];

  
  function renderList() {
    shoppingList.innerHTML = '';
    items.forEach((item, index) => {
      const listItem = document.createElement('li');
      listItem.textContent = item.name;
      if (item.purchased) {
        listItem.classList.add('purchased');
      }
      listItem.addEventListener('click', () => togglePurchased(index));
      listItem.addEventListener('dblclick', () => editItem(index));
      shoppingList.appendChild(listItem);
    });
  }

  
  function addItem() {
    const itemName = itemInput.value.trim();
    if (itemName !== '') {
      items.push({ name: itemName, purchased: false });
      itemInput.value = '';
      saveItems();
      renderList();
    }
  }


  function togglePurchased(index) {
    items[index].purchased = !items[index].purchased;
    saveItems();
    renderList();
  }

  
  function clearList() {
    items = [];
    saveItems();
    renderList();
  }


  function editItem(index) {
    const newName = prompt('Edit item:', items[index].name);
    if (newName !== null) {
      items[index].name = newName;
      saveItems();
      renderList();
    }
  }

  
  function saveItems() {
    localStorage.setItem('shoppingList', JSON.stringify(items));
  }

  addButton.addEventListener('click', addItem);
  clearButton.addEventListener('click', clearList);

  renderList();
});
