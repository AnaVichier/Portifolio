// Helpers para não repetir { pt, en } em todo lugar
const L = (pt, en) => ({ pt, en });
const LL = (pt, en) => ({ pt: [pt], en: [en] });

// Os nomes de arquivo têm espaços; encodeURI evita link quebrado.
// Atenção às maiúsculas/minúsculas: em hospedagem Linux (Vercel, Netlify)
// "HOME.PNG" e "home.png" são arquivos diferentes.
const asset = (dir, file) => encodeURI(`${dir}/${file}`);

const PORTAL = "/projetos/portal-jovem-aprendiz";
const TCC = "/projetos/tcc-deluxe";

export const ui = {
  pt: { details: "Ver detalhes", figma: "Abrir no Figma", close: "Fechar", images: "Imagens", proto: "Protótipo", video: "Vídeo", files: "Arquivos", emptyImage: "Imagem em breve" },
  en: { details: "View details", figma: "Open in Figma", close: "Close", images: "Images", proto: "Prototype", video: "Video", files: "Files", emptyImage: "Image coming soon" },
};

export const projectTabs = {
  pt: { featured: "Destaques" },
  en: { featured: "Highlights" },
};

export const projects = [
  {
    id: "portal",
    tab: "featured",
    title: "Portal Jovem Aprendiz",
    label: L("2º lugar · INOVA GP", "2nd place · INOVA GP"),
    summary: L(
      "Portal em SharePoint com Agente de IA integrado, que centraliza informações e responde dúvidas dos jovens aprendizes em tempo real.",
      "SharePoint portal with an integrated AI agent that centralizes information and answers young apprentices' questions in real time."
    ),
    details: {
      pt: [
        "Plataforma corporativa criada no SharePoint, com Agente de IA integrado, para centralizar informações, responder dúvidas em tempo real e facilitar a gestão do programa Jovem Aprendiz no Grupo Petrópolis.",
        "O que eu fiz: criei o site completo (página inicial e modelos de layout), implementei o Agente de IA junto com o coordenador de BI, estruturei hierarquias e permissões de acesso, montei os diagramas da análise de causa raiz e editei o vídeo oficial.",
        "Resultados: respostas imediatas e automáticas às dúvidas dos jovens, comunicação centralizada, controle de permissões e o 2º lugar no INOVA GP.",
      ],
      en: [
        "Corporate platform built on SharePoint with an integrated AI agent, to centralize information, answer questions in real time and make the Young Apprentice program at Grupo Petrópolis easier to manage.",
        "What I did: built the whole site (home page and layout templates), implemented the AI agent together with the BI coordinator, set up access hierarchies and permissions, created the root-cause analysis diagrams and edited the official video.",
        "Results: instant automated answers for the apprentices, centralized communication, permission control and 2nd place at INOVA GP.",
      ],
    },
    tags: ["SharePoint", "AI Agent", "UI/UX"],
    cover: asset(PORTAL, "HOME.PNG"),
    gallery: [
      asset(PORTAL, "HOME.PNG"),
      asset(PORTAL, "IA.PNG"),
      asset(PORTAL, "Causa raiz.png"),
      asset(PORTAL, "Evidencias.png"),
    ],
    video: asset(PORTAL, "Projeto inova gp.mp4"),
    links: [{ label: L("Diagrama do portal (PDF)", "Portal diagram (PDF)"), href: asset(PORTAL, "Diagrama portal.pdf") }],
  },
  {
    id: "tcc",
    tab: "featured",
    title: "TCC — Deluxe Cortinas & Persianas",
    label: L("1º lugar · Melhor TCC", "1st place · Best capstone"),
    summary: L(
      "Dashboard feito para a Deluxe como TCC de Desenvolvimento de Sistemas (Etec). Melhor TCC da turma, com 100% de aprovação.",
      "Dashboard built for Deluxe as my Systems Development capstone (Etec). Best capstone of the class, with 100% approval."
    ),
    details: LL(
      "Dashboard feito para a Deluxe Cortinas & Persianas como TCC do técnico em Desenvolvimento de Sistemas na Etec. Foi eleito o melhor TCC da turma, com 100% de aprovação.",
      "Dashboard built for Deluxe Cortinas & Persianas as my capstone for the Systems Development technical course at Etec. Voted best capstone of the class, with 100% approval."
    ),
    tags: ["Dashboard", "Data", "Etec"],
    cover: asset(TCC, "DASH.PNG"),
    gallery: [asset(TCC, "DASH.PNG"), asset(TCC, "HOME.PNG")],
    video: asset(TCC, "DELUXE - TCC.mp4"),
    links: [{ label: L("Documento do TCC (PDF)", "Capstone document (PDF)"), href: asset(TCC, "Deluxe.pdf") }],
  },
];

