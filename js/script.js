/************ Global variables are declared. The only two global variable needed are the selected list and the number of items
* to be displayed on each page. 
************/

const studentList = document.querySelectorAll('.student-item');
const itemsPerPage = 10;


const headerDiv = document.querySelector('.page-header');
const searchDiv = document.createElement('div');
searchDiv.className = 'student-search';
headerDiv.appendChild(searchDiv);
const searchInput = document.createElement('input');
searchInput.placeholder = 'Search for students...';
searchInput.className = 'searchInput';
searchDiv.appendChild(searchInput);
const searchButton = document.createElement('button');
searchButton.textContent = 'Search';
searchButton.className = 'searchButton';
searchDiv.appendChild(searchButton);

searchButton.addEventListener('click', (e) => {
   event.preventDefault();
   performSearch();
});


const performSearch = () => {
   const search = searchInput.value.toLowerCase();
   console.log(search);
   const searchResults = [];
   for (let i = 0; i < studentList.length; i++) {
      const studentProfile = studentList[i];
      const studentName = studentProfile.querySelector('h3').textContent;
      console.log(studentName);
      if (studentName.includes(search)) {
         searchResults.push(studentProfile);
         studentProfile.style.display = 'block';
      } else {
         studentProfile.style.display = 'none';
      }
   }
   showPage(searchResults, 1);
   addPageLinks(searchResults);
   
}


/************ The showPage() function takes in a list and the initial page as its parameters. The function then 
 * defines a start index and end index dynamically using the provided parameters. The function then displays 
 * list items that are in the appropriate range and sets the display to none for list items outside the range.
************/

const showPage = (list, page) => {
   const startIndex = ((page * itemsPerPage) - itemsPerPage);
   const endIndex = (page * itemsPerPage);
   for (let i=0; i<list.length; i++) {
      if (i >= startIndex && i < endIndex) {
         list[i].style.display = 'block';
      } else {
         list[i].style.display = 'none';
      }
   }
}

/************ The addPageLinks() function builds a dynamic section of HTML at the bottom of the page to be used
 * as a pagination navigation section. Each link is then dynamically assigned a value and displays the corresponding
 * page of items from the list parameter.
************/

const addPageLinks = (list) => {
   const pageDiv = document.querySelector('.page');
   const paginationDiv = document.createElement('div');
   paginationDiv.className = 'pagination';
   pageDiv.appendChild(paginationDiv);
   const paginationUl = document.createElement('ul');
   paginationDiv.appendChild(paginationUl);
   const numberOfPages = list.length / itemsPerPage;

   /************ The first nested for loop in addPageLinks() cycles through and creates the appropriate number of 
    * pages based on how many items are in the list that is passed into the function.
   ************/

   for (let i = 0; i < numberOfPages; i++) {
      const paginationLi = document.createElement('li');
      const paginationLink = document.createElement('a');
      paginationLink.href = '#';
      paginationLink.innerHTML = `${i + 1}`
      paginationLi.appendChild(paginationLink);
      paginationUl.appendChild(paginationLi);
   }

   /************ The below section of addPageLinks() sets the first <li> class to active and then reassigns the 
    * active class to whichever link a user clicks using an event listener.
   ************/
   paginationUl.firstChild.firstChild.className = 'active';
   const paginationLinks = paginationUl.querySelectorAll('a');
   for (i = 0; i < paginationLinks.length; i++) {
      paginationLinks[i].addEventListener('click', (e) => {
         for (i = 0; i < paginationLinks.length; i++) {
            paginationLinks[i].className = '';
            }
         const isClicked = e.target;
         if (isClicked) {
            isClicked.className = 'active';
            showPage(list, isClicked.textContent);
         }
         });
      }
   }

   /************ A call to both functions, passing in studentList as the list and 1 as the page on which the display
    * should begin. 
************/

showPage(studentList, 1);
addPageLinks(studentList);
