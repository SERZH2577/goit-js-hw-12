import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import fetchImages from './js/fetch.js';
import createsStringOfPageElements from './js/template-page.js';

const galleryRef = document.querySelector('.gallery');
const moreButtonRef = document.querySelector('.more');
const formRef = document.querySelector('.form');
const loaderRef = document.querySelector('.loader');

formRef.addEventListener('submit', loadsFirstPageOfGallery);
moreButtonRef.addEventListener('click', loadsOtherGalleryPages);

const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

let searchValue = '';
let page;
const perPage = 40;

hidesElement(loaderRef);

function loadsFirstPageOfGallery(e) {
  e.preventDefault();
  if (e.currentTarget.elements.query.value.trim() === '') {
    iziToast.error({
      position: 'topRight',
      messageColor: 'brown',
      message: 'Enter anything in the search field!',
      timeout: 3000,
    });
    return;
  }

  page = 1;
  searchValue = e.currentTarget.elements.query.value;
  moreButtonRef.disabled = false;
  moreButtonRef.textContent = 'Load more';
  galleryRef.innerHTML = '';

  hidesElement(moreButtonRef);
  showsElement(loaderRef);

  fetchImages(searchValue, page, perPage)
    .then(r => r.data)
    .then(r => {
      if (r.hits.length === 0) {
        iziToast.error({
          position: 'topRight',
          messageColor: 'brown',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          timeout: 3000,
        });

        return;
      }

      incrementsPageNumber();

      galleryRef.insertAdjacentHTML(
        'beforeend',
        createsStringOfPageElements(r.hits)
      );

      lightbox.refresh();

      if (r.hits.length === perPage) {
        showsElement(moreButtonRef);
      } else {
        iziToast.info({
          position: 'topRight',
          message: "Sorry, we've run out of images. Try a new request!",
          timeout: 3000,
        });
      }
    })
    .catch(err => console.log(err))
    .finally(() => {
      hidesElement(loaderRef);
    });

  formRef.reset();
}

function loadsOtherGalleryPages(e) {
  e.preventDefault();

  hidesElement(moreButtonRef);
  showsElement(loaderRef);

  fetchImages(searchValue, page, perPage)
    .then(r => r.data)
    .then(r => {
      const numberOfPages = Math.ceil(r.total / perPage);

      incrementsPageNumber();

      galleryRef.insertAdjacentHTML(
        'beforeend',
        createsStringOfPageElements(r.hits)
      );

      lightbox.refresh();

      if (page - 1 < numberOfPages) showsElement(moreButtonRef);
      if (page - 1 === numberOfPages) {
        showsElement(moreButtonRef);

        moreButtonRef.disabled = true;
        moreButtonRef.textContent = 'There are no more images!';

        iziToast.info({
          position: 'topRight',
          message: "Sorry, we've run out of images. Try a new request!",
          timeout: 3000,
        });
      }
    })
    .catch(err => console.log(err))
    .finally(() => {
      hidesElement(loaderRef);
    });
}

function incrementsPageNumber() {
  return (page += 1);
}

function hidesElement(elem) {
  elem.hidden = true;
}

function showsElement(elem) {
  elem.hidden = false;
}
