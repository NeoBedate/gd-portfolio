"use client"

import { useEffect, useRef } from "react";

import dayjs from 'dayjs';
import Image from 'next/image';
import React from 'react';

import type { ProjectDetails, ProjectResponsibilities } from '@/data/projects';
import { CloseChevron, LeftChevron, PlayChevron, RightChevron } from '@/components/Icons';

export interface ProjectDetailProp {
    project: ProjectDetails | undefined;
}

const ProjectDetailWrap: React.FC<ProjectDetailProp> = ({ project }) => {

  var screenshotIdx = 0;

  const imageElement = useRef<HTMLImageElement>(null);
  const videoElement = useRef<HTMLIFrameElement>(null);
  const wrapElement = useRef<HTMLDivElement>(null);
  const playButtonElement = useRef<HTMLButtonElement>(null);

  const sectionImages = useRef<(HTMLImageElement|null)[]>([]);
  const sectionCaption = useRef<HTMLDivElement[]>([]);

  var sectionsDisplayIdxs : number[] = [0,0,0,0];

  ///// Call init after any props data changed (project)
  useEffect(initialize);

  ///// Get all element references and initialize image display
  function initialize(){

    var sectionsDisplayIdxs : number[] = [];
    project?.sections?.forEach((element, idx )=> {
      sectionsDisplayIdxs[idx] = 0;
    });
    
    screenshotIdx = 0;
    renderScreenshot();
  }

  ////// Change gifs and caption of a section to the next or previous ones
  function stepSection(section:ProjectResponsibilities , sectionIdx:number, step:number){
    
    ////// Obtain current display index of section and calculate the new value
    var currentIdx = sectionsDisplayIdxs[sectionIdx];
    if (step > 0) {
      currentIdx += 1;
      if (currentIdx >= section.gifs.length)
        currentIdx = 0;
    }
    else {
      currentIdx -= 1;
      if (currentIdx < 0)
        currentIdx = section.gifs.length -1;
    }

    ////// Update display index of section
    sectionsDisplayIdxs[sectionIdx] = currentIdx;

    sectionImages.current[sectionIdx*2]!.src = section.gifs[currentIdx][0];
    sectionImages.current[(sectionIdx*2) + 1]!.src = section.gifs[currentIdx][0];
    sectionCaption.current[sectionIdx].innerHTML = section.captions[currentIdx];
  }


  function startVideo(){
    imageElement.current!.style.display = 'none';
    videoElement.current!.src = project!.trailer!;
    videoElement.current!.style.display = 'flex';
    playButtonElement.current!.style.display = 'none';
  }

  function stopVideo(){
    imageElement.current!.style.display = 'flex';
    videoElement.current!.style.display = 'none';
    videoElement.current!.src = "";
  }


  function renderScreenshot() {
    imageElement.current!.style.display = 'flex';
    videoElement.current!.style.display = 'none';
    if (screenshotIdx == 0) {
      playButtonElement.current!.style.display = 'block';
    }
    else {
      stopVideo();
      playButtonElement.current!.style.display = 'none';
    }
    if (project != null && project.images != null)
      imageElement.current!.src = project.images[screenshotIdx];
  }

  function stepScreenshot(dir: number) {
    if (project != null && project.images != null){
      screenshotIdx = (screenshotIdx + dir + project.images.length) % project.images.length;
      renderScreenshot();
    }
  }

//   function openGameDetail(key) {
//     //conseguir project
//     const gameData = data[key];
//     //consigue wrap del detalle a abrir
//     const wrap = document.getElementById('game-detail-wrap');
//     if (!gameData||!wrap) return;

//     // rellenar datos del detalle con el project
//     // document.getElementById('game-detail-tag').textContent = gameData.tag;
//     // const steamLink = gameData.steamUrl ? `<a href="${gameData.steamUrl}" target="_blank" rel="noopener" class="game-detail-steam-link" onclick="event.stopPropagation()"><i class="ti ti-brand-steam"></i></a>` : '';
//     // document.getElementById('game-detail-title').innerHTML = `<span>${gameData.title}</span>${steamLink}`;
//     // document.getElementById('game-detail-studio').textContent = gameData.studio;
//     // document.getElementById('game-detail-role').textContent = gameData.role;
//     // document.getElementById('game-detail-overview').innerHTML = gameData.overview.split('\n\n').map(p => `<p>${p}</p>`).join('');
//     // currentGameVideo = gameData.video || null;
//     // if (gameData.video) { document.getElementById('game-detail-video').dataset.src = gameData.video; }
//     // screenshotsData = gameData.imgs;
//     // screenshotIdx = 0;
//     // renderScreenshot();
//     // document.getElementById('game-detail-tasks').innerHTML = gameData.tasks.map(t => `<li>${t}</li>`).join('');
//     // const quoteEl = document.getElementById('game-detail-quote');
//     // if (gameData.quote) { document.getElementById('game-detail-quote-text').textContent = gameData.quote; document.getElementById('game-detail-quote-cite').textContent = gameData.quoteAuthor || ''; quoteEl.style.display = 'block'; }
//     // else { quoteEl.style.display = 'none'; }
//     // currentSectionsData = gameData.sections || [];
//     // sectionImgPages = currentSectionsData.map(() => 0);
//     // document.getElementById('game-detail-sections').innerHTML = currentSectionsData.map((s, i) => {
//     //   const imgsEl = `<div class="game-detail-section-imgs" id="game-detail-section-imgs-${i}"></div>`;
//     //   const captionEl = s.captions ? `<p class="game-detail-section-caption" id="game-detail-section-caption-${i}"></p>` : '';
//     //   const navEl = s.imgs.length > 2 ? `<div class="game-detail-section-imgs-nav"><button class="game-detail-section-nav-btn" onclick="stepSectionImgs(${i},-1)"><i class="ti ti-chevron-left"></i></button><button class="game-detail-section-nav-btn" onclick="stepSectionImgs(${i},1)"><i class="ti ti-chevron-right"></i></button></div>` : '';
//     //   const captionSpan = s.captions ? `<p class="game-detail-section-caption game-detail-span-full" id="game-detail-section-caption-${i}"></p>` : '';
//     //   const navSpan = s.imgs.length > 2 ? `<div class="game-detail-section-imgs-nav game-detail-span-full"><button class="game-detail-section-nav-btn" onclick="stepSectionImgs(${i},-1)"><i class="ti ti-chevron-left"></i></button><button class="game-detail-section-nav-btn" onclick="stepSectionImgs(${i},1)"><i class="ti ti-chevron-right"></i></button></div>` : '';
//     //   const rightCol = s.gifs
//     //     ? `<div class="game-detail-section-media${s.pageSize === 1 ? ' game-detail-section-media--single' : ''}"><div class="game-detail-gif-player" id="game-detail-gif-player-${i}"><img id="game-detail-gif-img-${i}" src="" alt=""><div class="game-detail-gif-fade" id="game-detail-gif-fade-${i}"></div></div>${imgsEl}${captionSpan}${navSpan}</div>`
//     //     : `<div>${imgsEl}${captionEl}${navEl}</div>`;
//     //   return `<div class="game-detail-section"><h4 class="game-detail-section-title">${s.title}</h4><div class="game-detail-section-body"><ul class="game-detail-tasks">${s.tasks.map(t => `<li>${t}</li>`).join('')}</ul>${rightCol}</div></div>`;
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


  ////// Close detail. Hide elements data, remove 'open' classname from wrap and remove 'active' classname from cards
  function closeGameDetail() {
    wrapElement.current!.classList.remove('open');
    
    videoElement.current!.src = '';
    videoElement.current!.style.display = 'none';
    
    playButtonElement.current!.style.display = 'none';
    
    ///////// Remove 'active' classname of all cards
    document.querySelectorAll('.game-card').forEach(c => c.classList.remove('active'));
  }


  function RenderCloseGameDetailButton() {
    return (
      <button className="game-detail-close" onClick={() => closeGameDetail()}><CloseChevron/></button>
    );
  }

  if(project == null) return;

  
  return (
    <section>
      <div className="game-detail-wrap" id="game-detail-wrap" ref={wrapElement}>
        <div className="game-detail">
          <div className="game-detail-heading">
            <h3 className="game-detail-title" id="game-detail-title" >{project.name}</h3>
            <p className="game-detail-studio" id="game-detail-studio">|{project.studio}</p>
            <button className="game-detail-close" onClick={closeGameDetail}><CloseChevron/></button>
          </div>
          <p className="game-detail-tag" id="game-detail-tag">{project.dimensions} · {project.genre} · Publishing Date: {project.publishingDate}</p>
          <div className="game-detail-tech"><p className="game-detail-tech-label">Tech:</p>
            {project.tech?.map((t) => (
            <span key={t} className="tech-tag">
              {t}
            </span>
            ))}
          </div>
          <div className="game-detail-responsibilities">
              <div className="game-detail-screenshots">
                <div className="game-detail-main">
                  <img id="game-detail-main-img" ref={imageElement} alt=""></img>                  
                  <iframe id="game-detail-video" ref={videoElement} width="560" height="315" allow="autoplay; clipboard-write; encrypted-media;" referrerPolicy="strict-origin-when-cross-origin"></iframe>
                  <div className="game-detail-img-nav">
                    <span className="game-detail-img-btn" id="game-detail-img-prev" onClick={() => stepScreenshot(-1)}><LeftChevron/></span>
                    <span className="game-detail-img-btn" id="game-detail-img-next" onClick={() => stepScreenshot(1)}><RightChevron/></span>
                  </div>
                  <button id="game-detail-play-btn" ref={playButtonElement} className="game-detail-play-btn" onClick={startVideo}>
                    <div className="game-detail-play-btn-icon"><PlayChevron/></div>
                  </button>
                </div>
              </div>
            <div>
              <p className="game-detail-role" id="game-detail-role">{project.position}</p>
              <p className="game-detail-overview" id="game-detail-overview">{project.summary}</p>
              <div>
                <p className="game-detail-tasks-label">Responsibilities</p>
                <ul className="game-detail-tasks" id="game-detail-tasks">
                  {project.highlights.map((highlight, idx) => (
                    <li key={idx}>{highlight}</li>))}
                </ul>
              </div>
              {/* <blockquote className="about-quote" id="game-detail-quote">
                  <p id="game-detail-quote-text">{project.quote}</p> 
                <cite id="game-detail-quote-cite"></cite>
              </blockquote> */}
            </div>
          </div>
            { 
          ////////// Render ALL sections (map)
          project.sections?.map((section, sectionIdx) => (            
            ////////// Render EACH section
            <div className="game-detail-section" key={sectionIdx}>
              <h2 className="game-detail-section-title">{section.task}</h2>
              <div className="game-detail-section-body">
                <div className="game-detail-section-taskText">
                  {section.taskExecution.map((taskExecution, idx) => (
                    <p className="game-detail-section-task" key={idx}>{taskExecution}</p>
                ))}
                </div>
                <div className="game-detail-section-taskImage">
                  <img id={`game-detail-section-${sectionIdx}-taskImage`} src={section.taskImage} width={512} height={512} className="game-detail-section-taskImage-image"></img>
                  <h4 id={`game-detail-section-${sectionIdx}-taskCaption`} className="game-detail-section-caption">{section.taskCaption}</h4>
                </div>
              </div>
              <div>
                <div className="game-detail-section-gifs" id={`game-detail-section-gifs-${sectionIdx}`}>
                  <span className="game-detail-section-nav-btn" onClick={() => stepSection(section, sectionIdx, -1)}><LeftChevron/></span>
                  <img id={`game-detail-section-${sectionIdx}-img-0`} ref={(el) => {sectionImages.current[sectionIdx * 2] = el!}} src={section.gifs[sectionsDisplayIdxs[sectionIdx]][0]}></img>
                  <img id={`game-detail-section-${sectionIdx}-img-1`} ref={(el) => {sectionImages.current[(sectionIdx * 2) + 1] = el!}} src={section.gifs[sectionsDisplayIdxs[sectionIdx]][1]}></img>
                  <span className="game-detail-section-nav-btn" onClick={() => stepSection(section, sectionIdx, 1)}><RightChevron/></span>
                </div>
                <h4 className="game-detail-section-caption" id={`game-detail-section-${sectionIdx}-caption`} ref={(el) => {sectionCaption.current[sectionIdx] = el!}}>{section.captions[sectionsDisplayIdxs[sectionIdx]]}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
// // style={{marginRight: spacing + 'em'}}
// // display:none, margin-top:1.5rem
};

export default ProjectDetailWrap;
