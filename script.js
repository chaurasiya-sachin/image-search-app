
let url = 'https://api.unsplash.com/search/photos/?client_id=Bn0EgsVvcO3KK0Mh5uX_1tzHgMXAaAkDVJJaUAJLHQk&query=';
let searchText = document.getElementById('searchInput');
let searchbtn = document.getElementById('submit');
let imageList = document.getElementById('imageList');
let showMoreBtn = document.getElementById('showMore');
let currentPage = 1;
let currentSearch = '';

searchbtn.addEventListener('click', () => {
    currentSearch = searchText.value;
    currentPage = 1;
    imageList.innerHTML = ''; 
    getImages(currentSearch, currentPage);
});

showMoreBtn.addEventListener('click', () => {
    currentPage++;
    getImages(currentSearch, currentPage);
});

async function getImages(search, page) {
    try {
        let response = await fetch(`${url}${search}&page=${page}&per_page=10`);
       
        let data = await response.json();
        displayImages(data.results);
        if (data.results.length > 0) {
            showMoreBtn.style.display = 'block';
        } else {
            showMoreBtn.style.display = 'none'; 
        }
    } catch (error) {
        console.error('Error fetching images:', error);
        alert('Failed to fetch images. Please try again later.');
    }
}

function displayImages(images) {
    images.forEach(image => {
        let li = document.createElement('li');
        let img = document.createElement('img');
        let dis = document.createElement('p');
        dis.textContent = image.alt_description;
        img.src = image.urls.small;
        img.alt = image.description;
        li.appendChild(img);
        li.appendChild(dis);
        imageList.appendChild(li);
    });
}