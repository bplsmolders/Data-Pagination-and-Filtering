/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/


/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
const perPage = 9;

function showPage (list, page){
  const startIndex = (page * perPage) - perPage;
  const endIndex = (page * perPage);
  const studentList = document.querySelector('.student-list');
  studentList.innerHTML = '';

  for (let i = 0; i < list.length; i ++){
    if (i >= startIndex && i < endIndex ){
      let htmlString = `
        <li class="student-item cf">
          <div class="student-details">
            <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
            <h3>"${list[i].name.title}, ${list[i].name.first} ${list[i].name.last}"</h3>
            <span class="email">"${list[i].email}"</span>
          </div>
          <div class="joined-details">
            <span class="date">"Joined ${list[i].registered.date}"</span>
          </div>
        </li>
        `
      studentList.insertAdjacentHTML('beforeend', htmlString);
    }
  }
  return studentList;
}


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

function addPagination (list){
  const amountOfPages = Math.ceil(list.length / perPage)+1;
  const linkList = document.querySelector('.link-list');
  linkList.innerHTML = '';
  for (let i = 1; i < amountOfPages; i ++){
    let htmlString = `
      <li>
        <button type="button">${i}</button>
      </li>
    `;
    linkList.insertAdjacentHTML('beforeend', htmlString);
  }

  const firstButton = linkList.firstElementChild;
  firstButton.className = 'active';

  linkList.addEventListener('click', (e) => {
    if (e.target.className !== 'active'){
      let activeButton = document.querySelector('.active')
      activeButton.className = '';
      e.target.className = 'active';
      let page = e.target.textContent;
      showPage(data, page);
    }
  });
  return linkList;
}

// Call functions
showPage (data, 1);
addPagination(data);

// Extra search function
const label = document.createElement('label');
label.for = 'search'
label.className = 'student-search'

const input = document.createElement('input');
input.type = 'text';
input.name = 'name';
input.placeholder = 'Search by Name';
input.id = 'search';

const searchButton = document.createElement('button');
searchButton.type = 'submit';
searchButton.name = 'submit';
searchButton.value = 'submit';

const image = document.createElement('image');
image.src = 'img/icn-search.svg';
image.alt = 'Search icon'

const header = document.querySelector('header');
header.appendChild(label);
label.appendChild(input);
label.appendChild(searchButton);
header.appendChild(image);

label.addEventListener ('change', (e)=> {
  e.preventDefault();
  let text = input.value
  input.value ='';
  const filteredList = [];
  for (let i = 0; i <data.length ; i++){
    if (data[i].name.first.includes(text) || data[i].name.last.includes(text) ){
      const filteredList = data[i];
      console.log(filteredList);
    }
  }
  showPage(filteredList, 1);
  addPagination(filteredList);
});
