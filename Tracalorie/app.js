// Storage controller
const StorageCtrl = (function() {
    
    return {
        storeItem: function(item) {
            let items;
            // Check if there's items in storage
            if(localStorage.getItem("items") === null) {
                items = [];
                items.push(item);
                // set localstorage
                localStorage.setItem("items", JSON.stringify(items));
            } else {
                // get what's already in localstorage
                items = JSON.parse(localStorage.getItem("items"));
                // push new item
                items.push(item);

                // reset localstorage
                localStorage.setItem("items", JSON.stringify(items));
            }
        },
        getItemsFromStorage: function(){
            let items;
            if(localStorage.getItem("items") === null) {
                items = [];
            } else {
                items = JSON.parse(localStorage.getItem("items"));
            }
            return items;
        },
        updateItemStorage: function(updatedItem) {
            let items = JSON.parse(localStorage.getItem("items"));
            items.forEach(function(item, index) {
                if(updatedItem.id === item.id) {
                    items.splice(index, 1, updatedItem);
                }
            });
            localStorage.setItem("items", JSON.stringify(items));
        },
        deleteItemFromStorage: function(id) {
            let items = JSON.parse(localStorage.getItem("items"));
            items.forEach(function(item, index) {
                if(id === item.id) {
                    items.splice(index, 1);
                }
            });
            localStorage.setItem("items", JSON.stringify(items));
        },
        clearStorage: function() {
            localStorage.removeItem("items");
        }
    }
})();

// Item controller
const ItemCtrl = (function() {
    // Item Constructor
    const Item = function(id, name, calories) {
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    // Data Structure
    const data = {
        items: StorageCtrl.getItemsFromStorage(),
        currentItem: null,
        totalCalories: 0
    }

    return {
        getItems: function() {
            return data.items;
        },
        addItem: function(name, calories) {
            //Create ID for meals
            let ID;
            if (data.items.length > 0 ) {
                ID = data.items[data.items.length - 1].id + 1;
            } else {
                ID = 0;
            }
            // Calories to number
            calories = parseInt(calories);

            // New item
            newItem = new Item(ID, name, calories);
            // Add to items arr
            data.items.push(newItem);

            return newItem;
        },
        getItemById: function(id) {
            let found = null;
            // loop through items
            data.items.forEach(function(item) {
                if (item.id === id) {
                    found = item;
                }
            })
            return found;
            
        },
        updateItem: function(name, calories) {
            // turn calories to number
            calories = parseInt(calories);
            let found = null;
            
            data.items.forEach(function(item) {
                if(item.id === data.currentItem.id) {
                    item.name = name;
                    item.calories = calories;
                    found = item;
                }
            })
            return found
        },
        deleteItem: function(id) {
            // get ids
            ids = data.items.map(function(item) {
                return item.id
            });

            //get index
            const index = ids.indexOf(id);
            
            // remove from arr
            data.items.splice(index, 1);
        },
        clearAll: function() {
            data.items = [];
        },
        setCurrentItem: function(item) {
            data.currentItem = item;
        },
        getCurrentItem: function() {
            return data.currentItem;
        },
        getTotal: function() {
            let total = 0;
            data.items.forEach(function(item) {
                total += item.calories;
            })
            data.totalCalories = total;

            return data.totalCalories
        },
        logData: function() {
            return data;
        }
    }
})();

// UI controller
const UICtrl = (function() {
    const UISelectors = {
        itemList: "#item-list",
        addBtn: ".add-btn",
        updateBtn: ".update-btn",
        deleteBtn: ".delete-btn",
        backBtn: ".back-btn",
        clearAll: ".clear-btn",
        itemNameInput: "#item-name",
        itemCaloriesInput: "#item-calories",
        totalCalories: ".total-calories",
        clearAll: ".clear-btn"
        
    }
    
    return {
        populateItemList: function(items) {
            let html = "";
            items.forEach(function(item){
                html += `
                <li class="collection-item" id="item-${item.id}">
                    <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                    <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
                </li>
                `
            })
            document.querySelector(UISelectors.itemList).innerHTML = html;
        },

        getItemInput: function() {
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemCaloriesInput).value,
            }
        },
        addListItem: function(item) {
            // Create LI element
            const li = document.createElement("li");
            li.className = "collection-item";
            li.id = `item-${item.id}`;
            li.innerHTML = `
                <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
            `;
            document.querySelector(UISelectors.itemList).insertAdjacentElement("beforeend", li);
        },
        updateListItem: function(item) {
            let listItems = document.querySelectorAll("li");
            // Turn nodeList into Arr
            listItems = Array.from(listItems);
            listItems.forEach(function(listItem) {
                const itemID = listItem.getAttribute("id");
                if(itemID === `item-${item.id}`){
                    document.querySelector(`#${itemID}`).innerHTML = `
                    <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                    <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
                `;
                }
            })
        },
        deleteListItem: function(id) {
            const itemID = `#item-${id}`;
            const item = document.querySelector(itemID);
            item.remove();
        },
        clearFields: function() {
            document.querySelector(UISelectors.itemNameInput).value = "";
            document.querySelector(UISelectors.itemCaloriesInput).value = "";
        },
        addItemToForm: function() {
            document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
            document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
            UICtrl.showEditState();
        },
        removeItems: function() {
            let listItems = document.querySelectorAll("li");
            listItems = Array.from(listItems);

            listItems.forEach(function(item){
                item.remove();
            })
        },
        showTotal: function(total) {
            document.querySelector(UISelectors.totalCalories).textContent = total;
        },
        clearEditState: function() {
            UICtrl.clearFields();
            document.querySelector(UISelectors.deleteBtn).style.display = "none";
            document.querySelector(UISelectors.updateBtn).style.display = "none";
            document.querySelector(UISelectors.backBtn).style.display = "none";
            document.querySelector(UISelectors.addBtn).style.display = "inline";
        },
        showEditState: function() {
            document.querySelector(UISelectors.deleteBtn).style.display = "inline";
            document.querySelector(UISelectors.updateBtn).style.display = "inline";
            document.querySelector(UISelectors.backBtn).style.display = "inline";
            document.querySelector(UISelectors.addBtn).style.display = "none";
        },
        getSelectors: function() {
            return UISelectors
        }
    }
})();

