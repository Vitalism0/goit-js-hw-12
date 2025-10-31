import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  hideLoader,
  showLoader,
  clearGallery,
} from './js/render-functions';

export const form = document.querySelector('.form');

form.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();

  const query = e.target.elements['search-text'].value.trim();
  if (!query) {
    iziToastMessage('Please enter a search term.');

    return;
  }

  showLoader();
  clearGallery();

  getImagesByQuery(query)
    .then(data => {
      if (data.hits.length === 0) {
        return iziToastMessage(
          'Sorry, there are no images matching your search query. Please try again!'
        );
      }
      createGallery(data.hits);
    })
    .catch(err => {
      iziToastMessage(err.message || 'Something went wrong. Please try again.');
    })
    .finally(() => {
      hideLoader();
      form.reset();
    });
}
function iziToastMessage(title) {
  return iziToast.show({
    message: title,
    position: 'topRight',
    backgroundColor: '#EF4040',
    messageColor: '#FAFAFB',
  });
}
