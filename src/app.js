const API_KEY = '55981537-d72f43f268783da353d1d0a05';
const BASE_URL = 'https://pixabay.com/api/';

const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const gallery = document.getElementById('gallery');
const loadMoreBtn = document.getElementById('load-more');

let searchQuery = '';
let page = 1;
const perPage = 12;

async function fetchImages() {
  try {
    const response = await fetch(
      `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&page=${page}&per_page=${perPage}`
    );

    const data = await response.json();

    renderImages(data.hits);

    if (data.totalHits > page * perPage) {
      loadMoreBtn.classList.remove('hidden');
    } else {
      loadMoreBtn.classList.add('hidden');
    }

  } catch (error) {
    console.log(error);
  }
}

function renderImages(images) {
  const markup = images.map(image => {
    return `
      <div class="card">
        <img src="${image.webformatURL}" alt="${image.tags}">
        <div class="info">
          <p><b>Likes:</b> ${image.likes}</p>
          <p><b>Views:</b> ${image.views}</p>
        </div>
      </div>
    `;
  }).join('');

  gallery.insertAdjacentHTML('beforeend', markup);
}

form.addEventListener('submit', event => {
  event.preventDefault();

  searchQuery = input.value.trim();

  if (!searchQuery) return;

  page = 1;
  gallery.innerHTML = '';

  localStorage.setItem('query', searchQuery);
  localStorage.setItem('page', page);

  fetchImages();
});

loadMoreBtn.addEventListener('click', () => {
  page += 1;

  localStorage.setItem('page', page);

  fetchImages();
});

window.addEventListener('load', () => {
  const savedQuery = localStorage.getItem('query');
  const savedPage = localStorage.getItem('page');

  if (savedQuery) {
    searchQuery = savedQuery;
    input.value = savedQuery;
  }

  if (savedPage) {
    page = Number(savedPage);
  }

  if (searchQuery) {
    fetchImages();
  }
});