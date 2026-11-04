import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { awards } from "../data/showcaseData";

const copy = {
  pt: {
    back: "Voltar ao portfólio",
    eyebrow: "Meu crachá",
    title: "Competências e diplomas",
    scroll: "Role para baixo",
    badgeLabel: "Credencial",
    badgeSkills: "Principais competências",
    skillsTitle: "Competências",
    awardsEyebrow: "Experiência e resultados",
    awardsTitle: "Reconhecimentos",
    awardsDescription: "Prêmios e destaques que já conquistei.",
    educationEyebrow: "Formação acadêmica",
    diplomasTitle: "Formação e diplomas",
    educationDescription:
      "Minha formação acadêmica, capacitações técnicas e estudos complementares.",
    inProgress: "Em andamento",
    completed: "Concluído",
    academicJourney: "Jornada acadêmica",
    viewDocument: "Visualizar documento",
  },
  en: {
    back: "Back to portfolio",
    eyebrow: "My badge",
    title: "Skills and education",
    scroll: "Scroll down",
    badgeLabel: "Credential",
    badgeSkills: "Key skills",
    skillsTitle: "Skills",
    awardsEyebrow: "Experience and results",
    awardsTitle: "Recognition",
    awardsDescription: "Awards and highlights I've earned so far.",
    educationEyebrow: "Academic background",
    diplomasTitle: "Education and certificates",
    educationDescription:
      "My academic background, technical training and additional learning.",
    inProgress: "In progress",
    completed: "Completed",
    academicJourney: "Academic journey",
    viewDocument: "View document",
  },
  es: {
    back: "Volver al portafolio",
    eyebrow: "Mi credencial",
    title: "Habilidades y formación",
    scroll: "Desplázate",
    badgeLabel: "Credencial",
    badgeSkills: "Habilidades principales",
    skillsTitle: "Habilidades",
    awardsEyebrow: "Experiencia y resultados",
    awardsTitle: "Reconocimientos",
    awardsDescription: "Premios y logros que he conseguido hasta ahora.",
    educationEyebrow: "Formación académica",
    diplomasTitle: "Formación y certificados",
    educationDescription:
      "Mi formación académica, capacitación técnica y estudios complementarios.",
    inProgress: "En curso",
    completed: "Completado",
    academicJourney: "Trayectoria académica",
    viewDocument: "Ver documento",
  },
  ko: {
    back: "포트폴리오로 돌아가기",
    eyebrow: "나의 배지",
    title: "기술 및 학력",
    scroll: "아래로 스크롤",
    badgeLabel: "인증",
    badgeSkills: "주요 기술",
    skillsTitle: "기술",
    awardsEyebrow: "경험과 성과",
    awardsTitle: "수상 및 인정",
    awardsDescription: "지금까지 받은 상과 성과입니다.",
    educationEyebrow: "학력",
    diplomasTitle: "교육 및 수료증",
    educationDescription: "학력, 기술 교육 및 추가 학습 과정입니다.",
    inProgress: "진행 중",
    completed: "수료",
    academicJourney: "학업 여정",
    viewDocument: "문서 보기",
  },
};

const BARS = [3, 1, 2, 1, 4, 1, 2, 3, 1, 2, 1, 3, 2, 1, 4, 1, 2, 1, 3, 1, 2, 4, 1, 2];
const STRAP_LENGTH = 150;

function AwardIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="9" r="5" />
      <path d="M8.6 13.4 7 21l5-3 5 3-1.6-7.6" />
    </svg>
  );
}

function GraduationIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-7 w-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m2.5 9 9.5-5 9.5 5-9.5 5-9.5-5Z" />
      <path d="M6.5 11.2v5.1c3.4 2.5 7.6 2.5 11 0v-5.1" />
      <path d="M21.5 9v6" />
    </svg>
  );
}

function localized(value, lang) {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value[lang] || value.pt || value.en || "";
}