// App controller
const App = (function(ItemCtrl, StorageCtrl, UICtrl) {
    // Load event listeners
    const loadEventListeners = function() {
        const UISelectors = UICtrl.getSelectors();

        document.querySelector(UISelectors.addBtn).addEventListener("click", itemAddSubmit);
        // Icon click event
        document.querySelector(UISelectors.itemList).addEventListener("click", itemEditClick);

        // Update item event
        document.querySelector(UISelectors.updateBtn).addEventListener("click", itemUpdateSubmit);

        // Delete item event
        document.querySelector(UISelectors.deleteBtn).addEventListener("click", itemDeleteSubmit);

        // Back btn event
        document.querySelector(UISelectors.backBtn).addEventListener("click", function(e) {
            UICtrl.clearEditState();
            e.preventDefault();
        });

        // Clear all
        document.querySelector(UISelectors.clearAll).addEventListener("click", clearAllItems);
    }

    // Disable enter button
    document.addEventListener("keypress", function(e) {
        if(e.keycode === 13 || e.which === 13) {
            e.preventDefault();
            return false;
        }
    })

    const itemAddSubmit = function(e) {
        const input = UICtrl.getItemInput();
        
        if(input.name !== "" && input.calories !== "") {
            const newItem = ItemCtrl.addItem(input.name, input.calories);
            UICtrl.addListItem(newItem);

            // Add to total
            const total = ItemCtrl.getTotal();
            UICtrl.showTotal(total);

            // Store in localstorage
            StorageCtrl.storeItem(newItem);

            //Clear fields
            UICtrl.clearFields();
        }

        e.preventDefault();
    }
    
    const itemEditClick = function(e) {
        if (e.target.classList.contains("edit-item")) {
            // get item id
            const listId = e.target.parentNode.parentNode.id;

            // break to get number id
            const listIdArr = listId.split("-");
            const id = parseInt(listIdArr[1]);

            // get item
            const itemToEdit = ItemCtrl.getItemById(id);

            ItemCtrl.setCurrentItem(itemToEdit);

            UICtrl.addItemToForm();
        }
        e.preventDefault();
    };

    const itemUpdateSubmit = function(e) {
        // get item input
        const input = UICtrl.getItemInput();
   
        const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

        // Update UI
        UICtrl.updateListItem(updatedItem);

        // Upd total
        const total = ItemCtrl.getTotal();
        UICtrl.showTotal(total);

        // Update storage
        StorageCtrl.updateItemStorage(updatedItem);

        UICtrl.clearEditState();

        e.preventDefault();
    }

    const itemDeleteSubmit = function(e) {
        const currentItem = ItemCtrl.getCurrentItem();
        ItemCtrl.deleteItem(currentItem.id);

        // delete from UI
        UICtrl.deleteListItem(currentItem.id); 

        // Upd total
        const total = ItemCtrl.getTotal();
        UICtrl.showTotal(total);

        // delete from storage
        StorageCtrl.deleteItemFromStorage(currentItem.id);

        UICtrl.clearEditState();

        e.preventDefault();
    }
    const clearAllItems = function(e) {
        // delete all items from data
        ItemCtrl.clearAll();

        // Upd total
        const total = ItemCtrl.getTotal();
        UICtrl.showTotal(total);

        //remove from UI
        UICtrl.removeItems();

        StorageCtrl.clearStorage();

        e.preventDefault();
    }

    return {
        init: function() {
            UICtrl.clearEditState();

            const items = ItemCtrl.getItems();

            UICtrl.populateItemList(items);

            const total = ItemCtrl.getTotal();
            UICtrl.showTotal(total);

            loadEventListeners();
        }
    }
})(ItemCtrl, StorageCtrl, UICtrl);

App.init();