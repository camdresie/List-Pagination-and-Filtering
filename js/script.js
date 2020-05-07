const studentList = document.querySelectorAll('.student-item');
const itemsPerPage = 10;

const showPage = (list, page) => {
   let startIndex = ((page * itemsPerPage) - itemsPerPage);
   let endIndex = (page * itemsPerPage);
   for (let i=0; i<list.length; i++) {
      if (i >= startIndex && i < endIndex) {
         list[i].style.display = 'block';
      } else {
         list[i].style.display = 'none';
      }
   }
}

const addPageLinks = (list) => {
   const pageDiv = document.querySelector('.page');
   const paginationDiv = document.createElement('div');
   paginationDiv.className = 'pagination';
   pageDiv.appendChild(paginationDiv);
   const paginationUl = document.createElement('ul');
   paginationDiv.appendChild(paginationUl);
   let numberOfPages = studentList.length / itemsPerPage;
   
   for (let i=0; i<numberOfPages; i++) {
      const paginationLi = document.createElement('li');
      const paginationLink = document.createElement('a');
      paginationLink.href = '#';
      paginationLink.innerHTML = `${i + 1}`
      paginationLi.appendChild(paginationLink);
      paginationUl.appendChild(paginationLi);
   }

   paginationUl.firstChild.firstChild.className = 'active';

   const paginationLinks = paginationUl.querySelectorAll('a');
   paginationLinks.addEventListener('click', (e) => {
      for (let i=0; i<paginationLinks.length; i++) {
         if (paginationLinks[i].className === 'active') {
            paginationLinks[i].className = '';
         }
      }
   });


   }

addPageLinks(studentList);