/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

// Unerneath are all the elements created for the searchbar in the header.
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

const image = document.createElement('img');
image.src = 'img/icn-search.svg';
image.alt = 'Search icon'

const header = document.querySelector('header');
header.appendChild(label);
label.appendChild(input);
label.appendChild(searchButton);
searchButton.appendChild(image);

//This function will create and insert/append the elements needed to display a "page" of nine students
const perPage = 9;

function showPage (list, page){
  const startIndex = (page * perPage) - perPage;
  const endIndex = (page * perPage);
  const studentList = document.querySelector('.student-list');
  studentList.innerHTML = '';
  // The loop adds data in the required layout to display on the page
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


//This function will create and insert/append the elements needed for the pagination buttons
function addPagination (list){
  const amountOfPages = Math.ceil(list.length / perPage)+1;
  const linkList = document.querySelector('.link-list');
  linkList.innerHTML = '';
  // This loop creates buttons in relation to the amount of pages.
  for (let i = 1; i < amountOfPages; i ++){
    let htmlString = `
      <li>
        <button type="button">${i}</button>
      </li>
    `;
    linkList.insertAdjacentHTML('beforeend', htmlString);
  }

  /*
  When there is at least 1 student being diplayed, the created buttons will have the class active applied.
  If there are now students displayed, the message 'no Results' is displayed.
  */
  if (list.length > 0){
    const firstButton = linkList.firstElementChild.firstElementChild;
    firstButton.className = 'active';
    linkList.addEventListener('click', (e) => {
      if (e.target.className !== 'active'){
        let activeButton = document.querySelector('.active')
        activeButton.className = '';
        e.target.className = 'active';
        let page = e.target.textContent;
        if (filteredList.length>0){
          list = filteredList
        }
        showPage(list, page);
      }
    });
  } else {
    htmlString = `
      <h2>
        No Results
      </h2>
    `;
    linkList.insertAdjacentHTML('beforeend', htmlString);
  }
  return linkList;
  }

// Underneath the search filter is activated when the user hits enter or the searchbutton.
// The filteredList is returned to keep the search results active while switching pages.
let filteredList = [];
label.addEventListener ('change', (e)=> {
  filteredList = [];
  let text = input.value.toLowerCase();
  for (let i = 0; i <data.length ; i++){
    if (data[i].name.first.toLowerCase().includes(text) || data[i].name.last.toLowerCase().includes(text) ){
      filteredList = filteredList.concat(data[i]);
    }
  }
  showPage(filteredList, 1);
  addPagination(filteredList);
  return filteredList
});

showPage (data, 1);
addPagination(data);
