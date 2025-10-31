import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryEl = document.querySelector('.gallery');
const loaderEl = document.querySelector('.loader');
export const loadMore = document.querySelector('.js-load-more');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `
    <a class="card" href="${largeImageURL}">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" width="360" height="200" />
    <ul class="meta">
    <li><b>Likes</b> ${likes}</li>
    <li><b>Views</b> ${views}</li>
    <li><b>Comments</b> ${comments}</li>
    <li><b>Downloads</b> ${downloads}</li>
    </ul>
      </a>
    `
    )
    .join('');
  galleryEl.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}
export function clearGallery() {
  galleryEl.innerHTML = '';
}
export function showLoader() {
  loaderEl.classList.remove('is-hidden');
}
export function hideLoader() {
  loaderEl.classList.add('is-hidden');
}
export function showLoadMoreButton() {
  loadMore.classList.replace('is-hidden', 'js-load-more');
}
export function hideLoadMoreButton() {
  loadMore.classList.replace('js-load-more', 'is-hidden');
}
