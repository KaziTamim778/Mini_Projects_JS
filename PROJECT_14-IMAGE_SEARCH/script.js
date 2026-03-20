const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const imageResults = document.getElementById('image-results');
const showMoreBtn = document.getElementById('show-more-btn');
const API_KEY = 'nDr3-cO5Ghp7y3eijX5tZKoGb58I7EUUC7rjMrc92S0';
let page = 1;

searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        page = 1; 
        imageResults.innerHTML = ''; 
        fetchImages(query);
    } else {
        alert('Please enter a search term.');
    }
});

searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});

function fetchImages(query) {
    fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=${API_KEY}&page=${page}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayImages(data.results);
        })
        .catch(error => {
            console.error('Error fetching images:', error);
            alert('Error fetching images. Please try again.');
        });
}

function displayImages(images) {
    images.forEach(image => {
        const img = document.createElement('img');
        img.src = image.urls.small;
        img.alt = image.alt_description || 'Image';
        imageResults.appendChild(img);
    });
    showMoreBtn.classList.remove('hidden');
}

showMoreBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        page++;
        fetchImages(query); 
    }
});

