import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ui, projectTabs, projects, awardsUi, awards } from "../data/showcaseData";

const tr = (v, lang) => (v && (v.pt || v.en) ? v[lang] || v.en || v.pt : v);
const initials = (s) => String(s).split(/[\s—-]+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("");

function Img({ src, alt, className, fallback }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return fallback ?? null;
  return <img src={encodeURI(src)} alt={alt} loading="lazy" onError={() => setFailed(true)} className={className} />;
}

function Heading({ eyebrow, title, description, mutedTone }) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-red-500">{eyebrow}</p>
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      <p className={`mx-auto mt-4 max-w-xl text-sm leading-7 sm:text-base ${mutedTone}`}>{description}</p>
    </div>
  );
}

function Tabs({ tabs, active, onChange, darkMode, mutedTone }) {
  return (
    <div className={`mx-auto mb-9 flex w-full max-w-2xl flex-col gap-2 rounded-2xl border p-2 sm:flex-row ${darkMode ? "border-white/10 bg-white/[0.025]" : "border-neutral-200 bg-white"}`}>
      {Object.entries(tabs).map(([key, label]) => (
        <button key={key} type="button" onClick={() => onChange(key)} className={`flex-1 rounded-xl px-4 py-3 text-sm font-semibold transition ${active === key ? "bg-red-600 text-white shadow-lg shadow-red-600/20" : `${mutedTone} hover:text-red-500`}`}>
          {label}
        </button>
      ))}
    </div>
  );
}

function ItemCard({ item, lang, darkMode, cardTone, mutedTone, labels, onOpen }) {
  const title = tr(item.title, lang);
  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => onOpen(item)}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), onOpen(item))}
      className={`group flex cursor-pointer flex-col overflow-hidden rounded-2xl border transition duration-300 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-red-400 ${cardTone}`}
    >
      <div className={`relative flex h-44 items-center justify-center overflow-hidden ${darkMode ? "bg-gradient-to-br from-red-950 via-neutral-900 to-neutral-950" : "bg-gradient-to-br from-red-100 via-neutral-100 to-white"}`}>
        <Img
          src={item.cover}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
          fallback={<span className="text-5xl font-black tracking-tighter text-red-500/60">{initials(title)}</span>}
        />
        <span className={`absolute bottom-3 left-3 z-10 rounded-full border px-3 py-1 text-[10px] font-bold ${darkMode ? "border-white/10 bg-black/60 text-neutral-200" : "border-neutral-200 bg-white/85 text-neutral-700"}`}>{tr(item.label, lang)}</span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-bold tracking-tight">{title}</h3>
        <p className={`mt-3 text-sm leading-6 ${mutedTone}`}>{tr(item.summary, lang)}</p>
        {item.tags && (
          <div className="mt-4 flex flex-wrap gap-2">
            {item.tags.map((tag) => <span key={tag} className={`rounded-lg px-2.5 py-1.5 text-[11px] font-semibold ${darkMode ? "bg-white/[0.06] text-neutral-300" : "bg-neutral-100 text-neutral-700"}`}>{tag}</span>)}
          </div>
        )}
        <div className="mt-auto flex items-center justify-between gap-3 pt-5 text-sm font-bold text-red-500">
          <span>{labels.details}</span>
          {item.figma && (
            <a href={item.figma} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="hover:text-red-400">{labels.figma} ↗</a>
          )}
        </div>
      </div>
    </article>
  );
}

