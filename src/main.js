import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { getImagesByQuery, perPage } from './js/pixabay-api';
import {
  createGallery,
  hideLoader,
  showLoader,
  clearGallery,
  showLoadMoreButton,
  hideLoadMoreButton,
  loadMore,
} from './js/render-functions';

export const form = document.querySelector('.form');

let page = 1;
let currentQuery = '';
let totalHits = 0;

form.addEventListener('submit', handleSubmit);
loadMore.addEventListener('click', onLoadMore);

async function handleSubmit(e) {
  e.preventDefault();

  const query = e.target.elements['search-text'].value.trim();
  if (!query) {
    iziToastMessage('Please enter a search term.');

    return;
  }

  currentQuery = query;
  page = 1;

  showLoader();
  hideLoadMoreButton();
  clearGallery();

  try {
    const data = await getImagesByQuery(query, page);
    if (data.hits.length === 0) {
      hideLoadMoreButton();
      iziToastMessage(
        'Sorry, there are no images matching your search query. Please try again!'
      );
      return;
    }

    totalHits = data.totalHits;
    createGallery(data.hits);

    if (data.hits.length < data.totalHits) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
    }
  } catch (err) {
    iziToastMessage(err.message || 'Something went wrong. Please try again.');
  } finally {
    hideLoader();
    form.reset();
  }
}
async function onLoadMore() {
  page++;
  loadMore.disabled = true;
  showLoader();
  try {
    const data = await getImagesByQuery(currentQuery, page);
    createGallery(data.hits);
    const shown = page * perPage;
    if (shown >= totalHits) {
      hideLoadMoreButton();
      iziToastMessage(
        "We're sorry, but you've reached the end of search results."
      );
    }
    const card = document.querySelector('.card');
    const height = card.getBoundingClientRect().height;
    window.scrollBy({
      left: 0,
      top: height * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    iziToastMessage(error.message || 'Something went wrong. Please try again.');
  } finally {
    hideLoader();
    loadMore.disabled = false;
  }
}

function iziToastMessage(title) {
  return iziToast.show({
    message: title,
    position: 'topRight',
    backgroundColor: '#EF4040',
    messageColor: '#FAFAFB',
  });
}
