# List-Pagination-and-Filtering
A project I completed for Unit 2 of the Treehouse Techdegree program. This project is all vanilla Javascript.

For this project, I utilized vanilla JavaScript (no libraries) to create a dynamic pagination system for a list. My code appends a list of links to the bottom
of the page that allows a user to navigate through the number of individuals listed 10 at a time. When they click on the next link, the
next ten individuals are displayed and so on. The list is dynamic, so it updates automatically depending on the size of the list input.

After completing the initial code mentioned above, I elected to add a search bar function. It is appended to the DOM using vanilla JavaScript. There are two event listeners, one on the search button and one on the search text input field. As a user types, the search function dynamically searches through each name on the list to see if there are any matches. If the user inputs a string of text that matches a user's name in entirety or in part, the function displays that name and hides all others. If no matches are found, a message is logged telling the user to try another name as no matches were found. 
