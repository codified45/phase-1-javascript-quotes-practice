
const currentQuotesUrl = "http://localhost:3000/quotes";
const currentLikesUrl = "http://localhost:3000/likes";
const currentQuotesAndLikesUrl = "http://localhost:3000/quotes?_embed=likes";
const sortByAuthorUrl = "http://localhost:3000/quotes?_sort=author";
const getQuoteLikesUrl = "http://localhost:3000/likes?quoteId=";

document.addEventListener("DOMContentLoaded", function() {
    const quoteListContainer = document.getElementById('quote-list');
    const newQuoteForm = document.getElementById('new-quote-form');
    newQuoteForm.addEventListener('submit', submitNewQuote);
    const sortBtn = document.getElementById('srtBtn');
    sortBtn.addEventListener('click', sortByAuthorViaJs);       // option 1
    // sortBtn.addEventListener('click', sortByAuthorViaFetch); // option 2
    populatePageWithQuotesAndLikes();

    function fetchCurrentDbQuotesAndLikes() {
        fetch(currentQuotesAndLikesUrl)
        .then(res => res.json())
        .then(arr => {
            for (const obj of arr) {
                quoteListContainer.append(buildSingleQuoteDom(obj));
            };
        });
    };

    function populatePageWithQuotesAndLikes() {
        fetchCurrentDbQuotesAndLikes();
    };

    function newLike(e) {
        let createdAt = Date.now();
        let targetQuote = e.target.parentNode;
        let quoteId = Number.parseInt(targetQuote.id);
        let like = {
            quoteId: quoteId,
            createdAt: createdAt,
        };
        fetch(currentLikesUrl, postLikeMsgFormat(like))
        .then(res => res.json())
        .then(arr => {
            btnText = e.target.textContent;
            btnLikeNum = Number.parseInt(btnText.slice(7));
            e.target.textContent = `Likes: ${btnLikeNum+1}`;
        });
    };

    function postLikeMsgFormat(newLike) {
        let postConfig = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(newLike),
        };
        return postConfig;
    };

    function editQuote(e) {
        e.preventDefault();
        let form = e.target;
        let textInput = form.querySelector('.text-input');
        let quoteFormInput = textInput.value;
        let quoteId = Number.parseInt(form.id);
        let modifiedQuote = {
            id: quoteId,
            quote: quoteFormInput,
        };
        form.className = "edit-form-hidden";
        let patchUrl = currentQuotesUrl + '/' + quoteId;
        fetch(patchUrl, patchMsgFormat(modifiedQuote));
    };

    function patchMsgFormat(modifiedQuote) {
        let patchConfig = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(modifiedQuote),
        };
        return patchConfig;
    };

    function buildSingleQuoteDom(quoteObj) {
        let id = quoteObj.id;
        let li = document.createElement('li');
        li.classList.add('quote-card');
        let bquote = document.createElement('blockquote');
        bquote.classList.add('blockquote');
        bquote.id = id;
        let p = document.createElement('p');
        p.classList.add('mb-0');
        p.textContent = quoteObj.quote;
        let footer = document.createElement('footer');
        footer.classList.add('blockquote-footer');
        footer.textContent = quoteObj.author;
        let br = document.createElement('br');
        let numberOfLikes = quoteObj.likes.length;
        let likeBtn = document.createElement('button');
        likeBtn.classList.add('btn-success');
        likeBtn.textContent = `Likes: ${numberOfLikes}`;
        likeBtn.id = `likeBtn${id}`;
        likeBtn.addEventListener('click', newLike);
        let dltBtn = document.createElement('button');
        dltBtn.classList.add('btn-danger');
        dltBtn.textContent = "Delete";
        dltBtn.id = `dltBtn${id}`;
        dltBtn.addEventListener('click', dltQuote);
        let editBtn = document.createElement('button');
        editBtn.classList.add('btn-edit');
        editBtn.textContent = "Edit Quote";
        editBtn.id = `editBtn${id}`;
        editBtn.addEventListener('click', showForm);
        let form = document.createElement('form');
        form.id = id;
        let textInput = document.createElement('input');
        textInput.type = "text";
        textInput.className = 'text-input';
        let textSubmit = document.createElement('input');
        textSubmit.type = "submit";
        form.append(textInput, textSubmit);
        form.className = "edit-form-hidden";
        form.addEventListener('submit', editQuote); // can also change to click, but I think thats bad practice (hitting enter to submit should work too)
        bquote.append(p, footer, br, likeBtn, dltBtn, editBtn, form);
        li.append(bquote);
        return li;
    };

    function showForm(e) {
        let form = e.target.nextSibling;
        form.className = "edit-form-visible";
    };

    function postQuoteMsgFormat(newQuote) {
        let postQuoteConfig = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(newQuote),
        };
        return postQuoteConfig;
    };

    function submitNewQuote(e) {
        e.preventDefault();
        let quote = newQuoteForm.quote.value;
        let author = newQuoteForm.author.value;
        let newQuote = {
            quote: quote,
            author: author,
        };
        fetch(currentQuotesUrl, postQuoteMsgFormat(newQuote))
        .then(res => res.json())
        .then(obj => {
            quoteListContainer.append(buildSingleNewQuoteDom(obj));
            newQuoteForm.reset();
            });
    };

    function buildSingleNewQuoteDom(quoteObj) {
        let id = quoteObj.id;
        let li = document.createElement('li');
        li.classList.add('quote-card');
        let bquote = document.createElement('blockquote');
        bquote.classList.add('blockquote');
        bquote.id = id;
        let p = document.createElement('p');
        p.classList.add('mb-0');
        p.textContent = quoteObj.quote;
        let footer = document.createElement('footer');
        footer.classList.add('blockquote-footer');
        footer.textContent = quoteObj.author;
        let br = document.createElement('br');
        let numberOfLikes = 0;
        let likeBtn = document.createElement('button');
        likeBtn.classList.add('btn-success');
        likeBtn.textContent = `Likes: ${numberOfLikes}`;
        likeBtn.id = `likeBtn${id}`;
        likeBtn.addEventListener('click', newLike);
        let dltBtn = document.createElement('button');
        dltBtn.classList.add('btn-danger');
        dltBtn.textContent = "Delete";
        dltBtn.id = `dltBtn${id}`;
        dltBtn.addEventListener('click', dltQuote);
        let editBtn = document.createElement('button');
        editBtn.classList.add('btn-edit');
        editBtn.textContent = "Edit Quote";
        editBtn.id = `editBtn${id}`;
        editBtn.addEventListener('click', showForm);
        let form = document.createElement('form');
        form.id = id;
        let textInput = document.createElement('input');
        textInput.type = "text";
        textInput.className = 'text-input';
        let textSubmit = document.createElement('input');
        textSubmit.type = "submit";
        form.append(textInput, textSubmit);
        form.className = "edit-form-hidden";
        form.addEventListener('submit', editQuote);
        bquote.append(p, footer, br, likeBtn, dltBtn, editBtn, form);
        li.append(bquote);
        return li;
    };

    function changeLikes(quoteId, likeBtn) {
        let quoteLikeCheckUrl = getQuoteLikesUrl + quoteId;
        fetch(quoteLikeCheckUrl)
        .then(res => res.json())
        .then(arr => {
            numberOfLikes = arr.length;
            likeBtn.textContent = `Likes: ${numberOfLikes}`;
        });
    };

    function dltQuote(e) {
        let btnIdNum = e.target.parentNode.id;
        let deleteConfig = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        };
        let deleteUrl = currentQuotesUrl + `/${btnIdNum}`;
        fetch(deleteUrl, deleteConfig);
        let bquote = document.getElementById(btnIdNum);
        let dltLi = bquote.parentNode;
        dltLi.remove();
    };

    function sortByAuthorViaJs(e) {
        quoteListContainer.replaceChildren();
        if (e.target.value === "off") {
            e.target.value = "on";
            e.target.textContent = "Sort Quotes: On";
            fetch(currentQuotesAndLikesUrl)
            .then(res => res.json())
            .then(arr => {
            arr.sort(function(a, b) {
                return ((a.author < b.author) ? -1 : ((a.author > b.author) ? 1 : 0));
                });
            for (const obj of arr) {
                quoteListContainer.append(buildSingleQuoteDom(obj));
            };
        });
        } else if (e.target.value === "on") {
            e.target.value = "off";
            e.target.textContent = "Sort Quotes: Off"
            populatePageWithQuotesAndLikes();
        };
    };

    function sortByAuthorViaFetch(e) {
        quoteListContainer.replaceChildren();
        if (e.target.value === "off") {
            e.target.value = "on";
            e.target.textContent = "Sort Quotes: On";
            fetch(sortByAuthorUrl)
            .then(res => res.json())
            .then(arr => {
                for (const obj of arr) {
                    quoteListContainer.append(buildSingleNewQuoteDom(obj));
                    let likeBtn = document.getElementById(`likeBtn${obj.id}`);
                    changeLikes(obj.id, likeBtn);
                };
            });
        } else if (e.target.value === "on") {
            e.target.value = "off";
            e.target.textContent = "Sort Quotes: Off";
            populatePageWithQuotesAndLikes();
        };
    };

    function fetchCurrentDbQuotes() { // unused
        fetch(currentQuotesUrl)
        .then(res => res.json())
        .then(arr => {
            for (const obj of arr) {
                quoteListContainer.append(buildSingleQuoteDom(obj));
            };
        });
    };

});


