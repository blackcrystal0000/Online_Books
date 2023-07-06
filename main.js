document.addEventListener('DOMContentLoaded', function(){
    fetchBooks('');
})

document.getElementById('search-btn').addEventListener('click', function(){
    let searchText = document.getElementById('search-input').value;
    fetchBooks(searchText);
});

document.getElementById('search-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        let searchText = document.getElementById('search-input').value;
        fetchBooks(searchText);
    }
});

function fetchBooks(searchText) {
    fetch(`https://openlibrary.org/search.json?title=${searchText}`)
        .then(response => response.json())
        .then(data => {
            let booksList = '';
            if(data.docs){
                data.docs.forEach(function(book) {
                    let title = book.title ? book.title : "No Title";
                    let author = book.author_name ? book.author_name.join(', ') : "Unknown Author";
                    booksList += `
                        <div class="book">
                            <h2>${title}</h2>
                            <h3>${author}</h3>
                            <p class="like-btn" onclick="likeBook(event)">❤ Like</p>
                        </div>
                    `;
                });
            } else {
                booksList = "<p>No results found</p>";
            }
        }
    )}
