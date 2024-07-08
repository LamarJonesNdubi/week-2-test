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

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = item.purchased;
      checkbox.addEventListener('change', () => togglePurchased(index));
      listItem.appendChild(checkbox);

      const itemText = document.createElement('span');
      itemText.textContent = item.name;
      if (item.purchased) {
        itemText.classList.add('purchased');
      }
      itemText.addEventListener('dblclick', () => editItem(index));
      listItem.appendChild(itemText);

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => deleteItem(index));
      listItem.appendChild(deleteButton);

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

  function deleteItem(index) {
    items.splice(index, 1);
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