export const awardsUi = {
  pt: {
    eyebrow: "Aprendizado e reconhecimento",
    title: "Formação, cursos e prêmios",
    description: "Diplomas, certificados e prêmios.",
    tabs: { awards: "Prêmios", education: "Diplomas e cursos" },
  },
  en: {
    eyebrow: "Learning and recognition",
    title: "Education, courses and awards",
    description: "Diplomas, certificates and awards.",
    tabs: { awards: "Awards", education: "Diplomas and courses" },
  },
};

export const awards = [
  {
    id: "inova",
    group: "awards",
    title: L("2º lugar — INOVA GP", "2nd place — INOVA GP"),
    label: "Grupo Petrópolis",
    summary: L(
      "Premiação no evento corporativo INOVA GP com o Portal Jovem Aprendiz.",
      "Award at the INOVA GP corporate event for the Young Apprentice Portal."
    ),
    details: LL(
      "Premiação no evento corporativo INOVA GP com o Portal Jovem Aprendiz.",
      "Award at the INOVA GP corporate event for the Young Apprentice Portal."
    ),
    // "*" é o marcador que o componente usa quando não há imagem (mantido como estava)
    cover: "*",
    gallery: ["*"],
  },
  {
    id: "cna",
    group: "awards",
    title: L("Aluna Destaque — CNA", "Outstanding Student — CNA"),
    label: "CNA",
    summary: L("Reconhecimento como aluna destaque no CNA.", "Recognized as an outstanding student at CNA."),
    details: LL("Reconhecimento como aluna destaque no CNA.", "Recognized as an outstanding student at CNA."),
    cover: "/projetos/CNA/Certificado.png",
    gallery: ["/projetos/CNA/Certificado.png"],
  },
  {
    id: "tcc-etec",
    group: "awards",
    title: L("1º lugar — Melhor TCC da turma", "1st place — Best class capstone"),
    label: "Etec",
    summary: L(
      "TCC da Deluxe eleito o melhor da turma, com 100% de aprovação.",
      "Deluxe capstone voted best of the class, with 100% approval."
    ),
    details: LL(
      "TCC da Deluxe eleito o melhor da turma, com 100% de aprovação.",
      "Deluxe capstone voted best of the class, with 100% approval."
    ),
    cover: "/projetos/tcc-deluxe/DELUXE.PNG",
    gallery: ["/projetos/tcc-deluxe/DELUXE.PNG"],
  },
  {
    id: "etec",
    group: "education",
    title: L("Técnico em Desenvolvimento de Sistemas", "Technical degree in Systems Development"),
    label: "Etec · 2025",
    summary: L("Ensino médio técnico concluído em 2025.", "Technical high school completed in 2025."),
    details: LL("Ensino médio técnico concluído em 2025.", "Technical high school completed in 2025."),
    cover: "/projetos/tcc-deluxe/ETEC.jpg",
    gallery: ["/projetos/tcc-deluxe/ETEC.jpg"],
  },
  {
    id: "mackenzie",
    group: "education",
    title: L("Tecnólogo em Processos Gerenciais", "Associate degree in Management Processes"),
    label: "Mackenzie · EAD",
    summary: L("Graduação em andamento.", "Degree in progress."),
    details: LL("Graduação em andamento.", "Degree in progress."),
    cover: "/diplomas/mackenzie.jpg",
    gallery: ["/diplomas/mackenzie.jpg"],
  },
  {
    id: "tsql",
    group: "education",
    title: L("Banco de dados e T-SQL básico", "Databases & T-SQL basic"),
    label: L("Estudos", "Studies"),
    summary: L("Estudos em banco de dados e T-SQL.", "Database and T-SQL studies."),
    details: LL("Estudos em banco de dados e T-SQL.", "Database and T-SQL studies."),
    cover: "/projetos/certificates/Banco.png",
    gallery: ["/projetos/certificates/Banco.png"],
  },
  {
    id: "python",
    group: "education",
    title: L("Formação em Python", "Python Training"),
    label: L("Certificado", "Certificate"),
    summary: L("Estudos e projetos práticos em Python.", "Studies and practical projects in Python."),
    details: LL("Estudos e projetos práticos em Python.", "Studies and practical projects in Python."),
    cover: "/projetos/certificates/Python.png",
    gallery: ["/projetos/certificates/Python.png"],
  },
];
