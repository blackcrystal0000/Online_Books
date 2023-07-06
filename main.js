document.addEventListener('DOMContentLoaded', function(){
    fetchBooks('');
})

document.getElementById('search-btn').addEventListener('click', function(){
    let searchText = document.getElementById('search-input').value;
    fetchBooks(searchText);
});
