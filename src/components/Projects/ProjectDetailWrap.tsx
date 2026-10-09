// "use client"
// import dayjs from 'dayjs';
// import Image from 'next/image';
// import React from 'react';

// import type { ProjectDetails } from '@/data/projects';

// interface ProjectID {
//   id: string;
// }

// const ProjectDetailWrap: React.FC<ProjectID> = ({ id }) => {


//   let screenshotIdx = 0;
//   let currentGameVideo = null;
//   let screenshotsData = [];

//   function renderScreenshot() {
//     // const videoEl = document.getElementById('gd-video');
//     // videoEl.src = '';
//     // videoEl.style.display = 'none';
//     // const img = document.getElementById('gd-main-img');
//     // img.src = screenshotsData[screenshotIdx];
//     // img.style.display = 'block';
//     // document.getElementById('gd-img-prev').disabled = false;
//     // document.getElementById('gd-img-next').disabled = false;
//     // document.getElementById('gd-play-btn').style.display = (screenshotIdx === 0 && currentGameVideo) ? 'flex' : 'none';
//   }

//   function stepScreenshot(dir) {
//     screenshotIdx = (screenshotIdx + dir + screenshotsData.length) % screenshotsData.length;
//     renderScreenshot();
//   }

//   function openGameDetail(key) {
//     //conseguir project
//     const gameData = data[key];
//     //consigue wrap del detalle a abrir
//     const wrap = document.getElementById('game-detail-wrap');
//     if (!gameData||!wrap) return;

//     // rellenar datos del detalle con el project
//     // document.getElementById('gd-tag').textContent = gameData.tag;
//     // const steamLink = gameData.steamUrl ? `<a href="${gameData.steamUrl}" target="_blank" rel="noopener" class="gd-steam-link" onclick="event.stopPropagation()"><i class="ti ti-brand-steam"></i></a>` : '';
//     // document.getElementById('gd-title').innerHTML = `<span>${gameData.title}</span>${steamLink}`;
//     // document.getElementById('gd-studio').textContent = gameData.studio;
//     // document.getElementById('gd-role').textContent = gameData.role;
//     // document.getElementById('gd-overview').innerHTML = gameData.overview.split('\n\n').map(p => `<p>${p}</p>`).join('');
//     // currentGameVideo = gameData.video || null;
//     // if (gameData.video) { document.getElementById('gd-video').dataset.src = gameData.video; }
//     // screenshotsData = gameData.imgs;
//     // screenshotIdx = 0;
//     // renderScreenshot();
//     // document.getElementById('gd-tasks').innerHTML = gameData.tasks.map(t => `<li>${t}</li>`).join('');
//     // const quoteEl = document.getElementById('gd-quote');
//     // if (gameData.quote) { document.getElementById('gd-quote-text').textContent = gameData.quote; document.getElementById('gd-quote-cite').textContent = gameData.quoteAuthor || ''; quoteEl.style.display = 'block'; }
//     // else { quoteEl.style.display = 'none'; }
//     // currentSectionsData = gameData.sections || [];
//     // sectionImgPages = currentSectionsData.map(() => 0);
//     // document.getElementById('gd-sections').innerHTML = currentSectionsData.map((s, i) => {
//     //   const imgsEl = `<div class="gd-section-imgs" id="gd-section-imgs-${i}"></div>`;
//     //   const captionEl = s.captions ? `<p class="gd-section-caption" id="gd-section-caption-${i}"></p>` : '';
//     //   const navEl = s.imgs.length > 2 ? `<div class="gd-section-imgs-nav"><button class="gd-section-nav-btn" onclick="stepSectionImgs(${i},-1)"><i class="ti ti-chevron-left"></i></button><button class="gd-section-nav-btn" onclick="stepSectionImgs(${i},1)"><i class="ti ti-chevron-right"></i></button></div>` : '';
//     //   const captionSpan = s.captions ? `<p class="gd-section-caption gd-span-full" id="gd-section-caption-${i}"></p>` : '';
//     //   const navSpan = s.imgs.length > 2 ? `<div class="gd-section-imgs-nav gd-span-full"><button class="gd-section-nav-btn" onclick="stepSectionImgs(${i},-1)"><i class="ti ti-chevron-left"></i></button><button class="gd-section-nav-btn" onclick="stepSectionImgs(${i},1)"><i class="ti ti-chevron-right"></i></button></div>` : '';
//     //   const rightCol = s.gifs
//     //     ? `<div class="gd-section-media${s.pageSize === 1 ? ' gd-section-media--single' : ''}"><div class="gd-gif-player" id="gd-gif-player-${i}"><img id="gd-gif-img-${i}" src="" alt=""><div class="gd-gif-fade" id="gd-gif-fade-${i}"></div></div>${imgsEl}${captionSpan}${navSpan}</div>`
//     //     : `<div>${imgsEl}${captionEl}${navEl}</div>`;
//     //   return `<div class="gd-section"><h4 class="gd-section-title">${s.title}</h4><div class="gd-section-body"><ul class="game-detail-tasks">${s.tasks.map(t => `<li>${t}</li>`).join('')}</ul>${rightCol}</div></div>`;
//     // }).join('');
//     // currentSectionsData.forEach((_, i) => renderSectionImgs(i));

