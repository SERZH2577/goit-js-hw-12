import{a as S,S as $,i as m}from"./assets/vendor-89feecc5.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerpolicy&&(o.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?o.credentials="include":t.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(t){if(t.ep)return;t.ep=!0;const o=n(t);fetch(t.href,o)}})();const q="25810966-6fb22a4db6c9a757ebd742847",P="https://pixabay.com/api/";async function h(s,e,n){try{return await S.get(`${P}?key=${q}&q=${s}&page=${e}&per_page=${n}&image_type=photo&orientation=horizontal`)}catch(r){console.log(r)}}function y(s){return s.map(({largeImageURL:e,webformatURL:n,tags:r,likes:t,views:o,comments:a,downloads:w})=>`<li class="gallery-item">
			<a href="${e}"
				class="link-img">
				<img
					src="${n}"
					alt="${r}">
			</a>
			<ul class="list-info">
				<li class="list-info-item">
					<svg class="info-icon">
						<use href="./img/sprite.svg#icon-like-svgrepo-com"></use>
					</svg>
					<!-- <p class="list-info-name">Likes:</p> -->
					<p class="list-info-value">${t}</p>
				</li>
				<li class="list-info-item">
					<svg class="info-icon">
						<use href="./img/sprite.svg#icon-eye"></use>
					</svg>
					<!-- <p class="list-info-name">Views:</p> -->
					<p class="list-info-value">${o}</p>
				</li>
				<li class="list-info-item">
					<svg class="info-icon">
						<use href="./img/sprite.svg#icon-bubble2"></use>
					</svg>
					<!-- <p class="list-info-name">Comments:</p> -->
					<p class="list-info-value">${a}</p>
				</li>
				<li class="list-info-item">
					<svg class="info-icon">
						<use href="./img/sprite.svg#icon-cloud-download"></use>
					</svg>
					<!-- <p class="list-info-name">Downloads:</p> -->
					<p class="list-info-value">${w}</p>
				</li>
			</ul>
		</li>`).join("")}const p=document.querySelector(".gallery"),i=document.querySelector(".more"),v=document.querySelector(".form"),u=document.querySelector(".loader");v.addEventListener("submit",E);i.addEventListener("click",R);const b=new $(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250});let d="",l;const g=40;f(u);function E(s){if(s.preventDefault(),s.currentTarget.elements.query.value.trim()===""){m.error({position:"topRight",messageColor:"brown",message:"Enter anything in the search field!",timeout:3e3});return}l=1,d=s.currentTarget.elements.query.value,i.disabled=!1,i.textContent="Load more",p.innerHTML="",f(i),c(u),h(d,l,g).then(e=>e.data).then(e=>{if(e.hits.length===0){m.error({position:"topRight",messageColor:"brown",message:"Sorry, there are no images matching your search query. Please try again!",timeout:3e3});return}L(),p.insertAdjacentHTML("beforeend",y(e.hits)),b.refresh(),e.hits.length===g?c(i):m.info({position:"topRight",message:"Sorry, we've run out of images. Try a new request!",timeout:3e3})}).catch(e=>console.log(e)).finally(()=>{f(u)}),v.reset()}function R(s){s.preventDefault(),f(i),c(u),h(d,l,g).then(e=>e.data).then(e=>{const n=Math.ceil(e.total/g);L(),p.insertAdjacentHTML("beforeend",y(e.hits)),b.refresh(),l-1<n&&c(i),l-1===n&&(c(i),i.disabled=!0,i.textContent="There are no more images!",m.info({position:"topRight",message:"Sorry, we've run out of images. Try a new request!",timeout:3e3}))}).catch(e=>console.log(e)).finally(()=>{f(u)})}function L(){return l+=1}function f(s){s.hidden=!0}function c(s){s.hidden=!1}
//# sourceMappingURL=commonHelpers.js.map