function DetailModal({ item, lang, darkMode, mutedTone, labels, onClose }) {
  const [active, setActive] = useState(0);
  const [view, setView] = useState("images");
  const gallery = item.gallery?.length ? item.gallery : item.cover ? [item.cover] : [];
  const title = tr(item.title, lang);
  const details = [].concat(tr(item.details, lang) || tr(item.summary, lang) || []);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    const prev = document.body.style.overflow;
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const box = darkMode ? "border-white/10 bg-white/[0.04]" : "border-neutral-200 bg-neutral-50";

  return (
    <motion.div className="fixed inset-0 z-[70] flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />
      <motion.div
        role="dialog" aria-modal="true" aria-label={title}
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 24, scale: 0.97 }} animate={{ y: 0, scale: 1 }} exit={{ y: 24, scale: 0.97 }}
        className={`relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl border p-5 sm:p-8 ${darkMode ? "border-white/10 bg-[#0c0c0f] text-white" : "border-neutral-200 bg-white text-neutral-900"}`}
      >
        <button type="button" onClick={onClose} aria-label={labels.close} className={`absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-xl border text-xl transition hover:border-red-500 ${darkMode ? "border-white/10 bg-black/60" : "border-neutral-200 bg-white"}`}>×</button>

        <p className="pr-12 text-xs font-bold text-red-500">{tr(item.label, lang)}</p>
        <h3 className="mt-2 pr-12 text-2xl font-black tracking-tight sm:text-3xl">{title}</h3>

        {item.figma && (
          <div className="mt-5 flex gap-2">
            {["images", "proto"].map((v) => (
              <button key={v} type="button" onClick={() => setView(v)} className={`rounded-lg px-3 py-2 text-xs font-bold transition ${view === v ? "bg-red-600 text-white" : `${mutedTone} border ${darkMode ? "border-white/10" : "border-neutral-200"} hover:text-red-500`}`}>{labels[v === "images" ? "images" : "proto"]}</button>
            ))}
          </div>
        )}

        {view === "proto" && item.figma ? (
          <iframe title={title} className={`mt-5 h-[60vh] w-full rounded-2xl border ${box}`} allowFullScreen src={`https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(item.figma)}`} />
        ) : gallery.length > 0 ? (
          <div className="mt-5">
            <div className={`flex min-h-[220px] items-center justify-center overflow-hidden rounded-2xl border ${box}`}>
              <Img src={gallery[active]} alt={title} className="max-h-[55vh] w-full object-contain" fallback={<p className={`p-10 text-sm ${mutedTone}`}>{labels.emptyImage}</p>} />
            </div>
            {gallery.length > 1 && (
              <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                {gallery.map((src, i) => (
                  <button key={src} type="button" onClick={() => setActive(i)} aria-label={`${title} ${i + 1}`} className={`h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition ${active === i ? "border-red-500" : "border-transparent opacity-60 hover:opacity-100"}`}>
                    <Img src={src} alt="" className="h-full w-full object-cover object-top" fallback={<span className={`block h-full w-full ${box}`} />} />
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : null}

        <div className="mt-6 space-y-3">
          {details.map((p, i) => <p key={i} className={`text-sm leading-7 sm:text-base ${i === 0 ? "" : mutedTone}`}>{p}</p>)}
        </div>

        {item.tags && (
          <div className="mt-5 flex flex-wrap gap-2">
            {item.tags.map((tag) => <span key={tag} className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold ${darkMode ? "bg-white/[0.06] text-neutral-300" : "bg-neutral-100 text-neutral-700"}`}>{tag}</span>)}
          </div>
        )}

        {item.video && (
          <div className="mt-6">
            <p className="mb-2 text-xs font-bold text-red-500">{labels.video}</p>
            <video controls preload="metadata" src={encodeURI(item.video)} className="w-full rounded-2xl border border-white/10 bg-black" />
          </div>
        )}

        {(item.links?.length > 0 || item.figma) && (
          <div className="mt-6 flex flex-wrap gap-3">
            {item.links?.map((l) => (
              <a key={l.href} href={encodeURI(l.href)} target="_blank" rel="noreferrer" className={`rounded-xl border px-4 py-2.5 text-sm font-semibold transition hover:border-red-500 hover:text-red-500 ${darkMode ? "border-white/15" : "border-neutral-300"}`}>{tr(l.label, lang)} ↗</a>
            ))}
            {item.figma && <a href={item.figma} target="_blank" rel="noreferrer" className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-red-500">{labels.figma} ↗</a>}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

function CardGrid({ items, tabKey, lang, darkMode, cardTone, mutedTone, labels }) {
  const [open, setOpen] = useState(null);
  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div key={`${tabKey}-${lang}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className={`grid gap-5 sm:grid-cols-2 ${items.length === 3 ? "xl:grid-cols-3" : items.length > 3 ? "xl:grid-cols-3" : "mx-auto max-w-4xl"}`}>
          {items.map((item) => <ItemCard key={item.id} item={item} lang={lang} darkMode={darkMode} cardTone={cardTone} mutedTone={mutedTone} labels={labels} onOpen={setOpen} />)}
        </motion.div>
      </AnimatePresence>
      {/* O painel fica fora do motion.div para o "fixed" não herdar transform */}
      <AnimatePresence>
        {open && <DetailModal key={open.id} item={open} lang={lang} darkMode={darkMode} mutedTone={mutedTone} labels={labels} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </>
  );
}

export function ProjectsSection({ t, lang, darkMode, cardTone, mutedTone, onOpenPage }) {
  const [tab, setTab] = useState("featured");
  const labels = ui[lang] || ui.en;
  const tabs = projectTabs[lang] || projectTabs.en;
  const items = useMemo(() => projects.filter((p) => p.tab === tab), [tab]);
  return (
    <section id="projects" className="scroll-mt-24 py-20 sm:py-24">
      <Heading eyebrow={t.projects.eyebrow} title={t.projects.title} description={t.projects.description} mutedTone={mutedTone} />
      <Tabs tabs={tabs} active={tab} onChange={setTab} darkMode={darkMode} mutedTone={mutedTone} />
      <CardGrid items={items} tabKey={tab} lang={lang} darkMode={darkMode} cardTone={cardTone} mutedTone={mutedTone} labels={labels} />
      <div className="mt-10 text-center">
        <button type="button" onClick={() => onOpenPage("projects")} className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-600/20 transition hover:-translate-y-0.5 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400">
          {t.projects.pageButton} <span aria-hidden="true">↗</span>
        </button>
      </div>
    </section>
  );
}

export function AwardsSection({ lang, darkMode, cardTone, mutedTone }) {
  const [tab, setTab] = useState("awards");
  const labels = ui[lang] || ui.en;
  const text = awardsUi[lang] || awardsUi.en;
  const items = useMemo(() => awards.filter((a) => a.group === tab), [tab]);
  return (
    <section id="certifications" className="scroll-mt-24 py-20 sm:py-24">
      <Heading eyebrow={text.eyebrow} title={text.title} description={text.description} mutedTone={mutedTone} />
      <Tabs tabs={text.tabs} active={tab} onChange={setTab} darkMode={darkMode} mutedTone={mutedTone} />
      <CardGrid items={items} tabKey={tab} lang={lang} darkMode={darkMode} cardTone={cardTone} mutedTone={mutedTone} labels={labels} />
    </section>
  );
}
