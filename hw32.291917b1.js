const API_KEY="55981537-d72f43f268783da353d1d0a05",BASE_URL="https://pixabay.com/api/",form=document.getElementById("search-form"),input=document.getElementById("search-input"),gallery=document.getElementById("gallery"),loadMoreBtn=document.getElementById("load-more");let searchQuery="",page=1;const perPage=12;async function fetchImages(){try{let e=await fetch(`https://pixabay.com/api/?key=55981537-d72f43f268783da353d1d0a05&q=${searchQuery}&image_type=photo&page=${page}&per_page=12`),a=await e.json();renderImages(a.hits),a.totalHits>12*page?loadMoreBtn.classList.remove("hidden"):loadMoreBtn.classList.add("hidden")}catch(e){console.log(e)}}function renderImages(e){let a=e.map(e=>`
      <div class="card">
        <img src="${e.webformatURL}" alt="${e.tags}">
        <div class="info">
          <p><b>Likes:</b> ${e.likes}</p>
          <p><b>Views:</b> ${e.views}</p>
        </div>
      </div>
    `).join("");gallery.insertAdjacentHTML("beforeend",a)}form.addEventListener("submit",e=>{e.preventDefault(),(searchQuery=input.value.trim())&&(page=1,gallery.innerHTML="",localStorage.setItem("query",searchQuery),localStorage.setItem("page",page),fetchImages())}),loadMoreBtn.addEventListener("click",()=>{page+=1,localStorage.setItem("page",page),fetchImages()}),window.addEventListener("load",()=>{let e=localStorage.getItem("query"),a=localStorage.getItem("page");e&&(searchQuery=e,input.value=e),a&&(page=Number(a)),searchQuery&&fetchImages()});
//# sourceMappingURL=hw32.291917b1.js.map
