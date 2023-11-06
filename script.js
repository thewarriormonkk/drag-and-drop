const draggable_list = document.getElementById('draggable-list');
const check_button = document.getElementById('check');


const richestEconomies = [
    'U.S.A',
    'China',
    'Japan',
    'Germany',
    'India',
    'U.K.',
    'France',
    'Italy',
    'Brazil',
    'Canada'
];

// Store list items
const listItems = [];

let dragStartIndex;

createList();

// Insert list items into DOM
function createList() {
    [...richestEconomies]
        .map(a => ({ value: a, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(a => a.value)
        .forEach((country, index) => {
            const listItem = document.createElement('li');

            listItem.setAttribute('data-index', index);
            listItem.innerHTML = `
            <span class="number">${index + 1}</span>
            <div class="draggable" draggable="true">
                <p class="country-name">${country}</p>
                <i class="fas fa-grip-lines"></i>
            </div>
        `;

            listItems.push(listItem);

            draggable_list.appendChild(listItem);
        });

    addEventListener();
}

function dragStart() {
    // console.log('Event: ', 'dragstart');
    dragStartIndex = +this.closest('li').getAttribute('data-index');
}


function dragEnter() {
    // console.log('Event: ', 'dragenter');
    this.classList.add('over');
}


function dragLeave() {
    // console.log('Event: ', 'dragleave');
    this.classList.remove('over');
}


function dragOver(e) {
    // console.log('Event: ', 'dragover');
    e.preventDefault();
}


function dragDrop() {
    // console.log('Event: ', 'drop');
    const dragEndIndex = +this.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex);

    this.classList.remove('over');
}

// swap items that are dragged and dropped
function swapItems(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector('.draggable');
    const itemTwo = listItems[toIndex].querySelector('.draggable');

    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
}


// check order of list items
function checkOrder() {
    listItems.forEach((listItem, index) => {
        const countryName = listItem.querySelector('.draggable')
            .textContent.trim();

        if(countryName !== richestEconomies[index]) {
            listItem.classList.add('wrong');
        } else {
            listItem.classList.remove('wrong');
            listItem.classList.add('right');
        }
    })
}

function addEventListener() {
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable-list li');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);
    });

    dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
    });
}


check.addEventListener('click', checkOrder);



