let filter = document.getElementById("filter");
let list = document.getElementById("list");

filter.addEventListener("keyup", filtering);

function filtering() {
  let inputValue = filter.value.toUpperCase();
  let listItems = list.querySelectorAll("li.collection-item");

  for (let i = 0; i < listItems.length; i++) {
    let links = listItems[i].getElementsByTagName('a')[0];
    if (links.innerHTML.toUpperCase().indexOf(inputValue) > -1) {
      listItems[i].style.display = "";
    } else {
      listItems[i].style.display = "none";
    }
  }
}
