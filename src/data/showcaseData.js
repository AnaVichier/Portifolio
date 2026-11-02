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
    id: "portal", tab: "featured",
    title: "Portal Jovem Aprendiz",
    label: { pt: "🏆 2º lugar · INOVA GP", en: "🏆 2nd place · INOVA GP" },
    summary: {
      pt: "Portal em SharePoint com Agente de IA integrado para centralizar informações e responder dúvidas dos jovens aprendizes em tempo real.",
      en: "SharePoint portal with an integrated AI agent that centralizes information and answers young apprentices' questions in real time.",
    },
    details: {
      pt: [
        "Plataforma corporativa estruturada no SharePoint, com Agente de IA integrado, para centralizar informações, responder dúvidas em tempo real e otimizar a gestão do programa Jovem Aprendiz no Grupo Petrópolis.",
        "O que eu fiz: criação completa do site (página inicial e modelos de layout), implementação do Agente de IA em coparticipação com o coordenador de BI, estrutura de hierarquias e permissões de acesso, diagramas da análise de causa raiz e edição do vídeo oficial.",
        "Resultados: atendimento automatizado e imediato às dúvidas dos jovens, comunicação centralizada, controle eficiente de permissões e premiação de destaque (2º lugar) no INOVA GP.",
      ],
      en: [
        "Corporate platform built on SharePoint with an integrated AI agent to centralize information, answer questions in real time and improve management of the Young Apprentice program at Grupo Petrópolis.",
        "What I did: built the whole site (home page and layout templates), implemented the AI agent together with the BI coordinator, structured access hierarchies and permissions, created the root-cause analysis diagrams and edited the official video.",
        "Results: instant automated answers for the apprentices, centralized communication, efficient permission control and a top award (2nd place) at INOVA GP.",
      ],
    },
    tags: ["SharePoint", "AI Agent", "UI/UX"],
    cover: `${PORTAL}/HOME.PNG`,
    gallery: [`${PORTAL}/HOME.PNG`, `${PORTAL}/IA.PNG`, `${PORTAL}/Causa raiz.png`, `${PORTAL}/Evidencias.png`],
    video: `${PORTAL}/Projeto inova gp.mp4`,
    links: [{ label: { pt: "Diagrama do portal (PDF)", en: "Portal diagram (PDF)" }, href: `${PORTAL}/Diagrama portal.pdf` }],
  },
  {
    id: "tcc", tab: "featured",
    title: "TCC — Deluxe Cortinas & Persianas",
    label: { pt: "🏆 1º lugar · Melhor TCC", en: "🏆 1st place · Best capstone" },
    summary: {
      pt: "Dashboard desenvolvido para a Deluxe no TCC de Desenvolvimento de Sistemas (Etec). Melhor TCC da turma, com 100% de aprovação.",
      en: "Dashboard built for Deluxe as my Systems Development capstone (Etec). Best capstone of the class, with 100% approval.",
    },
    details: {
      pt: [
        "Dashboard desenvolvido para a Deluxe Cortinas & Persianas como TCC do técnico em Desenvolvimento de Sistemas na Etec. Eleito o melhor TCC da turma, com 100% de aprovação.",
      ],
      en: [
        "Dashboard built for Deluxe Cortinas & Persianas as my capstone for the Systems Development technical course at Etec. Voted best capstone of the class, with 100% approval.",
      ],
    },
    tags: ["Dashboard", "Data", "Etec"],
    cover: `${TCC}/DASH.PNG`,
    gallery: [`${TCC}/DASH.PNG`, `${TCC}/HOME.PNG`],
    video: `${TCC}/DELUXE - TCC.mp4`,
    links: [{ label: { pt: "Documento do TCC (PDF)", en: "Capstone document (PDF)" }, href: `${TCC}/Deluxe.pdf` }],
  },
];

