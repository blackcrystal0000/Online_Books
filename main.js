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