function getStatus(cert, c) {
  if (cert.id === "mackenzie") return c.inProgress;
  if (cert.id === "etec") return c.completed;
  return "";
}

export default function SkillsBadgePage({ t, lang, darkMode, onBack }) {
  const c = copy[lang] || copy.pt;
  const reduceMotion = useReducedMotion();
  const gridRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ["start end", "start 0.3"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
  });
  const strapMotion = useTransform(progress, [0, 1], [0, STRAP_LENGTH]);
  const strapHeight = reduceMotion ? STRAP_LENGTH : strapMotion;

  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(velocity, {
    damping: 50,
    stiffness: 400,
  });
  const swing = useTransform(
    smoothVelocity,
    [-1500, 0, 1500],
    [-7, 0, 7],
    { clamp: true }
  );
  const pendulum = useSpring(swing, {
    stiffness: 90,
    damping: 6,
  });
  const rotate = reduceMotion ? 0 : pendulum;

  const mutedTone = darkMode ? "text-neutral-400" : "text-neutral-600";
  const cardTone = darkMode
    ? "border-white/10 bg-white/[0.035]"
    : "border-neutral-200 bg-white";
  const chipTone = darkMode
    ? "border-white/10 bg-white/[0.025] text-neutral-300"
    : "border-neutral-200 bg-neutral-50 text-neutral-700";

  const allSkills = Object.values(t.skills.items).flat();
  const { fundamentals = [], database = [], frontend = [], backend = [] } =
    t.skills.items;

  const badgeSkills = [
    fundamentals[2],
    frontend[0],
    backend[0],
    database[0],
    fundamentals[3],
    database[4],
  ].filter(Boolean);

  const awardCards = awards.filter((item) => item.group === "awards");
  const diplomaCards = awards.filter((item) => item.group === "education");

  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <section className="relative flex min-h-[78vh] flex-col items-center justify-center py-20 text-center">
        <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-red-600/10 blur-3xl" />

        <button
          type="button"
          onClick={onBack}
          className={`absolute left-0 top-6 rounded-xl border px-4 py-2 text-sm font-semibold transition hover:border-red-500 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 ${
            darkMode
              ? "border-white/10 bg-white/[0.03]"
              : "border-neutral-200 bg-white"
          }`}
        >
          <span aria-hidden="true">←</span> {c.back}
        </button>

        <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-red-500">
          {c.eyebrow}
        </p>
        <h1 className="max-w-3xl text-4xl font-black leading-[1.08] tracking-tight sm:text-6xl">
          {c.title}
        </h1>
        <p className={`mt-6 max-w-xl text-base leading-8 sm:text-lg ${mutedTone}`}>
          {c.description}
        </p>

        <div
          className={`mt-14 flex flex-col items-center gap-2 text-xs font-semibold ${mutedTone}`}
          aria-hidden="true"
        >
          <span>{c.scroll}</span>
          <span className="animate-bounce text-lg text-red-500">↓</span>
        </div>
      </section>

      <section
        ref={gridRef}
        className="grid gap-12 pb-24 md:grid-cols-[340px_1fr] md:gap-16 lg:grid-cols-[360px_1fr]"
      >
        <div className="flex justify-center">
          <div className="flex flex-col items-center self-start md:sticky md:top-28">
            <div
              className={`h-3 w-44 rounded-full ${
                darkMode ? "bg-neutral-700" : "bg-neutral-300"
              }`}
            />

            <motion.div
              style={{ rotate, transformOrigin: "top center" }}
              className="flex flex-col items-center"
            >
              <motion.div
                style={{
                  height: strapHeight,
                  backgroundImage:
                    "repeating-linear-gradient(135deg, rgba(255,255,255,0.14) 0 6px, transparent 6px 12px)",
                }}
                className="w-7 bg-red-600 shadow-lg shadow-red-600/20"
              />
              <div className="-mt-px h-4 w-10 rounded-b-lg bg-gradient-to-b from-neutral-300 to-neutral-500 shadow" />
              <div className="-mt-1 h-3 w-5 rounded-b-full border-2 border-neutral-400 border-t-0" />

              <div
                className={`relative -mt-1 w-[290px] overflow-hidden rounded-3xl border shadow-2xl sm:w-[310px] ${
                  darkMode
                    ? "border-white/10 bg-neutral-900"
                    : "border-neutral-200 bg-white"
                }`}
              >
                <div
                  className={`absolute left-1/2 top-3 z-20 h-2 w-14 -translate-x-1/2 rounded-full ${
                    darkMode ? "bg-black/70" : "bg-neutral-300"
                  }`}
                />

                <div className="relative flex items-end justify-between bg-red-600 px-5 pb-3 pt-9 text-white">
                  <span className="text-lg font-black tracking-tight">
                    ana<span className="text-red-200">clara</span>
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-100">
                    {c.badgeLabel}
                  </span>
                </div>

                <div
                  className={`relative h-56 overflow-hidden ${
                    darkMode
                      ? "bg-gradient-to-br from-red-500/20 via-neutral-900 to-neutral-950"
                      : "bg-gradient-to-br from-red-100 via-white to-neutral-100"
                  }`}
                >
                  <div className="absolute -right-6 top-6 h-28 w-28 rounded-full border border-red-500/25" />
                  <img
                    src="/perfil.png"
                    alt="Ana Clara"
                    className="relative z-10 h-full w-full object-contain object-bottom"
                  />
                </div>

                <div className="px-5 pb-5 pt-4">
                  <h2 className="text-2xl font-black tracking-tight">
                    Ana <span className="text-red-500">Clara</span>
                  </h2>
                  <p className={`mt-1 text-sm ${mutedTone}`}>{t.hero.role}</p>
                  <p
                    className={`mt-2 flex items-center gap-2 text-xs font-semibold ${
                      darkMode ? "text-neutral-300" : "text-neutral-700"
                    }`}
                  >
                    <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                    {t.hero.availability}
                  </p>

                  <div
                    className={`my-4 border-t border-dashed ${
                      darkMode ? "border-white/15" : "border-neutral-300"
                    }`}
                  />

                  <p className={`mb-2 text-[11px] font-semibold ${mutedTone}`}>
                    {c.badgeSkills}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {badgeSkills.map((skill) => (
                      <span
                        key={skill}
                        className={`rounded-md border px-2 py-1 text-[11px] font-medium ${chipTone}`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div
                    className="mt-5 flex items-end justify-between gap-4"
                    aria-hidden="true"
                  >
                    <div className="flex h-9 items-end gap-[2px]">
                      {BARS.map((w, i) => (
                        <span
                          key={i}
                          style={{ width: `${w * 1.5}px` }}
                          className={`h-full ${
                            darkMode ? "bg-neutral-300" : "bg-neutral-800"
                          }`}
                        />
                      ))}
                    </div>
                    <span className={`text-[10px] font-semibold ${mutedTone}`}>
                      {allSkills.length} skills
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="space-y-16 pt-4 md:pt-16">
          {/* Competências */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {c.skillsTitle}
            </h2>
            <p className={`mt-3 max-w-xl text-sm leading-7 sm:text-base ${mutedTone}`}>
              {t.skills.description}
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {Object.entries(t.skills.items).map(([key, items]) => (
                <article
                  key={key}
                  className={`rounded-2xl border p-5 sm:p-6 ${cardTone}`}
                >
                  <h3 className="mb-4 text-base font-bold">
                    {t.skills.categories[key]}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <span
                        key={skill}
                        className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition hover:border-red-500/50 ${chipTone}`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-500">
                {c.awardsEyebrow}
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                {c.awardsTitle}
              </h2>
              <p className={`mt-3 max-w-xl text-sm leading-7 ${mutedTone}`}>
                {c.awardsDescription}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {awardCards.map((award) => (
                <article
                  key={award.id}
                  className={`rounded-2xl border p-5 transition-all duration-300 hover:border-red-500/50 ${cardTone}`}
                >
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600/10 text-red-500">
                      <AwardIcon />
                    </span>
                    <span className={`text-xs font-medium ${mutedTone}`}>
                      {localized(award.label, lang)}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold leading-snug">
                    {localized(award.title, lang)}
                  </h3>
                  <p className={`mt-3 text-sm leading-7 ${mutedTone}`}>
                    {localized(award.summary, lang)}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-500">
                {c.educationEyebrow}
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                {c.diplomasTitle}
              </h2>
              <p className={`mt-3 max-w-xl text-sm leading-7 ${mutedTone}`}>
                {c.educationDescription}
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {diplomaCards.map((cert) => {
                const isMackenzie = cert.id === "mackenzie";
                const status = getStatus(cert, c);

                return (
                  <article
                    key={cert.id}
                    className={`group overflow-hidden rounded-2xl border transition-all duration-300 hover:border-red-500/50 ${cardTone}`}
                  >
                    {isMackenzie ? (
                      <div
                        className={`relative flex h-44 flex-col items-center justify-center overflow-hidden ${
                          darkMode ? "bg-[#21191b]" : "bg-red-50"
                        }`}
                      >
                        <div className="absolute -right-8 -top-12 h-40 w-40 rounded-full border border-red-500/15" />
                        <div className="absolute -right-2 -top-6 h-28 w-28 rounded-full border border-red-500/20" />
                        <div className="absolute -bottom-16 -left-8 h-36 w-36 rounded-full border border-red-500/10" />

                        <span className="relative text-[10px] font-bold uppercase tracking-[0.3em] text-red-500">
                          MACKENZIE
                        </span>

                        <div className="relative my-3 flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/25 bg-red-500/10 text-red-500 shadow-sm">
                          <GraduationIcon />
                        </div>

                        <span
                          className={`relative text-xs font-medium ${
                            darkMode ? "text-neutral-300" : "text-neutral-600"
                          }`}
                        >
                          {c.academicJourney}
                        </span>

                        <span className="relative mt-2 rounded-full border border-red-500/30 px-3 py-1 text-[10px] font-semibold text-red-500">
                          {c.inProgress}
                        </span>
                      </div>
                    ) : cert.cover && cert.cover !== "*" ? (
                      <a
                        href={cert.cover}
                        target="_blank"
                        rel="noreferrer"
                        className={`flex h-44 items-center justify-center overflow-hidden p-3 ${
                          darkMode ? "bg-neutral-800/70" : "bg-neutral-100"
                        }`}
                        aria-label={localized(cert.title, lang)}
                      >
                        <img
                          src={cert.cover}
                          alt={`Documento: ${localized(cert.title, lang)}`}
                          loading="lazy"
                          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      </a>
                    ) : (
                      <div
                        className={`flex h-44 items-center justify-center ${
                          darkMode ? "bg-neutral-800/70" : "bg-neutral-100"
                        }`}
                      >
                        <span className={`text-sm ${mutedTone}`}>
                          {localized(cert.title, lang)}
                        </span>
                      </div>
                    )}

                    <div className="p-5">
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <span className="text-xs font-semibold uppercase tracking-wider text-red-500">
                          {localized(cert.label, lang)}
                        </span>
                        {status && (
                          <span className={`text-xs ${mutedTone}`}>
                            {status}
                          </span>
                        )}
                      </div>

                      <h3 className="text-base font-bold leading-snug">
                        {localized(cert.title, lang)}
                      </h3>
                      <p className={`mt-2 text-sm leading-6 ${mutedTone}`}>
                        {localized(cert.summary, lang)}
                      </p>

                      {!isMackenzie && cert.cover && cert.cover !== "*" && (
                        <a
                          href={cert.cover}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-red-500 transition-colors hover:text-red-400"
                        >
                          {c.viewDocument}
                          <span aria-hidden="true">↗</span>
                        </a>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
