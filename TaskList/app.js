function dateFormat(date) {
    let months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'June',
        'July',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ];

    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    
    return `${months[month]} ${day}, ${year}`
}

const currentDate = dateFormat(new Date());
const theDate = document.querySelector('.theDate');
theDate.innerText = currentDate;

const addBtn = document.querySelector('.add-btn');
const backBtn = document.querySelector('.goBack');
const modal = document.querySelector('.modal');


addBtn.addEventListener('click', runModal);
backBtn.addEventListener('click', closeModal);

function runModal() {
    modal.style.display = "flex";
    addBtn.parentElement.style.display = "none";
}

function closeModal() {
    modal.style.display = "none";
    addBtn.parentElement.style.display = "flex";
}

const form = document.querySelector('form');    
const input = document.querySelector('.taskInput');
const submit = document.querySelector('.submit-btn');
const list = document.querySelector('.things');

form.addEventListener('submit', addItem);

function addItem(e) {
    if(input.value === '' || input.value === 'DO NOT LEAVE THIS FIELD BLANK') {
        input.style.color = 'red';
        input.value = 'DO NOT LEAVE THIS FIELD BLANK';
    } else {
        const li = document.createElement('li'); 
        li.className = 'list-item';
        li.innerHTML = input.value + '<span class="delete">&#10006</span>';
        list.appendChild(li);
        // clear input
        input.value = '';
        closeModal();
    }

    
    e.preventDefault();
    
}

const deleteBtn = document.querySelectorAll('.delete');

list.addEventListener('click', removeItem);

function removeItem(e) {
    if (e.target.classList.contains("delete")) {
        e.target.parentElement.remove();
    }
}

const bgList = document.querySelector('.hamburger');
const bgModal = document.querySelector('.bg-modal');
const header = document.getElementById('header');
const bgModalBtn = document.querySelector('.close-modal');

bgList.addEventListener('click', openBgModal);
bgModal.addEventListener('click', changeBg);
bgModalBtn.addEventListener('click', closeBg);

function openBgModal() {
    bgModal.style.display = "block";
}
function closeBg() {
    bgModal.style.display = "none";
}

function changeBg(e) {
    if (e.target.classList.contains('deer')) {
        header.style.backgroundImage = "url(backgrounds/deer.jpg)";
        closeBg();
    } else if (e.target.classList.contains('hills')) {
        header.style.backgroundImage = "url(backgrounds/hills.png)";
        closeBg();
    } else if (e.target.classList.contains('houses')) {
        header.style.backgroundImage = "url(backgrounds/houses.jpg)";
        closeBg();
    } else if (e.target.classList.contains('landscape')) {
        header.style.backgroundImage = "url(backgrounds/landscape.png)";
        closeBg();
    } else if (e.target.classList.contains('mountains')) {
        header.style.backgroundImage = "url(backgrounds/mountains.png)";
        closeBg();
    }
}

