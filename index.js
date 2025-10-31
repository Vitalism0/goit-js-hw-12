import{a as d,S as m,i as h}from"./assets/vendor-CZ5zj-u3.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();const g="52851423-7ef01ff8a01731751e4011988";function y(o){return d("https://pixabay.com/api/",{params:{key:g,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0}}).then(({data:r})=>r)}const l=document.querySelector(".gallery"),c=document.querySelector(".loader"),p=new m(".gallery a",{captionsData:"alt",captionDelay:250});function b(o){l.innerHTML=o.map(({webformatURL:r,largeImageURL:i,tags:n,likes:e,views:t,comments:s,downloads:f})=>`
    <a class="card" href="${i}">
    <img src="${r}" alt="${n}" loading="lazy" width="360" height="200" />
    <ul class="meta">
    <li><b>Likes</b> ${e}</li>
    <li><b>Views</b> ${t}</li>
    <li><b>Comments</b> ${s}</li>
    <li><b>Downloads</b> ${f}</li>
    </ul>
      </a>
    `).join(""),p.refresh()}function L(){l.innerHTML=""}function w(){c.classList.remove("is-hidden")}function S(){c.classList.add("is-hidden")}const u=document.querySelector(".form");u.addEventListener("submit",P);function P(o){o.preventDefault();const r=o.target.elements["search-text"].value.trim();if(!r){a("Please enter a search term.");return}w(),L(),y(r).then(i=>{if(i.hits.length===0)return a("Sorry, there are no images matching your search query. Please try again!");b(i.hits)}).catch(i=>{a(i.message||"Something went wrong. Please try again.")}).finally(()=>{S(),u.reset()})}function a(o){return h.show({message:o,position:"topRight",backgroundColor:"#EF4040",messageColor:"#FAFAFB"})}
//# sourceMappingURL=index.js.map
