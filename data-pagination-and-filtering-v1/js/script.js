/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
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
