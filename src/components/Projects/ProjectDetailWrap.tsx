'use client';

import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import {
  CloseChevron,
  LeftChevron,
  PlayChevron,
  RightChevron,
} from '@/components/Icons';
import ProjectMedia from '@/components/Projects/ProjectMedia';
import { t } from '@/data/i18n/ui';
import type { ProjectDetails, ProjectResponsibilities } from '@/data/projects';
import { DATE_LOCALE, type Lang } from '@/lib/i18n';

export interface ProjectDetailProp {
  project: ProjectDetails | undefined;
  lang?: Lang;
}

/** 'Oct 2024' in English, 'oct 2024' in Spanish. */
function releaseMonth(date: string, lang: Lang): string {
  if (lang === 'en') return dayjs(date).format('MMM YYYY');
  return new Date(`${date}T12:00:00Z`)
    .toLocaleDateString(DATE_LOCALE[lang], {
      month: 'short',
      year: 'numeric',
      timeZone: 'UTC',
    })
    .replace(' de ', ' ')
    .replace('.', '');
}

const ProjectDetailWrap: React.FC<ProjectDetailProp> = ({
  project,
  lang = 'en',
}) => {
  const text = t(lang).portfolio;
  // A ref, not a plain variable, so re-renders don't reset it.
  const screenshotIdx = useRef(0);
  const initializedProjectId = useRef<string | undefined>(undefined);

  const imageElement = useRef<HTMLImageElement>(null);
  const videoElement = useRef<HTMLIFrameElement>(null);
  const wrapElement = useRef<HTMLDivElement>(null);
  const playButtonElement = useRef<HTMLButtonElement>(null);

  // Which pair each section's carousel shows. Rendered from state so a slot
  // can switch between a still (<img>) and a clip (<video>). Scoped to the
  // project, so opening another project starts every carousel at 0.
  const [carousel, setCarousel] = useState<{
    projectId: string | undefined;
    idxs: number[];
  }>({ projectId: undefined, idxs: [] });
  const sectionIdxs = carousel.projectId === project?.id ? carousel.idxs : [];

  ///// Initialize the screenshot viewer when the project changes (not on
  ///// every render: stepping a section carousel must not reset it).
  useEffect(() => {
    if (initializedProjectId.current === project?.id) return;
    initializedProjectId.current = project?.id;
    initialize();
  });

  function initialize() {
    screenshotIdx.current = 0;
    renderScreenshot();
  }

  ////// Show the next or previous pair of a section, wrapping around
  function stepSection(
    section: ProjectResponsibilities,
    sectionIdx: number,
    step: number,
  ) {
    const count = section.gifs.length;
    const next = [...sectionIdxs];
    next[sectionIdx] = ((sectionIdxs[sectionIdx] ?? 0) + step + count) % count;
    setCarousel({ projectId: project?.id, idxs: next });
  }

  function startVideo() {
    imageElement.current!.style.display = 'none';
    videoElement.current!.src = project!.trailer!;
    videoElement.current!.style.display = 'flex';
    playButtonElement.current!.style.display = 'none';
  }

  function stopVideo() {
    imageElement.current!.style.display = 'flex';
    videoElement.current!.style.display = 'none';
    videoElement.current!.src = '';
  }

  function renderScreenshot() {
    imageElement.current!.style.display = 'flex';
    videoElement.current!.style.display = 'none';
    if (screenshotIdx.current == 0) {
      playButtonElement.current!.style.display = 'block';
    } else {
      stopVideo();
      playButtonElement.current!.style.display = 'none';
    }
    if (project != null && project.images != null) {
      imageElement.current!.src = project.images[screenshotIdx.current];
      var imageLink: HTMLLinkElement = imageElement.current!
        .parentElement as HTMLLinkElement;
      if (imageLink != null) {
        // if (screenshotIdx == 0) {
        //   imageLink.href = "";
        // }
        // else
        {
          imageLink.href = project.images[screenshotIdx.current];
        }
      }
    }
  }

  function stepScreenshot(dir: number) {
    if (project != null && project.images != null) {
      screenshotIdx.current =
        (screenshotIdx.current + dir + project.images.length) %
        project.images.length;
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
    document
      .querySelectorAll('.game-card')
      .forEach((c) => c.classList.remove('active'));
  }

  function RenderCloseGameDetailButton() {
    return (
      <button className="game-detail-close" onClick={() => closeGameDetail()}>
        <CloseChevron />
      </button>
    );
  }

  if (project == null) return;

  function CreateMarkup(content: string) {
    return { __html: content };
  }

  return (
    <section>
      <div className="game-detail-wrap" id="game-detail-wrap" ref={wrapElement}>
        <div className="game-detail">
          <div className="game-detail-heading">
            <h3 className="game-detail-title" id="game-detail-title">
              {project.name}
            </h3>
            <button
              type="button"
              className="game-detail-close"
              onClick={closeGameDetail}
              aria-label={text.close}
            >
              <CloseChevron />
            </button>
          </div>
          <p className="game-detail-studio" id="game-detail-studio">
            {project.studio} ·{' '}
            <span className="game-detail-tag" id="game-detail-tag">
              {project.dimensions} · {project.genre}
              {project.publishingDate
                ? ` · ${text.released} ${releaseMonth(project.publishingDate, lang)}`
                : ''}
            </span>
          </p>
          <div className="game-detail-tech">
            <p className="game-detail-tech-label">{text.tech}</p>
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
                <iframe
                  id="game-detail-video"
                  ref={videoElement}
                  width="560"
                  height="315"
                  allow="autoplay; clipboard-write; encrypted-media;"
                  referrerPolicy="strict-origin-when-cross-origin"
                ></iframe>
                <div className="game-detail-img-nav">
                  <span
                    className="game-detail-img-btn"
                    id="game-detail-img-prev"
                    onClick={() => stepScreenshot(-1)}
                  >
                    <LeftChevron />
                  </span>
                  <span
                    className="game-detail-img-btn"
                    id="game-detail-img-next"
                    onClick={() => stepScreenshot(1)}
                  >
                    <RightChevron />
                  </span>
                </div>
                <button
                  id="game-detail-play-btn"
                  ref={playButtonElement}
                  className="game-detail-play-btn"
                  onClick={startVideo}
                >
                  <div className="game-detail-play-btn-icon">
                    <PlayChevron />
                  </div>
                </button>
              </div>
            </div>
            <div>
              <p className="game-detail-role" id="game-detail-role">
                {project.position}
              </p>
              <p className="game-detail-overview" id="game-detail-overview">
                {project.summary}
              </p>
              <div>
                <p className="game-detail-tasks-label">
                  {text.responsibilities}
                </p>
                <ul className="game-detail-tasks" id="game-detail-tasks">
                  {project.highlights.map((highlight, idx) => (
                    <li key={idx}>{highlight}</li>
                  ))}
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
            project.sections?.map((section, sectionIdx) => {
              const pairIdx = sectionIdxs[sectionIdx] ?? 0;
              const pair = section.gifs[pairIdx];
              ////////// Render EACH section
              return (
                <div className="game-detail-section" key={sectionIdx}>
                  <h2 className="game-detail-section-title">{section.task}</h2>
                  <div className="game-detail-section-body">
                    <div className="game-detail-section-taskText">
                      {section.taskExecution.map((taskExecution, idx) => (
                        <p
                          className="game-detail-section-task"
                          key={idx}
                          dangerouslySetInnerHTML={CreateMarkup(taskExecution)}
                        ></p>
                      ))}
                    </div>
                    {section.taskImage && (
                      <div className="game-detail-section-taskImage">
                        <a href={section.taskImage} target="_blank">
                          <ProjectMedia
                            id={`game-detail-section-${sectionIdx}-taskImage`}
                            src={section.taskImage}
                            width={512}
                            height={512}
                            className="game-detail-section-taskImage-image"
                          />
                        </a>
                        <h4
                          id={`game-detail-section-${sectionIdx}-taskCaption`}
                          className="game-detail-section-caption"
                        >
                          {section.taskCaption}
                        </h4>
                      </div>
                    )}
                  </div>
                  <div>
                    <div
                      className="game-detail-section-gifs"
                      id={`game-detail-section-gifs-${sectionIdx}`}
                    >
                      <span
                        className="game-detail-section-nav-btn"
                        onClick={() => stepSection(section, sectionIdx, -1)}
                      >
                        <LeftChevron />
                      </span>
                      {pair.map((src, slot) => (
                        <a href={src} target="_blank" key={slot}>
                          <ProjectMedia
                            width={640}
                            height={640}
                            id={`game-detail-section-${sectionIdx}-img-${slot}`}
                            src={src}
                          />
                        </a>
                      ))}
                      <span
                        className="game-detail-section-nav-btn"
                        onClick={() => stepSection(section, sectionIdx, 1)}
                      >
                        <RightChevron />
                      </span>
                    </div>
                    <h4
                      className="game-detail-section-caption"
                      id={`game-detail-section-${sectionIdx}-caption`}
                    >
                      {section.captions[pairIdx]}
                    </h4>
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    </section>
  );
  // // style={{marginRight: spacing + 'em'}}
  // // display:none, margin-top:1.5rem
};

export default ProjectDetailWrap;
