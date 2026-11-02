import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { projects } from "../data/projectsData";


const copy = {
  pt: {
    back: "Voltar ao portfólio",
    eyebrow: "Estudos de caso",
    title: "Projetos em destaque",
    description: "Cada projeto tem abas com os vídeos, evidências, documentos e protótipos. Role e explore.",
    scroll: "Role para baixo",
    projectsNav: "Projetos",
    role: "Meu papel",
    period: "Período",
    whatIDid: "O que eu fiz",
    results: "Resultados",
    summary: "Resumo da análise",
    evidenceDetails: "Detalhamento das evidências",
    clickToEnlarge: "Clique na imagem para ampliar",
    tabs: { overview: "Visão geral", figma: "Protótipo", document: "Documento", video: "Vídeo", gallery: "Fotos" },
    openFigma: "Abrir no Figma",
    openDoc: "Abrir documento",
    download: "Baixar PDF",
    pdfNote: "No celular, abra o documento em outra aba para ler com calma.",
    close: "Fechar",
    prev: "Foto anterior",
    next: "Próxima foto",
    screens: "Telas",
  },
  en: {
    back: "Back to portfolio",
    eyebrow: "Case studies",
    title: "Featured projects",
    description: "Each project has tabs with videos, evidence, documents and prototypes. Scroll and explore.",
    scroll: "Scroll down",
    projectsNav: "Projects",
    role: "My role",
    period: "Period",
    whatIDid: "What I did",
    results: "Results",
    summary: "Analysis summary",
    evidenceDetails: "Evidence breakdown",
    clickToEnlarge: "Click image to enlarge",
    tabs: { overview: "Overview", figma: "Prototype", document: "Document", video: "Video", gallery: "Photos" },
    openFigma: "Open in Figma",
    openDoc: "Open document",
    download: "Download PDF",
    pdfNote: "On a phone, open the document in a new tab to read it comfortably.",
    close: "Close",
    prev: "Previous photo",
    next: "Next photo",
    screens: "Screens",
  },
  es: {
    back: "Volver al portafolio",
    eyebrow: "Casos de estudio",
    title: "Proyectos destacados",
    description: "Cada proyecto tiene pestañas con los videos, evidencias, documentos y prototipos. Desplázate y explora.",
    scroll: "Desplázate",
    projectsNav: "Proyectos",
    role: "Mi rol",
    period: "Período",
    whatIDid: "Lo que hice",
    results: "Resultados",
    summary: "Resumen del análisis",
    evidenceDetails: "Detalle de las evidencias",
    clickToEnlarge: "Haz clic para ampliar",
    tabs: { overview: "Resumen", figma: "Prototipo", document: "Documento", video: "Video", gallery: "Fotos" },
    openFigma: "Abrir en Figma",
    openDoc: "Abrir documento",
    download: "Descargar PDF",
    pdfNote: "En el celular, abre el documento en otra pestaña para leerlo con calma.",
    close: "Cerrar",
    prev: "Foto anterior",
    next: "Foto siguiente",
    screens: "Pantallas",
  },
  ko: {
    back: "포트폴리오로 돌아가기",
    eyebrow: "케이스 스터디",
    title: "주요 프로젝트",
    description: "각 프로젝트의 탭에서 영상, 증거 자료, 문서, 프로토타입을 볼 수 있습니다. 스크롤하며 둘러보세요.",
    scroll: "아래로 스크롤",
    projectsNav: "프로젝트",
    role: "내 역할",
    period: "기간",
    whatIDid: "내가 한 일",
    results: "성과",
    summary: "분석 요약",
    evidenceDetails: "세부 증거 자료",
    clickToEnlarge: "클릭하여 확대",
    tabs: { overview: "개요", figma: "프로토타입", document: "문서", video: "영상", gallery: "사진" },
    openFigma: "Figma에서 열기",
    openDoc: "문서 열기",
    download: "PDF 다운로드",
    pdfNote: "휴대폰에서는 문서를 새 탭에서 열어 확인하세요.",
    close: "닫기",
    prev: "이전 사진",
    next: "다음 사진",
    screens: "화면",
  },
};

/* ---------- helpers ---------- */