export const awardsUi = {
  pt: { eyebrow: "Aprendizado e reconhecimento", title: "Formação, cursos & prêmios", description: "Diplomas, certificados e reconhecimentos que fazem parte da minha trajetória.", tabs: { awards: "Prêmios", education: "Diplomas & cursos" } },
  en: { eyebrow: "Learning and recognition", title: "Education, courses & awards", description: "Diplomas, certificates and recognitions that are part of my journey.", tabs: { awards: "Awards", education: "Diplomas & courses" } },
};

export const awards = [
  {
    id: "inova", group: "awards",
    title: { pt: "2º lugar — INOVA GP", en: "2nd place — INOVA GP" },
    label: "Grupo Petrópolis",
    summary: { pt: "Premiação no evento corporativo INOVA GP com o Portal Jovem Aprendiz.", en: "Award at the INOVA GP corporate event for the Young Apprentice Portal." },
    details: { pt: ["Premiação no evento corporativo INOVA GP com o Portal Jovem Aprendiz."], en: ["Award at the INOVA GP corporate event for the Young Apprentice Portal."] },
    cover: "*", gallery: ["*"],
  },
  {
    id: "cna", group: "awards",
    title: { pt: "Aluna Destaque — CNA", en: "Outstanding Student — CNA" },
    label: "CNA",
    summary: { pt: "Reconhecimento como aluna destaque no CNA.", en: "Recognized as an outstanding student at CNA." },
    details: { pt: ["Reconhecimento como aluna destaque no CNA."], en: ["Recognized as an outstanding student at CNA."] },
    cover: "/projetos/CNA/Certificado.png", gallery: ["/projetos/CNA/Certificado.png"],
  },
  {
    id: "tcc-etec", group: "awards",
    title: { pt: "1º lugar — Melhor TCC da turma", en: "1st place — Best class capstone" },
    label: "Etec",
    summary: { pt: "TCC da Deluxe eleito o melhor da turma, com 100% de aprovação.", en: "Deluxe capstone voted best of the class, with 100% approval." },
    details: { pt: ["TCC da Deluxe eleito o melhor da turma, com 100% de aprovação."], en: ["Deluxe capstone voted best of the class, with 100% approval."] },
    cover: "/projetos/tcc-deluxe/DELUXE.PNG", gallery: ["/projetos/tcc-deluxe/DELUXE.PNG"],
  },
  { id: "etec", group: "education", title: { pt: "Técnico em Desenvolvimento de Sistemas", en: "Technical degree in Systems Development" }, label: "Etec · 2025", summary: { pt: "Ensino médio técnico concluído em 2025.", en: "Technical high school completed in 2025." }, cover: "/projetos/tcc-deluxe/ETEC.jpg", gallery: ["/projetos/tcc-deluxe/ETEC.jpg"] },
  { id: "mackenzie", group: "education", title: { pt: "Tecnólogo em Processos Gerenciais", en: "Associate degree in Management Processes" }, label: "Mackenzie · EAD", summary: { pt: "Graduação em andamento.", en: "Degree in progress." }, cover: "/diplomas/mackenzie.jpg", gallery: ["/diplomas/mackenzie.jpg"] },
  {
    id: "tsql",
    group: "education",
    title: { pt: "Banco de dados e T-SQL básico", en: "Databases & T-SQL basic" },
    label: { pt: "Estudos", en: "Studies" },
    summary: { pt: "Estudos em banco de dados e T-SQL.", en: "Database and T-SQL studies." },
    cover: "/projetos/certificates/Banco.png",
    gallery: ["/projetos/certificates/Banco.png"],
  },
  {
    id: "python",
    group: "education",
    title: { pt: "Formação em Python", en: "Python Training" },
    label: { pt: "Certificado", en: "Certificate" },
    summary: { pt: "Estudos e projetos práticos em Python.", en: "Studies and practical projects in Python." },
    cover: "/projetos/certificates/Python.png",
    gallery: ["/projetos/certificates/Python.png"],
  },
];
