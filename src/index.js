

document.addEventListener("DOMContentLoaded", function () {

    

});




/*

pessimistic rendering is recommended. 

Populate page with quotes with a GET request to http://localhost:3000/quotes?_embed=likes. The query string in this URL tells json-server to include the likes for a quote in the JSON of the response. You should not use this query string when creating or deleting a quote.

Each quote should have the following structure:

    <li class='quote-card'>
      <blockquote class="blockquote">
        <p class="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
        <footer class="blockquote-footer">Someone famous</footer>
        <br>
        <button class='btn-success'>Likes: <span>0</span></button>
        <button class='btn-danger'>Delete</button>
      </blockquote>
    </li>
Submitting the form creates a new quote and adds it to the list of quotes without having to refresh the page. Pessimistic rendering is recommended.

Clicking the delete button should delete the respective quote from the API and remove it from the page without having to refresh.

Clicking the like button will create a like for this particular quote in the API and update the number of likes displayed on the page without having to refresh.

Use a POST request to http://localhost:3000/likes
The body of the request should be a JSON object containing a key of quoteId, with an integer value. Use the ID of the quote you're creating the like for — e.g. { quoteId: 5 } to create a like for quote 5.
IMPORTANT: if the quoteID is a string for some reason (for example, if you've pulled the ID from a dataset) the index page will not include the like you create on any quote.
Bonus (not required): add a createdAt key to your object to track when the like was created. Use UNIX timeLinks to an external site. (the number of seconds since January 1, 1970). The documentationLinks to an external site. for the JS Date class may be helpful here!
Extend Your Learning
Add an edit button to each quote-card that will allow the editing of a quote. (Hint: there is no 'correct' way to do this. You can try creating a hidden form that will only show up when hitting the edit button.)
Currently, the number of likes of each post does not persist on the frontend after we refresh, as we set the beginning value to 0. Include an additional fetch to always have an updated number of likes for each post. You will send a GET request to http://localhost:3000/likes?quoteId= and interpolate the id of a given post.
Add a sort button that can be toggled on or off. When off the list of quotes will appear sorted by the ID. When the sort is active, it will display the quotes by author's name, alphabetically.
One way of doing this is to sort the quotes in JS after you've retrieved them from the API. Try this way first.
Another way of doing this is to make a fetch to http://localhost:3000/quotes?_sort=author
What are the pros and cons in doing the sorting on the client vs. the server? Discuss with a partner.
Conclusion
Building an application like this is a typical interview exercise. It's not uncommon to be set in front of a foreign computer (or asked to bring your own) and to receive a specification like this.

*/