const pick = (value, lang) => {
  if (Array.isArray(value)) return value;
  if (value && typeof value === "object") return value[lang] ?? value.pt ?? "";
  return value ?? "";
};

const norm = (img) => (typeof img === "string" ? { src: img, alt: "" } : img);

const tabKey = (tab) => tab.id || tab.type;

function hasContent(tab) {
  switch (tab.type) {
    case "overview":
      return true;
    case "figma":
      return Boolean(tab.embedUrl || tab.link || tab.images?.length);
    case "document":
      return Boolean(tab.file || tab.pages?.length || tab.points?.length);
    case "video":
      return Boolean(tab.src || tab.youtubeId);
    case "gallery":
      return Boolean(tab.images?.length || tab.captions?.length);
    default:
      return false;
  }
}

/* ---------- peças de animação ---------- */

function RevealTitle({ text, reduce, darkMode }) {
  if (!text) return null;
  return (
    <h2
      aria-label={text}
      className={`text-3xl font-black leading-[1.12] tracking-tight sm:text-4xl lg:text-5xl ${
        darkMode ? "text-white" : "text-neutral-900"
      }`}
    >
      {text.split(" ").map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden="true"
          className="mr-[0.25em] inline-block overflow-hidden pb-1 align-bottom"
        >
          <motion.span
            className="inline-block"
            initial={reduce ? false : { y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h2>
  );
}

function TiltFrame({ children, reduce }) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 18 });
  const sry = useSpring(ry, { stiffness: 150, damping: 18 });

  const onMove = (event) => {
    if (reduce) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * 6);
    rx.set(-py * 6);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <div style={{ perspective: 1000 }}>
      <motion.div
        onMouseMove={onMove}
        onMouseLeave={reset}
        style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ---------- lightbox e grade de fotos (com suporte a legendas/captions) ---------- */

function ImageGrid({ images, captions, onOpen, darkMode, c }) {
  // Se houver captions detalhadas (ex: Causa Raiz, Evidências e IA.PNG), exibe cards ricos
  if (captions?.length > 0) {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {captions.map((item, i) => (
          <div
            key={item.src || i}
            onClick={() => onOpen(i)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onOpen(i)}
            className={`group cursor-pointer flex flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
              darkMode
                ? "border-white/10 bg-neutral-900/70 hover:border-red-500/60 hover:shadow-red-950/30"
                : "border-neutral-200 bg-neutral-50 hover:border-red-500/60"
            }`}
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/40">
              <img
                src={item.src}
                alt={item.title || ""}
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <span className="absolute bottom-2.5 right-2.5 rounded-lg bg-black/75 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm opacity-0 transition-opacity group-hover:opacity-100">
                🔍 {c?.clickToEnlarge || "Ampliar"}
              </span>
            </div>
            <div className="flex flex-1 flex-col justify-between p-4">
              <div>
                {item.title && (
                  <h5 className={`text-sm font-bold tracking-tight ${darkMode ? "text-white" : "text-neutral-900"}`}>
                    {item.title}
                  </h5>
                )}
                {item.text && (
                  <p className={`mt-1.5 text-xs leading-relaxed ${darkMode ? "text-neutral-400" : "text-neutral-600"}`}>
                    {item.text}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {images.map(norm).map((img, i) => (
        <button
          key={img.src}
          type="button"
          onClick={() => onOpen(i)}
          className={`group relative aspect-[4/3] overflow-hidden rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-400 ${
            darkMode
              ? "border-white/10 bg-neutral-900 hover:border-red-500/50"
              : "border-neutral-200 bg-neutral-100 hover:border-red-500/50"
          }`}
        >
          <img
            src={img.src}
            alt={img.alt}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </button>
      ))}
    </div>
  );
}

function Lightbox({ images, captions, index, onClose, onChange, c }) {
  const list = images.map(norm);
  const img = list[index];
  const captionObj = captions?.[index];

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onChange((index + 1) % list.length);
      if (event.key === "ArrowLeft") onChange((index - 1 + list.length) % list.length);
    };
    window.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [index, list.length, onClose, onChange]);

  const navButton =
    "absolute top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-xl text-white backdrop-blur transition hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400";

  return createPortal(
    <motion.div
      role="dialog"
      aria-modal="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 p-4 backdrop-blur-md"
    >
      <motion.img
        key={img.src}
        src={img.src}
        alt={captionObj?.title || img.alt}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={(event) => event.stopPropagation()}
        className="max-h-[75vh] max-w-full rounded-xl object-contain shadow-2xl"
      />

      {captionObj && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="mt-4 max-w-2xl rounded-xl border border-white/10 bg-neutral-900/90 px-5 py-3 text-center backdrop-blur-md"
        >
          <p className="text-sm font-bold text-red-400">{captionObj.title}</p>
          {captionObj.text && <p className="mt-1 text-xs text-neutral-300">{captionObj.text}</p>}
        </div>
      )}

      <button
        type="button"
        onClick={onClose}
        aria-label={c.close}
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-xl text-white backdrop-blur transition hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
      >
        ×
      </button>
      {list.length > 1 && (
        <>
          <button
            type="button"
            aria-label={c.prev}
            onClick={(event) => {
              event.stopPropagation();
              onChange((index - 1 + list.length) % list.length);
            }}
            className={`${navButton} left-4`}
          >
            ‹
          </button>
          <button
            type="button"
            aria-label={c.next}
            onClick={(event) => {
              event.stopPropagation();
              onChange((index + 1) % list.length);
            }}
            className={`${navButton} right-4`}
          >
            ›
          </button>
        </>
      )}
    </motion.div>,
    document.body
  );
}


function Viewer({ project, content, lang, c, darkMode, reduce, parallaxY }) {
  // Mantém a ordem definida no projectsData.js (Vídeo em 1º lugar ou Visão Geral)
  const tabs = [
    { type: "overview" },
    ...(project.tabs || []).filter((tab) => tab.type !== "overview"),
  ].filter(hasContent);

  const [activeKey, setActiveKey] = useState("overview");
  const [lightbox, setLightbox] = useState(null);

  const current = tabs.find((tab) => tabKey(tab) === activeKey) || tabs[0];
  const closeLightbox = useCallback(() => setLightbox(null), []);
  const changeLightbox = useCallback((index) => setLightbox((state) => (state ? { ...state, index } : state)), []);

  const muted = darkMode ? "text-neutral-400" : "text-neutral-600";
  const panelTone = darkMode ? "border-white/10 bg-white/[0.035]" : "border-neutral-200 bg-white";
  const borderTone = darkMode ? "border-white/10" : "border-neutral-200";
  const buttonTone = darkMode
    ? "border-white/15 bg-white/[0.03] hover:border-red-500 hover:bg-red-500/10"
    : "border-neutral-300 bg-white hover:border-red-500 hover:bg-red-50/50";
  const linkButton = `inline-flex items-center justify-center gap-2 rounded-xl border px-4.5 py-3 text-sm font-semibold transition-all duration-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 ${buttonTone}`;

  const labelFor = (tab) => pick(tab.label, lang) || c.tabs[tab.type];

  const renderPanel = (tab) => {
    switch (tab.type) {
      case "overview": {
        const did = pick(content.did, lang) || [];
        const results = pick(content.results, lang) || [];
        return (
          <div className="space-y-8">
            <TiltFrame reduce={reduce}>
              <div
                className={`relative aspect-[16/10] overflow-hidden rounded-2xl border ${borderTone} ${
                  darkMode
                    ? "bg-gradient-to-br from-red-950 via-neutral-900 to-neutral-950"
                    : "bg-gradient-to-br from-red-100 via-neutral-100 to-white"
                }`}
              >
                {project.cover ? (
                  <motion.img
                    src={project.cover}
                    alt={content.title}
                    style={{ y: reduce ? 0 : parallaxY, scale: 1.12 }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <>
                    <div className="absolute -right-10 -top-12 h-48 w-48 rounded-full border border-red-500/25" />
                    <div className="absolute -bottom-16 -left-8 h-48 w-48 rounded-full bg-red-600/10 blur-2xl" />
                    <span className="absolute inset-0 flex items-center justify-center px-6 text-center text-3xl font-black tracking-tight text-red-500/70 sm:text-4xl">
                      {content.title}
                    </span>
                  </>
                )}
              </div>
            </TiltFrame>

            {did.length > 0 && (
              <div>
                <h4 className="mb-3 text-xs font-bold uppercase tracking-wider">{c.whatIDid}</h4>
                <ul className="space-y-2.5">
                  {did.map((item) => (
                    <li key={item} className={`flex gap-3 text-sm leading-6 ${muted}`}>
                      <svg
                        viewBox="0 0 20 20"
                        className="mt-1 h-4 w-4 shrink-0 text-red-500"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="m4 10.5 4 4 8-9" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {results.length > 0 && (
              <div>
                <h4 className="mb-3 text-xs font-bold uppercase tracking-wider">{c.results}</h4>
                <ul className="space-y-2.5">
                  {results.map((item) => (
                    <li key={item} className={`flex gap-3 text-sm leading-6 ${muted}`}>
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      }

      case "figma":
        return (
          <div className="space-y-5">
            {tab.embedUrl && (
              <div className={`aspect-[16/10] overflow-hidden rounded-2xl border bg-white ${borderTone} shadow-sm`}>
                <iframe title={labelFor(tab)} src={tab.embedUrl} loading="lazy" allowFullScreen className="h-full w-full" />
              </div>
            )}
            {tab.images?.length > 0 && (
              <div>
                <h4 className="mb-3 text-xs font-bold uppercase tracking-wider">{c.screens}</h4>
                <ImageGrid
                  images={tab.images}
                  darkMode={darkMode}
                  c={c}
                  onOpen={(i) => setLightbox({ images: tab.images, index: i })}
                />
              </div>
            )}
            {tab.link && (
              <div className="pt-2">
                <a href={tab.link} target="_blank" rel="noreferrer" className={linkButton}>
                  <svg className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  {c.openFigma} <span aria-hidden="true" className="text-red-500 font-bold">↗</span>
                </a>
              </div>
            )}
          </div>
        );

      case "document": {
        const points = pick(tab.points, lang) || [];
        return (
          <div className="space-y-6">
            {points.length > 0 && (
              <div>
                <h4 className="mb-3 text-xs font-bold uppercase tracking-wider">{c.summary}</h4>
                <ul className="space-y-2.5">
                  {points.map((point) => (
                    <li key={point} className={`flex gap-3 text-sm leading-6 ${muted}`}>
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {tab.file && (
              <>
                <div className={`overflow-hidden rounded-2xl border ${borderTone} shadow-sm`}>
                  <iframe
                    title={labelFor(tab)}
                    src={`${tab.file}#view=FitH`}
                    className="hidden h-[70vh] w-full bg-white md:block"
                  />
                </div>
                <p className={`text-xs leading-5 md:hidden ${muted}`}>{c.pdfNote}</p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <a href={tab.file} target="_blank" rel="noreferrer" className={linkButton}>
                    <svg className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    {c.openDoc} <span aria-hidden="true" className="text-red-500 font-bold">↗</span>
                  </a>
                  <a href={tab.file} download className={linkButton}>
                    <svg className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    {c.download} <span aria-hidden="true" className="text-red-500 font-bold">↓</span>
                  </a>
                </div>
              </>
            )}
            {tab.pages?.length > 0 && (
              <ImageGrid
                images={tab.pages}
                darkMode={darkMode}
                c={c}
                onOpen={(i) => setLightbox({ images: tab.pages, index: i })}
              />
            )}
          </div>
        );
      }

      case "video":
        return tab.youtubeId ? (
          <div className={`aspect-video overflow-hidden rounded-2xl border bg-black ${borderTone} shadow-sm`}>
            <iframe
              title={labelFor(tab)}
              src={`https://www.youtube-nocookie.com/embed/${tab.youtubeId}`}
              loading="lazy"
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
        ) : (
          <video
            controls
            playsInline
            preload="metadata"
            poster={tab.poster || undefined}
            className={`aspect-video w-full rounded-2xl border bg-black ${borderTone} shadow-sm`}
          >
            <source src={tab.src} />
          </video>
        );

      case "gallery": {
        const desc = pick(tab.description, lang);
        const points = pick(tab.points, lang) || [];
        const imgs = tab.images || (tab.captions ? tab.captions.map((item) => item.src) : []);
        return (
          <div className="space-y-6">
            {desc && (
              <div
                className={`rounded-2xl border p-4 text-sm leading-relaxed ${
                  darkMode ? "border-red-500/20 bg-red-500/[0.04] text-neutral-200" : "border-red-200 bg-red-50/50 text-neutral-700"
                }`}
              >
                {desc}
              </div>
            )}

            {points.length > 0 && (
              <div>
                <h4 className="mb-3 text-xs font-bold uppercase tracking-wider">{c.evidenceDetails}</h4>
                <ul className="space-y-2">
                  {points.map((pt) => (
                    <li key={pt} className={`flex gap-3 text-sm leading-6 ${muted}`}>
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <ImageGrid
              images={imgs}
              captions={tab.captions}
              darkMode={darkMode}
              c={c}
              onOpen={(i) => setLightbox({ images: imgs, captions: tab.captions, index: i })}
            />
          </div>
        );
      }

      default:
        return null;
    }
  };

  return (
    <div className={`rounded-3xl border p-5 sm:p-7 shadow-sm ${panelTone}`}>
      {tabs.length > 1 && (
        <div
          role="tablist"
          aria-label={content.title}
          className={`-mx-1 mb-6 flex gap-1.5 overflow-x-auto px-1 pb-2.5 [scrollbar-width:thin] [scrollbar-color:#dc2626_transparent] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-neutral-800/40 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-red-600 hover:[&::-webkit-scrollbar-thumb]:bg-red-500`}
        >
          {tabs.map((tab) => {
            const key = tabKey(tab);
            const selected = key === tabKey(current);
            return (
              <button
                key={key}
                role="tab"
                type="button"
                aria-selected={selected}
                onClick={() => setActiveKey(key)}
                className={`relative shrink-0 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-400 ${
                  selected ? "text-white shadow-md shadow-red-600/20" : `${muted} hover:text-red-500`
                }`}
              >
                {selected && (
                  <motion.span
                    layoutId={`${project.id}-tab-pill`}
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-xl bg-red-600"
                  />
                )}
                <span className="relative z-10">{labelFor(tab)}</span>
              </button>
            );
          })}
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={tabKey(current)}
          role="tabpanel"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: reduce ? 0 : 0.2 }}
        >
          {renderPanel(current)}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {lightbox && (
          <Lightbox
            images={lightbox.images}
            captions={lightbox.captions}
            index={lightbox.index}
            onClose={closeLightbox}
            onChange={changeLightbox}
            c={c}
          />
        )}
      </AnimatePresence>
    </div>
  );
}


function Chapter({ project, lang, c, darkMode, reduce, onActive, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [-28, 28]);

  const content = { ...project.content.pt, ...(project.content[lang] || {}) };
  const muted = darkMode ? "text-neutral-400" : "text-neutral-600";
  const statTone = darkMode ? "border-red-500/20 bg-red-500/[0.04]" : "border-red-200 bg-red-50/40";

  const tagContainer = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
  const tagItem = { hidden: { opacity: 0, scale: 0.9 }, show: { opacity: 1, scale: 1 } };

  return (
    <section id={project.id} ref={ref} className="scroll-mt-32 py-16 lg:py-24">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14 items-start">
        <div className="self-start lg:sticky lg:top-36 space-y-5">
          {content.subtitle && (
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-red-500">{content.subtitle}</p>
          )}
          <RevealTitle text={content.title} reduce={reduce} darkMode={darkMode} />
          {content.summary && <p className={`max-w-lg text-base leading-7 ${muted}`}>{content.summary}</p>}

          {content.highlights?.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {content.highlights.map((item) => (
                <div key={item.label} className={`rounded-2xl border px-5 py-4 w-full shadow-sm ${statTone}`}>
                  <p className="text-2xl font-black tracking-tight text-red-500">{item.value}</p>
                  <p className={`mt-1 text-xs font-medium ${muted}`}>{item.label}</p>
                </div>
              ))}
            </div>
          )}

          {(content.role || content.period) && (
            <dl className="grid grid-cols-2 gap-4 text-sm pt-2 border-t border-neutral-500/10">
              {content.role && (
                <div>
                  <dt className={muted}>{c.role}</dt>
                  <dd className="mt-1 font-semibold">{content.role}</dd>
                </div>
              )}
              {content.period && (
                <div>
                  <dt className={muted}>{c.period}</dt>
                  <dd className="mt-1 font-semibold">{content.period}</dd>
                </div>
              )}
            </dl>
          )}

          {project.tags?.length > 0 && (
            <motion.div
              variants={tagContainer}
              initial={reduce ? "show" : "hidden"}
              whileInView="show"
              viewport={{ once: true, amount: 0.8 }}
              className="flex flex-wrap gap-2 pt-1"
            >
              {project.tags.map((tag) => (
                <motion.span
                  key={tag}
                  variants={tagItem}
                  className={`rounded-lg px-3 py-1.5 text-[11px] font-semibold tracking-wide ${
                    darkMode ? "bg-white/[0.06] text-neutral-300" : "bg-neutral-100 text-neutral-700"
                  }`}
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          )}
        </div>

        <Viewer
          project={project}
          content={content}
          lang={lang}
          c={c}
          darkMode={darkMode}
          reduce={reduce}
          parallaxY={parallaxY}
        />
      </div>
    </section>
  );
}


export default function ProjectsPage({ t, lang, darkMode, onBack }) {
  const c = copy[lang] || copy.pt;
  const reduce = useReducedMotion();
  const listRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const handleActive = useCallback((i) => setActiveIndex(i), []);

  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 0.4", "end 0.6"] });
  const barScale = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  const muted = darkMode ? "text-neutral-400" : "text-neutral-600";

  const jumpTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  return (
    <div>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <section className="relative flex min-h-[58vh] flex-col items-center justify-center py-20 text-center">
          <div className="pointer-events-none absolute -right-40 top-20 h-80 w-80 rounded-full bg-red-600/10 blur-3xl" />
          <button
            type="button"
            onClick={onBack}
            className={`absolute left-0 top-6 rounded-xl border px-4 py-2 text-sm font-semibold transition cursor-pointer hover:border-red-500 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 ${
              darkMode ? "border-white/10 bg-white/[0.03]" : "border-neutral-200 bg-white"
            }`}
          >
            <span aria-hidden="true">←</span> {c.back}
          </button>

          <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-red-500">{c.eyebrow}</p>
          <h1 className="max-w-3xl text-4xl font-black leading-[1.08] tracking-tight sm:text-6xl">{c.title}</h1>
          <p className={`mt-6 max-w-xl text-base leading-8 sm:text-lg ${muted}`}>{c.description}</p>

          <div className={`mt-14 flex flex-col items-center gap-2 text-xs font-semibold ${muted}`} aria-hidden="true">
            <span>{c.scroll}</span>
            <span className="animate-bounce text-lg text-red-500">↓</span>
          </div>
        </section>
      </div>

      <nav
        aria-label={c.projectsNav}
        className={`sticky top-[73px] z-40 border-y backdrop-blur-xl ${
          darkMode ? "border-white/10 bg-[#09090b]/85" : "border-neutral-200 bg-white/85"
        }`}
      >
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-5 py-3 sm:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {projects.map((project, i) => {
            const title = { ...project.content.pt, ...(project.content[lang] || {}) }.title;
            const selected = i === activeIndex;
            return (
              <button
                key={project.id}
                type="button"
                aria-current={selected ? "true" : undefined}
                onClick={() => jumpTo(project.id)}
                className={`shrink-0 rounded-lg px-3.5 py-2 text-sm font-semibold transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-400 ${
                  selected ? "bg-red-600 text-white shadow-sm shadow-red-600/25" : `${muted} hover:text-red-500`
                }`}
              >
                {title}
              </button>
            );
          })}
        </div>
        <motion.div style={{ scaleX: barScale }} className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-red-500" />
      </nav>

      <div ref={listRef} className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
        {projects.map((project, i) => (
          <Chapter
            key={project.id}
            project={project}
            index={i}
            lang={lang}
            c={c}
            darkMode={darkMode}
            reduce={reduce}
            onActive={handleActive}
          />
        ))}
      </div>
    </div>
  );
}