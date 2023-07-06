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
        
document.getElementById('books-list').innerHTML = booksList;
            displayCategoryChart(data.docs);
        })
        .catch(error => console.error('Error:', error));
}

function likeBook(event) {
    event.target.classList.toggle('liked');
}

function displayCategoryChart(books) {
    let categories = {};
    books.forEach(function(book) {
        if (book.subject) {
            book.subject.forEach(function(category) {
                categories[category] = (categories[category] || 0) + 1;
            });
        }
    });
 let output = '<h2>Books by Category</h2>';
    output += '<ul>';
    for (let category in categories) {
        output += `<li>${category}: ${categories[category]}</li>`;
    }
    output += '</ul>';
    document.getElementById('category-chart').innerHTML = output;
}
