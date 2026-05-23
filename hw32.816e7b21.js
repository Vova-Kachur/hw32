const API_KEY = "55981537-d72f43f268783da353d1d0a05";
const BASE_URL = "https://pixabay.com/api/";
const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.getElementById('load-more');
let page = 1;
let query = '';
const perPage = 12;
function fetchImages() {
    fetch(`${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`).then((response)=>{
        return response.json();
    }).then((data)=>{
        renderImages(data.hits);
        if (page * perPage < data.totalHits) loadMoreBtn.classList.remove('hidden');
        else loadMoreBtn.classList.add('hidden');
        localStorage.setItem('query', query);
        localStorage.setItem('page', page);
    }).catch((error)=>{
        console.log(error);
    });
}
function renderImages(images) {
    const markup = images.map((image)=>{
        return `
      <div class="card">

        <img
          src="${image.webformatURL}"
          alt="${image.tags}"
        >

        <div class="info">
          <p>Likes: ${image.likes}</p>
          <p>Views: ${image.views}</p>
          <p>Comments: ${image.comments}</p>
          <p>Downloads: ${image.downloads}</p>
        </div>

      </div>
    `;
    }).join('');
    gallery.insertAdjacentHTML('beforeend', markup);
}
form.addEventListener('submit', (event)=>{
    event.preventDefault();
    query = input.value.trim();
    if (!query) return;
    page = 1;
    gallery.innerHTML = '';
    fetchImages();
});
loadMoreBtn.addEventListener('click', ()=>{
    page += 1;
    fetchImages();
});
window.addEventListener('load', ()=>{
    const savedQuery = localStorage.getItem('query');
    const savedPage = localStorage.getItem('page');
    if (savedQuery) {
        query = savedQuery;
        input.value = savedQuery;
    }
    if (savedPage) page = Number(savedPage);
    if (query) fetchImages();
});

//# sourceMappingURL=hw32.816e7b21.js.map