//     //marcar como active el proyecto seleccionado en la lista
//     document.querySelectorAll('.game-card').forEach(c => c.classList.remove('active'));
//     document.querySelector(`.game-card[data-game="${key}"]`)?.classList.add('active');

//     // marcar el wrap como open para mostrar el detalle
//     if (wrap.dataset.active === key && wrap.classList.contains('open')) { closeGameDetail(); return; }
//     wrap.dataset.active = key;
//     wrap.classList.add('open');

//     // animación de mostrar
//     setTimeout(() => wrap.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 450);
//   }

//   function closeGameDetail() {
//     //stopAllGifCycles();
//     const wrap = document.getElementById('game-detail-wrap');
//     if (!wrap) return;
//     wrap.classList.remove('open');
//     wrap.dataset.active = '';
//     // const videoEl = document.getElementById('gd-video');
//     // if (!videoEl) return;
//     // videoEl.src = '';
//     // videoEl.style.display = 'none';
//     const btn = document.getElementById('gd-play-btn');
//     if (btn) btn.style.display = 'none';
//     const img = document.getElementById('gd-main-img');
//     if (img) img.style.display = 'block';
//     document.querySelectorAll('.game-card').forEach(c => c.classList.remove('active'));
//   }


//   function RenderCloseGameDetailButton() {
//     return (
//       <button className="game-detail-close" onClick={() => closeGameDetail()}>✕</button>
//     );
//   }


//   return (
//     <section>


//         <p>{id}</p>

//         <div className="game-detail-wrap" id="game-detail-wrap">
//           <div className="game-detail">
//             <div className="game-detail-inner">
//               <button className="game-detail-close" onClick={() => closeGameDetail()}>✕</button>
//               <div className="game-detail-screenshots">
//                 <div className="game-detail-main">
//                   <img id="gd-main-img" alt=""></img>
//                   <div id="gd-play-btn" className="gd-play-btn">
//                     <div className="gd-play-btn-icon"><i className="ti ti-player-play-filled"></i></div>
//                   </div>
//                   <iframe id="gd-video" allow="autoplay; fullscreen; encrypted-media" allowFullScreen={true}></iframe>
//                   <div className="gd-img-nav">
//                     <button className="gd-img-btn" id="gd-img-prev" onClick={stepScreenshot(-1)}><i className="ti ti-chevron-left"></i></button>
//                     <button className="gd-img-btn" id="gd-img-next" onClick={stepScreenshot(1)}><i className="ti ti-chevron-right"></i></button>
//                   </div>
//                 </div>
//               </div>
//               <div className="game-detail-info">
//                 <p className="game-detail-tag" id="gd-tag"></p>
//                 <h3 className="game-detail-title" id="gd-title"></h3>
//                 <p className="game-detail-studio" id="gd-studio"></p>
//                 <p className="game-detail-role" id="gd-role"></p>
//                 <div className="game-detail-overview" id="gd-overview"></div>
//                 <div>
//                   <p className="game-detail-tasks-label">Responsibilities</p>
//                   <ul className="game-detail-tasks" id="gd-tasks"></ul>
//                 </div>
//                 <blockquote className="about-quote" id="gd-quote" style={{display:"none", marginTop:"1.5rem"}}>
//                   <p id="gd-quote-text"></p>
//                   <cite id="gd-quote-cite"></cite>
//                 </blockquote>
//               </div>
//             </div>
//             <div id="gd-sections"></div>
//           </div>
//         </div>
//       </section>
//   );
// // style={{marginRight: spacing + 'em'}}
// // display:none, margin-top:1.5rem
// };

// export default ProjectDetailWrap;
