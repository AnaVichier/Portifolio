import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ProjectsSection, AwardsSection } from "./components/ShowcaseSections";
import IntroScreen from "./components/IntroScreen";
import SkillsBadgePage from "./components/SkillsBadgePage";
import ProjectsPage from "./components/ProjectsPage";

/* ------------------------------------------------------------------ */
/* Textos                                                              */
/* ------------------------------------------------------------------ */

const translations = {
  pt: {
    language: "Idioma",
    nav: { home: "Início", about: "Sobre", projects: "Projetos", skills: "Competências", certifications: "Formação", contact: "Contato" },
    a11y: {
      home: "Ana Clara — início",
      mainNav: "Navegação principal",
      mobileNav: "Navegação móvel",
      menu: "Abrir menu",
      lightTheme: "Ativar tema claro",
      darkTheme: "Ativar tema escuro",
      portrait: "Retrato de Ana Clara",
    },
    hero: {
      greeting: "Olá, eu sou a",
      name: "Ana Clara",
      role: "Desenvolvimento web, dados e automação",
      description: "Sou técnica em Desenvolvimento de Sistemas, estudo Processos Gerenciais e trabalho como jovem aprendiz no Grupo Petrópolis. Quero começar minha carreira em desenvolvimento, criando sites, sistemas e análises que facilitem o trabalho de quem usa.",
      caption: "Desenvolvimento de Sistemas · Processos Gerenciais",
      cvButton: "Baixar currículo",
      githubButton: "GitHub",
      availability: "Disponível para vagas em desenvolvimento",
      tags: ["Dados e BI", "Desenvolvimento web", "Automação de processos"],
    },
    about: {
      title: "Minha trajetória",
      description: "Da formação técnica ao primeiro emprego em uma grande empresa.",
      highlights: [
        { title: "2º lugar", text: "INOVA GP · Portal Jovem Aprendiz" },
        { title: "Melhor TCC da turma", text: "Etec · Deluxe Cortinas & Persianas" },
        { title: "Técnica em Desenvolvimento de Sistemas", text: "Etec · concluído em 2025" },
        { title: "Jovem Aprendiz", text: "Grupo Petrópolis · planejamento de autosserviço" },
      ],
      timeline: [
        { period: "Atual", title: "Jovem Aprendiz — Planejamento de autosserviço", place: "Grupo Petrópolis", text: "Atuo na área comercial e participei do Portal Jovem Aprendiz, projeto com Agente de IA no SharePoint que ficou em 2º lugar no INOVA GP." },
        { period: "Em andamento", title: "Tecnólogo em Processos Gerenciais", place: "Mackenzie · EAD", text: "Curso que une gestão de processos e tecnologia. Meu interesse é ciência de dados." },
        { period: "2025", title: "Técnica em Desenvolvimento de Sistemas", place: "Etec", text: "Ensino médio técnico, com TCC eleito o melhor da turma e vários projetos em grupo. Fui organizadora da EPA por 3 anos." },
      ],
      languagesTitle: "Idiomas",
      languages: [
        { name: "Português", level: "Nativo" },
        { name: "Inglês", level: "Avançado" },
        { name: "Espanhol", level: "Intermediário" },
      ],
    },
    projects: {
      eyebrow: "O que venho construindo",
      title: "Projetos em destaque",
      description: "Projetos de dados, web e automação.",
      tabs: { powerbi: "Dados & BI", websites: "Web & sistemas", stats: "Automação & análise" },
      preview: "Prévia do projeto",
      details: "Projeto demonstrativo",
      pageButton: "Ver projetos em destaque",
      items: {
        powerbi: [
          { id: 1, title: "Dashboard comercial", description: "Indicadores e visualizações para acompanhar resultados.", tags: ["Power BI", "Power Query", "DAX"] },
          { id: 2, title: "Indicadores de gestão", description: "Métricas organizadas para apoiar decisões.", tags: ["Power BI", "T-SQL", "ETL"] },
          { id: 3, title: "Análise de performance", description: "Tendências e comparação de desempenho ao longo do tempo.", tags: ["Power BI", "Excel", "Dados"] },
        ],
        websites: [
          { id: 4, title: "Portal corporativo", description: "Interface para reunir conteúdos e recursos internos.", tags: ["React", "Node.js", "Tailwind"] },
          { id: 5, title: "Sistema de gestão", description: "Sistema para organizar cadastros, processos e operações.", tags: ["PHP", "SQL", "Sistemas"] },
          { id: 6, title: "Aplicação integrada", description: "Aplicação com foco em usabilidade e integração de serviços.", tags: ["React Native", "API", "Azure"] },
        ],
        stats: [
          { id: 7, title: "Modelo de dados", description: "Estudo de variáveis para encontrar padrões e apoiar análises.", tags: ["Estatística", "SQL", "BI"] },
          { id: 8, title: "Automação de relatórios", description: "Fluxo para reduzir tarefas repetitivas e padronizar relatórios.", tags: ["Automação", "T-SQL", "ETL"] },
          { id: 9, title: "Auditoria de acessos", description: "Organização dos acessos com foco em rastreabilidade.", tags: ["LDAP", "Segurança", "Dados"] },
        ],
      },
    },
    skills: {
      title: "Competências",
      description: "O que estudo e uso no dia a dia.",
      badgeButton: "Ver meu crachá",
      categories: {
        fundamentals: "Fundamentos",
        database: "Dados e bancos",
        frontend: "Front-end e design",
        backend: "Back-end e integração",
      },
      items: {
        fundamentals: ["HTML5", "CSS3", "JavaScript", "Git & GitHub", "Azure DevOps"],
        database: ["SQL", "SQL Server", "MySQL", "Modelagem", "Power Query"],
        frontend: ["React", "React Native", "Tailwind CSS", "UI/UX Design", "Design responsivo"],
        backend: ["Node.js", "PHP", "APIs REST", "LDAP", "Integrações"],
      },
    },
    certifications: {
      eyebrow: "Aprendizado contínuo",
      title: "Formação e cursos",
      description: "Formação acadêmica e cursos.",
      list: [
        "Formação React & Node.js — DIO",
        "Estudos em banco de dados e T-SQL",
        "Administração de redes e LDAP — IFMG",
        "Processos Gerenciais — Mackenzie",
        "Estudos em Inteligência Artificial — Microsoft",
      ],
      note: "Mais detalhes no currículo.",
    },
    footer: {
      tagline: "Desenvolvimento web, dados e automação.",
      navigation: "Navegação",
      connect: "Contato",
      cv: "Baixar currículo",
      rights: "Todos os direitos reservados.",
      made: "Feito por Ana Clara",
    },
  },

  en: {
    language: "Language",
    nav: { home: "Home", about: "About", projects: "Projects", skills: "Skills", certifications: "Education", contact: "Contact" },
    a11y: {
      home: "Ana Clara — home",
      mainNav: "Main navigation",
      mobileNav: "Mobile navigation",
      menu: "Open menu",
      lightTheme: "Switch to light theme",
      darkTheme: "Switch to dark theme",
      portrait: "Portrait of Ana Clara",
    },
    hero: {
      greeting: "Hi, I'm",
      name: "Ana Clara",
      role: "Web development, data and automation",
      description: "I'm a Systems Development technician studying Management Processes, and I work as a young apprentice at Grupo Petrópolis. I want to start my career in development, building sites, systems and analyses that make people's work easier.",
      caption: "Systems Development · Management Processes",
      cvButton: "Download résumé",
      githubButton: "GitHub",
      availability: "Available for development roles",
      tags: ["Data and BI", "Web development", "Process automation"],
    },
    about: {
      title: "My journey",
      description: "From technical school to a first job at a large company.",
      highlights: [
        { title: "2nd place", text: "INOVA GP · Young Apprentice Portal" },
        { title: "Best class capstone", text: "Etec · Deluxe Cortinas & Persianas" },
        { title: "Systems Development technician", text: "Etec · completed in 2025" },
        { title: "Young Apprentice", text: "Grupo Petrópolis · self-service planning" },
      ],
      timeline: [
        { period: "Current", title: "Young Apprentice — Self-service planning", place: "Grupo Petrópolis", text: "I work in the commercial area and took part in the Young Apprentice Portal, a SharePoint project with an AI agent that won 2nd place at INOVA GP." },
        { period: "In progress", title: "Associate degree in Management Processes", place: "Mackenzie · Online", text: "A program that combines process management and technology. My interest is data science." },
        { period: "2025", title: "Technician in Systems Development", place: "Etec", text: "Technical high school, with a capstone voted best of the class and several group projects. I was an EPA organizer for 3 years." },
      ],
      languagesTitle: "Languages",
      languages: [
        { name: "Portuguese", level: "Native" },
        { name: "English", level: "Advanced" },
        { name: "Spanish", level: "Intermediate" },
      ],
    },
    projects: {
      eyebrow: "What I've been building",
      title: "Featured projects",
      description: "Data, web and automation projects.",
      tabs: { powerbi: "Data & BI", websites: "Web & systems", stats: "Automation & analytics" },
      preview: "Project preview",
      details: "Concept project",
      pageButton: "See featured projects",
      items: {
        powerbi: [
          { id: 1, title: "Sales dashboard", description: "Key metrics and visuals to track results.", tags: ["Power BI", "Power Query", "DAX"] },
          { id: 2, title: "Management indicators", description: "Metrics organized to support decisions.", tags: ["Power BI", "T-SQL", "ETL"] },
          { id: 3, title: "Performance analysis", description: "Trends and performance comparison over time.", tags: ["Power BI", "Excel", "Data"] },
        ],
        websites: [
          { id: 4, title: "Corporate portal", description: "An interface that gathers internal content and resources.", tags: ["React", "Node.js", "Tailwind"] },
          { id: 5, title: "Management system", description: "A system to organize records, processes and operations.", tags: ["PHP", "SQL", "Systems"] },
          { id: 6, title: "Integrated application", description: "An application focused on usability and service integration.", tags: ["React Native", "API", "Azure"] },
        ],
        stats: [
          { id: 7, title: "Data model", description: "A study of variables to find patterns and support analysis.", tags: ["Statistics", "SQL", "BI"] },
          { id: 8, title: "Report automation", description: "A workflow to cut repetitive tasks and standardize reports.", tags: ["Automation", "T-SQL", "ETL"] },
          { id: 9, title: "Access audit", description: "Access information organized for traceability.", tags: ["LDAP", "Security", "Data"] },
        ],
      },
    },
    skills: {
      title: "Skills",
      description: "What I study and use day to day.",
      badgeButton: "See my badge",
      categories: { fundamentals: "Fundamentals", database: "Data and databases", frontend: "Front-end and design", backend: "Back-end and integration" },
      items: {
        fundamentals: ["HTML5", "CSS3", "JavaScript", "Git & GitHub", "Azure DevOps"],
        database: ["SQL", "SQL Server", "MySQL", "Data modeling", "Power Query"],
        frontend: ["React", "React Native", "Tailwind CSS", "UI/UX Design", "Responsive design"],
        backend: ["Node.js", "PHP", "REST APIs", "LDAP", "Integrations"],
      },
    },
    certifications: {
      eyebrow: "Always learning",
      title: "Education and courses",
      description: "Academic studies and courses.",
      list: [
        "React & Node.js training — DIO",
        "Database and T-SQL studies",
        "Network administration & LDAP — IFMG",
        "Management Processes — Mackenzie",
        "Artificial Intelligence studies — Microsoft",
      ],
      note: "More details in my résumé.",
    },
    footer: {
      tagline: "Web development, data and automation.",
      navigation: "Navigation",
      connect: "Contact",
      cv: "Download résumé",
      rights: "All rights reserved.",
      made: "Made by Ana Clara",
    },
  },

  es: {
    language: "Idioma",
    nav: { home: "Inicio", about: "Sobre mí", projects: "Proyectos", skills: "Habilidades", certifications: "Formación", contact: "Contacto" },
    a11y: {
      home: "Ana Clara — inicio",
      mainNav: "Navegación principal",
      mobileNav: "Navegación móvil",
      menu: "Abrir menú",
      lightTheme: "Activar tema claro",
      darkTheme: "Activar tema oscuro",
      portrait: "Retrato de Ana Clara",
    },
    hero: {
      greeting: "Hola, soy",
      name: "Ana Clara",
      role: "Desarrollo web, datos y automatización",
      description: "Soy técnica en Desarrollo de Sistemas, estudio Procesos de Gestión y trabajo como joven aprendiz en Grupo Petrópolis. Quiero empezar mi carrera en desarrollo, creando sitios, sistemas y análisis que faciliten el trabajo de quienes los usan.",
      caption: "Desarrollo de Sistemas · Procesos de Gestión",
      cvButton: "Descargar CV",
      githubButton: "GitHub",
      availability: "Disponible para puestos de desarrollo",
      tags: ["Datos y BI", "Desarrollo web", "Automatización de procesos"],
    },
    about: {
      title: "Mi trayectoria",
      description: "De la formación técnica al primer empleo en una gran empresa.",
      highlights: [
        { title: "2.º lugar", text: "INOVA GP · Portal Joven Aprendiz" },
        { title: "Mejor TCC del grupo", text: "Etec · Deluxe Cortinas & Persianas" },
        { title: "Técnica en Desarrollo de Sistemas", text: "Etec · finalizado en 2025" },
        { title: "Joven Aprendiz", text: "Grupo Petrópolis · planificación de autoservicio" },
      ],
      timeline: [
        { period: "Actual", title: "Joven Aprendiz — Planificación de autoservicio", place: "Grupo Petrópolis", text: "Trabajo en el área comercial y participé en el Portal Joven Aprendiz, un proyecto en SharePoint con un agente de IA que obtuvo el 2.º lugar en INOVA GP." },
        { period: "En curso", title: "Tecnóloga en Procesos de Gestión", place: "Mackenzie · En línea", text: "Carrera que une gestión de procesos y tecnología. Mi interés es la ciencia de datos." },
        { period: "2025", title: "Técnica en Desarrollo de Sistemas", place: "Etec", text: "Bachillerato técnico, con un TCC elegido el mejor del grupo y varios proyectos en equipo. Fui organizadora de la EPA durante 3 años." },
      ],
      languagesTitle: "Idiomas",
      languages: [
        { name: "Portugués", level: "Nativo" },
        { name: "Inglés", level: "Avanzado" },
        { name: "Español", level: "Intermedio" },
      ],
    },
    projects: {
      eyebrow: "Lo que estoy creando",
      title: "Proyectos destacados",
      description: "Proyectos de datos, web y automatización.",
      tabs: { powerbi: "Datos y BI", websites: "Web y sistemas", stats: "Automatización y análisis" },
      preview: "Vista previa del proyecto",
      details: "Proyecto conceptual",
      pageButton: "Ver proyectos destacados",
      items: {
        powerbi: [
          { id: 1, title: "Panel comercial", description: "Indicadores y visualizaciones para seguir los resultados.", tags: ["Power BI", "Power Query", "DAX"] },
          { id: 2, title: "Indicadores de gestión", description: "Métricas organizadas para apoyar decisiones.", tags: ["Power BI", "T-SQL", "ETL"] },
          { id: 3, title: "Análisis de rendimiento", description: "Tendencias y comparación del rendimiento a lo largo del tiempo.", tags: ["Power BI", "Excel", "Datos"] },
        ],
        websites: [
          { id: 4, title: "Portal corporativo", description: "Interfaz que reúne contenidos y recursos internos.", tags: ["React", "Node.js", "Tailwind"] },
          { id: 5, title: "Sistema de gestión", description: "Sistema para organizar registros, procesos y operaciones.", tags: ["PHP", "SQL", "Sistemas"] },
          { id: 6, title: "Aplicación integrada", description: "Aplicación centrada en la usabilidad y la integración de servicios.", tags: ["React Native", "API", "Azure"] },
        ],
        stats: [
          { id: 7, title: "Modelo de datos", description: "Estudio de variables para encontrar patrones y apoyar el análisis.", tags: ["Estadística", "SQL", "BI"] },
          { id: 8, title: "Automatización de informes", description: "Flujo para reducir tareas repetitivas y estandarizar informes.", tags: ["Automatización", "T-SQL", "ETL"] },
          { id: 9, title: "Auditoría de accesos", description: "Información de accesos organizada para la trazabilidad.", tags: ["LDAP", "Seguridad", "Datos"] },
        ],
      },
    },
    skills: {
      title: "Habilidades",
      description: "Lo que estudio y uso a diario.",
      badgeButton: "Ver mi credencial",
      categories: { fundamentals: "Fundamentos", database: "Datos y bases de datos", frontend: "Front-end y diseño", backend: "Back-end e integración" },
      items: {
        fundamentals: ["HTML5", "CSS3", "JavaScript", "Git & GitHub", "Azure DevOps"],
        database: ["SQL", "SQL Server", "MySQL", "Modelado", "Power Query"],
        frontend: ["React", "React Native", "Tailwind CSS", "Diseño UI/UX", "Diseño adaptable"],
        backend: ["Node.js", "PHP", "APIs REST", "LDAP", "Integraciones"],
      },
    },
    certifications: {
      eyebrow: "Aprendizaje continuo",
      title: "Formación y cursos",
      description: "Formación académica y cursos.",
      list: [
        "Formación en React y Node.js — DIO",
        "Estudios de bases de datos y T-SQL",
        "Administración de redes y LDAP — IFMG",
        "Procesos de Gestión — Mackenzie",
        "Estudios de Inteligencia Artificial — Microsoft",
      ],
      note: "Más detalles en mi CV.",
    },
    footer: {
      tagline: "Desarrollo web, datos y automatización.",
      navigation: "Navegación",
      connect: "Contacto",
      cv: "Descargar CV",
      rights: "Todos los derechos reservados.",
      made: "Hecho por Ana Clara",
    },
  },

  ko: {
    language: "언어",
    nav: { home: "홈", about: "소개", projects: "프로젝트", skills: "기술", certifications: "교육", contact: "연락처" },
    a11y: {
      home: "Ana Clara — 홈",
      mainNav: "주 메뉴",
      mobileNav: "모바일 메뉴",
      menu: "메뉴 열기",
      lightTheme: "라이트 테마로 전환",
      darkTheme: "다크 테마로 전환",
      portrait: "아나 클라라 프로필 사진",
    },
    hero: {
      greeting: "안녕하세요, 저는",
      name: "아나 클라라입니다",
      role: "웹 개발, 데이터, 자동화",
      description: "시스템 개발 기술자로, 경영 프로세스를 공부하며 Grupo Petrópolis에서 청년 견습생으로 일하고 있습니다. 사용하는 사람의 일을 편하게 만드는 웹사이트, 시스템, 분석을 만들며 개발 커리어를 시작하고 싶습니다.",
      caption: "시스템 개발 · 경영 프로세스",
      cvButton: "이력서 다운로드",
      githubButton: "GitHub",
      availability: "개발 직무 지원 가능",
      tags: ["데이터 & BI", "웹 개발", "프로세스 자동화"],
    },
    about: {
      title: "나의 여정",
      description: "기술 교육부터 대기업 첫 직장까지의 과정입니다.",
      highlights: [
        { title: "2위", text: "INOVA GP · 청년 견습생 포털" },
        { title: "반 최우수 졸업 프로젝트", text: "Etec · Deluxe Cortinas & Persianas" },
        { title: "시스템 개발 기술자", text: "Etec · 2025년 졸업" },
        { title: "청년 견습생", text: "Grupo Petrópolis · 셀프서비스 기획" },
      ],
      timeline: [
        { period: "현재", title: "청년 견습생 — 셀프서비스 기획", place: "Grupo Petrópolis", text: "영업 부서에서 일하며, INOVA GP 2위를 차지한 AI 에이전트 기반 SharePoint 프로젝트 '청년 견습생 포털'에 참여했습니다." },
        { period: "재학 중", title: "경영 프로세스 전문학사", place: "Mackenzie · 온라인", text: "프로세스 관리와 기술을 함께 배우는 과정입니다. 데이터 사이언스에 관심이 있습니다." },
        { period: "2025", title: "시스템 개발 기술자", place: "Etec", text: "기술 계열 고등학교에서 반 최우수로 선정된 졸업 프로젝트와 여러 팀 프로젝트를 수행했습니다. 3년간 EPA 운영진으로 활동했습니다." },
      ],
      languagesTitle: "언어",
      languages: [
        { name: "포르투갈어", level: "모국어" },
        { name: "영어", level: "상급" },
        { name: "스페인어", level: "중급" },
      ],
    },
    projects: {
      eyebrow: "만들고 있는 것들",
      title: "주요 프로젝트",
      description: "데이터, 웹, 자동화 프로젝트입니다.",
      tabs: { powerbi: "데이터 & BI", websites: "웹 & 시스템", stats: "자동화 & 분석" },
      preview: "프로젝트 미리보기",
      details: "컨셉 프로젝트",
      pageButton: "주요 프로젝트 보기",
      items: {
        powerbi: [
          { id: 1, title: "영업 대시보드", description: "성과를 추적하기 위한 지표와 시각화.", tags: ["Power BI", "Power Query", "DAX"] },
          { id: 2, title: "관리 지표", description: "의사결정을 돕기 위해 정리한 지표.", tags: ["Power BI", "T-SQL", "ETL"] },
          { id: 3, title: "성과 분석", description: "시간에 따른 추세와 성과 비교.", tags: ["Power BI", "Excel", "데이터"] },
        ],
        websites: [
          { id: 4, title: "기업 포털", description: "내부 콘텐츠와 리소스를 한곳에 모은 인터페이스.", tags: ["React", "Node.js", "Tailwind"] },
          { id: 5, title: "관리 시스템", description: "데이터, 프로세스, 운영을 정리하는 시스템.", tags: ["PHP", "SQL", "시스템"] },
          { id: 6, title: "통합 애플리케이션", description: "사용성과 서비스 통합에 중점을 둔 앱.", tags: ["React Native", "API", "Azure"] },
        ],
        stats: [
          { id: 7, title: "데이터 모델", description: "패턴을 찾고 분석을 돕기 위한 변수 연구.", tags: ["통계", "SQL", "BI"] },
          { id: 8, title: "보고서 자동화", description: "반복 작업을 줄이고 보고서를 표준화하는 워크플로.", tags: ["자동화", "T-SQL", "ETL"] },
          { id: 9, title: "접근 권한 감사", description: "추적 가능성을 고려해 정리한 접근 정보.", tags: ["LDAP", "보안", "데이터"] },
        ],
      },
    },
    skills: {
      title: "기술",
      description: "공부하고 일상적으로 사용하는 기술입니다.",
      badgeButton: "내 배지 보기",
      categories: { fundamentals: "기초", database: "데이터 & 데이터베이스", frontend: "프런트엔드 & 디자인", backend: "백엔드 & 통합" },
      items: {
        fundamentals: ["HTML5", "CSS3", "JavaScript", "Git & GitHub", "Azure DevOps"],
        database: ["SQL", "SQL Server", "MySQL", "데이터 모델링", "Power Query"],
        frontend: ["React", "React Native", "Tailwind CSS", "UI/UX 디자인", "반응형 디자인"],
        backend: ["Node.js", "PHP", "REST API", "LDAP", "통합"],
      },
    },
    certifications: {
      eyebrow: "지속적인 학습",
      title: "교육 및 과정",
      description: "학업 및 교육 과정입니다.",
      list: [
        "React & Node.js 교육 — DIO",
        "데이터베이스 및 T-SQL 학습",
        "네트워크 관리 및 LDAP — IFMG",
        "경영 프로세스 — Mackenzie",
        "인공지능 학습 — Microsoft",
      ],
      note: "자세한 내용은 이력서를 확인해 주세요.",
    },
    footer: {
      tagline: "웹 개발, 데이터, 자동화.",
      navigation: "탐색",
      connect: "연락처",
      cv: "이력서 다운로드",
      rights: "모든 권리 보유.",
      made: "Ana Clara 제작",
    },
  },
};