/*

pessimistic rendering is recommended. 

1. (done) Populate page with quotes with a GET request to http://localhost:3000/quotes?_embed=likes. The query string in this URL tells json-server to include the likes for a quote in the JSON of the response. You should not use this query string when creating or deleting a quote.

2. (done) Each quote should have the following structure:

    <li class='quote-card'>
      <blockquote class="blockquote">
        <p class="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
        <footer class="blockquote-footer">Someone famous</footer>
        <br>
        <button class='btn-success'>Likes: <span>0</span></button>
        <button class='btn-danger'>Delete</button>
      </blockquote>
    </li>
3. (done) Submitting the form creates a new quote and adds it to the list of quotes without having to refresh the page. Pessimistic rendering is recommended.

4. (done) Clicking the delete button should delete the respective quote from the API and remove it from the page without having to refresh.

5. (done) Clicking the like button will create a like for this particular quote in the API and update the number of likes displayed on the page without having to refresh.

6. (done) Use a POST request to http://localhost:3000/likes
The body of the request should be a JSON object containing a key of quoteId, with an integer value. Use the ID of the quote you're creating the like for — e.g. { quoteId: 5 } to create a like for quote 5.
7. (done) IMPORTANT: if the quoteID is a string for some reason (for example, if you've pulled the ID from a dataset) the index page will not include the like you create on any quote.

8. (done) Bonus (not required): add a createdAt key to your object to track when the like was created. Use UNIX timeLinks to an external site. (the number of seconds since January 1, 1970). The documentationLinks to an external site. for the JS Date class may be helpful here!

Extend Your Learning
9. (done) Add an edit button to each quote-card that will allow the editing of a quote. (Hint: there is no 'correct' way to do this. You can try creating a hidden form that will only show up when hitting the edit button.)

10. (done) Currently, the number of likes of each post does not persist on the frontend after we refresh, as we set the beginning value to 0. Include an additional fetch to always have an updated number of likes for each post. You will send a GET request to http://localhost:3000/likes?quoteId= and interpolate the id of a given post. (did it differently)

11. (done) Add a sort button that can be toggled on or off. When off the list of quotes will appear sorted by the ID. When the sort is active, it will display the quotes by author's name, alphabetically.

One way of doing this is to sort the quotes in JS after you've retrieved them from the API. Try this way first.

12. (done) Another way of doing this is to make a fetch to http://localhost:3000/quotes?_sort=author

13. (done) What are the pros and cons in doing the sorting on the client vs. the server? Discuss with a partner.
    - with sortByAuthorViaFetch() you needed to incorporate the live Like amount, since the sorted by author list did not include this data. A seperate fetch had to be made.
    - with sortByAuthorViaJs(), a sorting function had to be implemented from scratch on the object.author property, which was a challenge.  

Conclusion
Building an application like this is a typical interview exercise. It's not uncommon to be set in front of a foreign computer (or asked to bring your own) and to receive a specification like this.

*/