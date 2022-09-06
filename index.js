const photosContainer = document.getElementById('images-container');
const loader = document.getElementById('loader');

let ready = false,
  totalImages = 0,
  totalImagesLoaded = 0,
  photosArray = [];

async function getRandomImages(amountOfImages) {
  // This api key is exposed only it is free
  // Please get your own if you want to access the data
  const API_KEY = '--P70he-phjuu0zRSkCZVkgMStk1LJdy215cFokeZyA';
  const API_URL = `https://api.unsplash.com/photos/random?client_id=${API_KEY}&count=${amountOfImages}`;

  try {
    const response = await fetch(API_URL);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    throw new Error(error);
  }
}

function imageLoaded() {
  totalImagesLoaded++;

  if (totalImagesLoaded === totalImages) {
    ready = true;
    loader.style.display = 'none';
  }
}

function displayPhotos() {
  totalImagesLoaded = 0;
  totalImages = photosArray.length;

  photosArray.forEach(photo => {
    const item = document.createElement('a');
    item.setAttribute('href', photo.links.html);
    item.setAttribute('target', '_blank');

    const image = document.createElement('img');
    image.setAttribute('src', photo.urls.regular);
    image.setAttribute('alt', photo.description);
    image.setAttribute('title', photo.description);

    image.addEventListener('load', imageLoaded);
    item.appendChild(image);
    photosContainer.appendChild(item);
  });
}

window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY > document.body.offsetHeight - 500 && ready) {
    ready = false;
    getRandomImages(30);
  }
});

// On window load
getRandomImages(30);