/* ------------------------------------------------------------------ */
/* Constantes                                                          */
/* ------------------------------------------------------------------ */

const emailAddress = "anaclaravich@gmail.com";
const linkedinUrl = "https://www.linkedin.com/in/anaclaravichierdesouza";
const githubUrl = "https://github.com/AnaVichier";
const cvUrl = "/cv-ana-clara.pdf";

const sectionIds = ["home", "about", "projects", "skills", "certifications", "contact"];

const languageOptions = [
  { code: "pt", label: "🇧🇷 PT" },
  { code: "en", label: "🇺🇸 EN" },
  { code: "es", label: "🇪🇸 ES" },
  { code: "ko", label: "🇰🇷 KO" },
];

const primaryButton =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400";

function getTone(darkMode) {
  return {
    page: darkMode
      ? "bg-[#09090b] text-white selection:bg-red-500/30"
      : "bg-[#f7f7f8] text-neutral-900 selection:bg-red-200",
    card: darkMode
      ? "border-white/10 bg-white/[0.035]"
      : "border-neutral-200 bg-white",
    muted: darkMode ? "text-neutral-400" : "text-neutral-600",
    line: darkMode ? "border-white/10" : "border-neutral-200",
    surface: darkMode ? "border-white/10 bg-neutral-900" : "border-neutral-200 bg-white",
    chip: darkMode
      ? "border-white/10 bg-white/[0.03] text-neutral-300"
      : "border-neutral-200 bg-neutral-50 text-neutral-700",
  };
}

