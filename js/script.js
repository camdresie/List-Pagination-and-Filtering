/************ Global variables are declared. The only two global variable 
 * needed are the selected list and the number of items to be displayed on each page. 
************/

const studentList = document.querySelectorAll('.student-item');
const itemsPerPage = 10;

/************ This section creates a searchbar and appends it to 
 * the DOM.
************/

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

/************ The following two event listeners allow users to type in a name and search for that student either
 * by hitting the "Search" button or the program will dynamically search as they type. 
************/

searchButton.addEventListener('click', (e) => {
   event.preventDefault();
   performSearch();
});

searchInput.addEventListener('keyup', (e) => {
   event.preventDefault();
   performSearch();
});

/************ This is the function utilized by the searchButton and searchInput event listeners to search the 
 * user's input in the search box against the names that appear in the studentList. If the name or part of the 
 * name is in studentList, all other items are hidden from view and only matching items are shown. The beginning
 * of the function ensures that the pagination at the bottom is overwritten for each search.
************/

const performSearch = () => {
   const paginationDivs = document.querySelectorAll('.pagination');
   for (i=0; i<paginationDivs.length; i++) {
      paginationDiv = paginationDivs[i]
      paginationDiv.style.display = 'none';
   }
   paginationDiv.style.display = 'none';
   const search = searchInput.value.toLowerCase();
   const searchResults = [];
   for (let i = 0; i < studentList.length; i++) {
      const studentProfile = studentList[i];
      const studentName = studentProfile.querySelector('h3').textContent;
      if (studentName.includes(search)) {
         searchResults.push(studentProfile);
         studentProfile.style.display = 'block';
      } else {
         studentProfile.style.display = 'none';
      } 
   }

   /************ The below part of the performSearch function checks to see if no results are found. If they aren't,
    * a message is logged that tells a user that no students match their search and that they need to try again.
************/

   if (searchResults.length === 0) {
      const noResults = document.querySelectorAll('.no-results');
      for (i=0; i<noResults.length; i++) {
         const noResult = noResults[i]
         noResult.style.display = 'none';
      }
      const studentDiv = document.querySelector('.student-list');
      const noResultsLi = document.createElement('li');
      noResultsLi.className = 'no-results'
      studentDiv.appendChild(noResultsLi);
      const noResultsH3 = document.createElement('h3');
      noResultsH3.textContent = 'There are no matches for your search. Please try again.'
      noResultsLi.appendChild(noResultsH3);
   }
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