/* ------------------------------------------------------------------ */
/* Componentes pequenos                                                */
/* ------------------------------------------------------------------ */

function Logo({ label, onClick }) {
  return (
    <a href="#home" onClick={onClick} aria-label={label} className="flex shrink-0 items-center gap-2 text-xl font-black tracking-tight">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-600 text-white">A</span>
      <span>ana<span className="text-red-500">clara</span></span>
    </a>
  );
}

function GithubIcon() {
  return (
    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function SectionHeading({ title, description, mutedTone }) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center">
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {description && (
        <p className={`mx-auto mt-4 max-w-xl text-base leading-7 ${mutedTone}`}>{description}</p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* App                                                                 */
/* ------------------------------------------------------------------ */

export default function App() {
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [lang, setLang] = useState("pt");
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [page, setPage] = useState("home"); // "home" | "badge" | "projects"

  const t = translations[lang] || translations.pt;
  const tone = getTone(darkMode);
  const iconButton = `flex h-10 w-10 items-center justify-center rounded-xl border transition-colors hover:border-red-500 ${darkMode ? "border-white/10 bg-white/5" : "border-neutral-200 bg-white"}`;

  const openPage = (name) => {
    setPage(name);
    window.scrollTo({ top: 0 });
  };

  const goTo = (id) => (event) => {
    if (page !== "home") {
      event.preventDefault();
      setPage("home");
      setTimeout(() => document.getElementById(id)?.scrollIntoView(), 60);
    }
    setMenuOpen(false);
  };

  return (
    <main className={`min-h-screen overflow-x-clip transition-colors duration-300 ${tone.page}`} style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}>
      {!showPortfolio ? (
        <IntroScreen onFinished={() => setShowPortfolio(true)} />
      ) : (
        <>
          <header className={`sticky top-0 z-50 border-b backdrop-blur-xl ${darkMode ? "border-white/10 bg-[#09090b]/85" : "border-neutral-200 bg-white/85"}`}>
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
              <Logo label={t.a11y.home} onClick={goTo("home")} />

              <nav className="hidden items-center gap-7 lg:flex" aria-label={t.a11y.mainNav}>
                {sectionIds.map((id) => (
                  <a key={id} href={`#${id}`} onClick={goTo(id)} className={`text-sm transition-colors hover:text-red-500 ${tone.muted}`}>
                    {t.nav[id]}
                  </a>
                ))}
              </nav>

              <div className="flex items-center gap-2 sm:gap-3">
                <label className="sr-only" htmlFor="language-select">{t.language}</label>
                <select
                  id="language-select"
                  value={lang}
                  onChange={(event) => setLang(event.target.value)}
                  className={`rounded-xl border px-2.5 py-2 text-xs font-semibold outline-none transition-colors focus:border-red-500 sm:text-sm ${darkMode ? "border-white/10 bg-neutral-900 text-white" : "border-neutral-200 bg-white text-neutral-900"}`}
                >
                  {languageOptions.map((option) => (
                    <option key={option.code} value={option.code}>{option.label}</option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => setDarkMode((value) => !value)}
                  aria-label={darkMode ? t.a11y.lightTheme : t.a11y.darkTheme}
                  className={iconButton}
                >
                  {darkMode ? "☀" : "☾"}
                </button>
                <button
                  type="button"
                  onClick={() => setMenuOpen((value) => !value)}
                  aria-expanded={menuOpen}
                  aria-label={t.a11y.menu}
                  className={`${iconButton} lg:hidden`}
                >
                  <span className="text-xl">{menuOpen ? "×" : "☰"}</span>
                </button>
              </div>
            </div>

            <AnimatePresence>
              {menuOpen && (
                <motion.nav
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className={`overflow-hidden border-t px-5 py-3 lg:hidden ${darkMode ? "border-white/10 bg-[#0c0c0f]" : "border-neutral-200 bg-white"}`}
                  aria-label={t.a11y.mobileNav}
                >
                  <div className="mx-auto flex max-w-7xl flex-col">
                    {sectionIds.map((id) => (
                      <a key={id} href={`#${id}`} onClick={goTo(id)} className="rounded-lg px-3 py-3 text-sm font-medium hover:bg-red-500/10 hover:text-red-500">
                        {t.nav[id]}
                      </a>
                    ))}
                  </div>
                </motion.nav>
              )}
            </AnimatePresence>
          </header>

          {page === "badge" ? (
            <SkillsBadgePage t={t} lang={lang} darkMode={darkMode} onBack={() => setPage("home")} />
          ) : page === "projects" ? (
            <ProjectsPage t={t} lang={lang} darkMode={darkMode} onBack={() => setPage("home")} />
          ) : (
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
              {/* Início */}
              <section id="home" className="grid min-h-[650px] scroll-mt-24 items-center gap-12 py-20 md:grid-cols-[1.15fr_0.85fr] md:py-28">
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                  <div className={`mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium ${tone.chip}`}>
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    {t.hero.availability}
                  </div>
                  <h1 className="max-w-3xl text-4xl font-black leading-[1.1] tracking-tight sm:text-6xl">
                    <span className="block">{t.hero.greeting}</span>
                    <span className="block">{t.hero.name}</span>
                  </h1>
                  <p className="mt-4 text-xl font-semibold sm:text-3xl">{t.hero.role}</p>
                  <p className={`mt-6 max-w-2xl text-base leading-8 sm:text-lg ${tone.muted}`}>{t.hero.description}</p>

                  <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                    <a href={cvUrl} download className={primaryButton}>
                      {t.hero.cvButton} <span aria-hidden="true">↓</span>
                    </a>
                    <a
                      href={githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className={`inline-flex items-center justify-center gap-2 rounded-xl border px-6 py-3.5 text-sm font-semibold transition-colors hover:border-red-500 ${darkMode ? "border-white/15 bg-white/[0.03]" : "border-neutral-300 bg-white"}`}
                    >
                      <GithubIcon />
                      {t.hero.githubButton} <span aria-hidden="true">↗</span>
                    </a>
                  </div>

                  <ul className={`mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm ${tone.muted}`}>
                    {t.hero.tags.map((tag) => <li key={tag}>{tag}</li>)}
                  </ul>
                </motion.div>

                <div className="relative mx-auto w-full max-w-md">
                  <div className={`relative aspect-[4/5] overflow-hidden rounded-3xl border p-4 ${darkMode ? "border-white/10 bg-gradient-to-b from-neutral-900 to-neutral-950" : "border-neutral-200 bg-neutral-100"}`}>
                    <img src="/perfil.png" alt={t.a11y.portrait} className="relative z-10 h-full w-full object-contain object-bottom" />
                    <div className={`absolute inset-x-4 bottom-4 z-20 rounded-2xl border p-4 backdrop-blur-xl ${darkMode ? "border-white/10 bg-black/60" : "border-white/70 bg-white/80"}`}>
                      <p className="text-sm font-bold">Ana Clara</p>
                      <p className={`mt-0.5 text-sm ${darkMode ? "text-neutral-300" : "text-neutral-700"}`}>{t.hero.caption}</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Sobre */}
              <section id="about" className="scroll-mt-24 py-20 sm:py-24">
                <SectionHeading title={t.about.title} description={t.about.description} mutedTone={tone.muted} />

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {t.about.highlights.map((item) => (
                    <div key={item.title} className={`rounded-2xl border p-5 ${tone.card}`}>
                      <p className="text-base font-bold leading-snug">{item.title}</p>
                      <p className={`mt-2 text-sm leading-6 ${tone.muted}`}>{item.text}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_0.8fr]">
                  <ol className={`rounded-2xl border p-6 sm:p-8 ${tone.card}`}>
                    {t.about.timeline.map((step, index) => (
                      <li
                        key={step.title}
                        className={`relative border-l pl-6 ${index === t.about.timeline.length - 1 ? "pb-0" : "pb-8"} ${tone.line}`}
                      >
                        <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-red-500" />
                        <p className="text-sm font-semibold text-red-500">{step.period}</p>
                        <h3 className="mt-1 text-lg font-bold">{step.title}</h3>
                        <p className={`text-sm font-medium ${tone.muted}`}>{step.place}</p>
                        <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>{step.text}</p>
                      </li>
                    ))}
                  </ol>

                  <div className={`h-fit rounded-2xl border p-6 sm:p-8 ${tone.card}`}>
                    <h3 className="text-lg font-bold">{t.about.languagesTitle}</h3>
                    <ul className="mt-5 space-y-4">
                      {t.about.languages.map((language) => (
                        <li key={language.name} className={`flex items-center justify-between gap-4 border-b pb-3 last:border-b-0 last:pb-0 ${tone.line}`}>
                          <span className="text-sm font-semibold">{language.name}</span>
                          <span className={`text-sm ${tone.muted}`}>{language.level}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {/* Projetos */}
              <ProjectsSection t={t} lang={lang} darkMode={darkMode} cardTone={`${tone.card} hover:border-red-500/40`} mutedTone={tone.muted} onOpenPage={openPage} />

              {/* Competências */}
              <section id="skills" className="scroll-mt-24 py-20 sm:py-24">
                <SectionHeading title={t.skills.title} description={t.skills.description} mutedTone={tone.muted} />

                <div className="grid gap-5 md:grid-cols-2">
                  {Object.entries(t.skills.items).map(([key, items]) => (
                    <article key={key} className={`rounded-2xl border p-6 sm:p-7 ${tone.card}`}>
                      <h3 className="mb-5 text-lg font-bold">{t.skills.categories[key]}</h3>
                      <ul className="flex flex-wrap gap-2.5">
                        {items.map((skill) => (
                          <li key={skill} className={`rounded-lg border px-3 py-2 text-sm font-medium ${tone.chip}`}>{skill}</li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <button type="button" onClick={() => openPage("badge")} className={primaryButton}>
                    {t.skills.badgeButton} <span aria-hidden="true">↗</span>
                  </button>
                </div>
              </section>

              {/* Formação e prêmios */}
              <AwardsSection lang={lang} darkMode={darkMode} cardTone={`${tone.card} hover:border-red-500/40`} mutedTone={tone.muted} />
            </div>
          )}

          <footer id="contact" className={`mt-10 scroll-mt-24 border-t ${darkMode ? "border-white/10 bg-[#060607]" : "border-neutral-200 bg-white"}`}>
            <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1.4fr_0.7fr_0.9fr] md:py-16">
              <div>
                <Logo label={t.a11y.home} onClick={goTo("home")} />
                <p className={`mt-4 max-w-sm text-sm leading-7 ${tone.muted}`}>{t.footer.tagline}</p>
                <a href={cvUrl} download className="mt-5 inline-flex items-center gap-2 rounded-xl border border-red-500/40 px-4 py-2.5 text-sm font-semibold text-red-500 transition-colors hover:bg-red-500 hover:text-white">
                  {t.footer.cv} <span aria-hidden="true">↓</span>
                </a>
              </div>

              <div>
                <h3 className="text-sm font-bold">{t.footer.navigation}</h3>
                <div className={`mt-4 flex flex-col items-start gap-3 text-sm ${tone.muted}`}>
                  {sectionIds.filter((id) => id !== "contact").map((id) => (
                    <a key={id} href={`#${id}`} onClick={goTo(id)} className="transition-colors hover:text-red-500">{t.nav[id]}</a>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold">{t.footer.connect}</h3>
                <div className={`mt-4 flex flex-col items-start gap-3 text-sm ${tone.muted}`}>
                  <a href={`mailto:${emailAddress}`} className="break-all transition-colors hover:text-red-500">{emailAddress}</a>
                  <a href={linkedinUrl} target="_blank" rel="noreferrer" className="transition-colors hover:text-red-500">LinkedIn ↗</a>
                  <a href={githubUrl} target="_blank" rel="noreferrer" className="transition-colors hover:text-red-500">GitHub ↗</a>
                </div>
              </div>
            </div>

            <div className={`border-t ${tone.line}`}>
              <div className={`mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs sm:px-8 md:flex-row md:items-center md:justify-between ${tone.muted}`}>
                <p>© {new Date().getFullYear()} Ana Clara. {t.footer.rights}</p>
                <p>{t.footer.made}</p>
              </div>
            </div>
          </footer>
        </>
      )}
    </main>
  );
}
