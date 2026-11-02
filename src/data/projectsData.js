
const tabLabels = {
  video: { 
    pt: "Vídeo de Demonstração", 
    en: "Demo Video", 
    es: "Video de Demostración", 
    ko: "데모 비디오" 
  },
  document: { 
    pt: "Documentação & Diagramas", 
    en: "Documentation & Diagrams", 
    es: "Documentación y Diagramas", 
    ko: "문서 및 다이어그램" 
  },
  rootCause: { 
    pt: "Causa Raiz & Evidências", 
    en: "Root Cause & Evidence", 
    es: "Causa Raíz y Evidencias", 
    ko: "근본 원인 및 증거" 
  },
  figma: { 
    pt: "Protótipo no Figma", 
    en: "Figma Prototype", 
    es: "Prototipo en Figma", 
    ko: "Figma 프로토타입" 
  },
};

export const projects = [
  {
    id: "portal-jovem-aprendiz",
    cover: "/projetos/portal-jovem-aprendiz/HOME.PNG",
    tags: ["SharePoint", "Agente de IA", "Causa Raiz", "Controle de Acessos", "UI/UX"],
    content: {
      pt: {
        subtitle: "Grupo Petrópolis • Projeto INOVA GP",
        title: "Portal Jovem Aprendiz",
        summary:
          "Plataforma corporativa estruturada no SharePoint com Agente de IA integrado para centralizar informações, responder dúvidas em tempo real e otimizar a gestão do programa Jovem Aprendiz no Grupo Petrópolis.",
        role: "Desenvolvedora SharePoint, Arquitetura de Acessos, Causa Raiz, Coautoria de Agente IA & Vídeo",
        period: "2026",
        did: [
          "Criação completa do site no SharePoint, incluindo o desenvolvimento da página inicial e dos modelos de layout das páginas",
          "Implementação de um Agente de IA integrado ao SharePoint (em coparticipação com o coordenador de BI) para responder automaticamente às dúvidas dos jovens aprendizes",
          "Estruturação das hierarquias e permissões de acesso para garantir a governança e segurança das informações",
          "Elaboração dos diagramas da análise de causa raiz para mapear gargalos (integrada aos dashboards de Power BI desenvolvidos por outro integrante da equipe) e edição do vídeo oficial",
        ],
        results: [
          "Atendimento automatizado e imediato às dúvidas dos jovens aprendizes através do Agente de IA no SharePoint",
          "Centralização da comunicação, controle eficiente de permissões e premiação de destaque no INOVA GP",
        ],
        highlights: [
          { value: "2º Lugar", label: "Premiação no evento corporativo INOVA GP" },
          { value: "IA Integrada", label: "Agente inteligente no SharePoint para suporte aos jovens" },
        ],
      },
      en: {
        subtitle: "Grupo Petrópolis • INOVA GP Project",
        title: "Young Apprentice Portal",
        summary:
          "Corporate platform built on SharePoint featuring an integrated AI Agent to centralize information, answer questions in real time, and optimize the Young Apprentice program management at Grupo Petrópolis.",
        role: "SharePoint Developer, Access Architecture, Root Cause, AI Agent Co-creator & Video Editing",
        period: "2025",
        did: [
          "Full SharePoint site creation, including the home page and standardized page layout templates",
          "Co-development of a SharePoint AI Agent (in partnership with a BI Coordinator) to automatically answer young apprentices' questions",
          "Structuring of access hierarchies and permissions to ensure data governance and security",
          "Development of root cause analysis diagrams to map bottlenecks (integrated with Power BI dashboards built by a teammate) and video editing",
        ],
        results: [
          "Automated and instant support for apprentices via the integrated SharePoint AI Agent",
          "Centralized communication, hierarchical permission control, and top recognition at the INOVA GP event",
        ],
        highlights: [
          { value: "2nd Place", label: "Award at the company's INOVA GP event" },
          { value: "AI Agent", label: "Smart SharePoint assistant for apprentice support" },
        ],
      },
      ko: {
        subtitle: "Grupo Petrópolis • INOVA GP 프로젝트",
        title: "청년 견습생 포털 (Portal Jovem Aprendiz)",
        summary:
          "SharePoint 기반의 기업용 포털로, AI 에이전트를 통합하여 견습생들의 질문에 실시간으로 응답하고 프로그램 관리를 최적화한 플랫폼입니다.",
        role: "SharePoint 구축, 접근 권한 설계, 근본 원인 분석, AI 에이전트 공동 개발 및 영상 편집",
        period: "2025",
        did: [
          "메인 페이지 및 표준 레이아웃 템플릿을 포함한 SharePoint 사이트 전체 구축",
          "BI 코디네이터와 협력하여 견습생들의 질문에 자동 응답하는 SharePoint AI 에이전트 구축",
          "정보 보안 및 거버넌스를 위한 계층별 접근 권한 구조 설계",
          "근본 원인 분석 다이어그램 작성 (팀원이 제작한 Power BI 대시보드와 연동) 및 발표 영상 편집",
        ],
        results: [
          "SharePoint AI 에이전트를 통한 견습생 문의 사항 실시간 자동 응답 구현",
          "사내 혁신 대회 INOVA GP에서 우수 프로젝트 2위 수상",
        ],
        highlights: [
          { value: "2위 수상", label: "사내 INOVA GP 혁신 이벤트 수상" },
          { value: "AI 에이전트", label: "견습생 지원을 위한 SharePoint 지능형 챗봇" },
        ],
      },
    },
    // OS VÍDEOS APARECEM EM PRIMEIRO LUGAR NAS ABAS:
    tabs: [
      {
        type: "video",
        label: tabLabels.video,
        src: "/projetos/portal-jovem-aprendiz/Projeto inova gp.mp4",
        poster: "/projetos/portal-jovem-aprendiz/HOME.PNG",
        youtubeId: "",
      },
      {
        type: "gallery",
        id: "causa-raiz-evidencias",
        label: tabLabels.rootCause,
        // Descrição geral da aba de evidências (caso seu componente exiba description ou points)
        description: {
          pt: "Mapeamento de causa raiz dos gargalos operacionais, evidências da interface estruturada no SharePoint e implementação do Agente de IA desenvolvido em coparticipação com o Coordenador de BI para responder às dúvidas dos jovens aprendizes.",
          en: "Root cause mapping of operational bottlenecks, evidence of the SharePoint interface, and implementation of the AI Agent co-developed with the BI Coordinator to answer apprentices' questions.",
          ko: "운영 병목 현상에 대한 근본 원인 분석, SharePoint 인터페이스 구축 증거, 그리고 BI 코디네이터와 공동 개발하여 견습생의 질문에 답변하는 AI 에이전트 구현 화면입니다.",
        },
        points: [
          "Análise de Causa Raiz: Identificação de falhas na comunicação e dispersão de informações do programa.",
          "Evidências do Portal: Estruturação da Home Page, layouts padronizados e hierarquia de acessos no SharePoint.",
          "Agente de IA no SharePoint: Assistente virtual criado em coparticipação com um coordenador de BI para tirar dúvidas dos jovens aprendizes de forma interativa.",
        ],
        images: [
          "/projetos/portal-jovem-aprendiz/Causa raiz.png",
          "/projetos/portal-jovem-aprendiz/Evidencias.png",
          "/projetos/portal-jovem-aprendiz/IA.PNG",
        ],
        captions: [
          {
            src: "/projetos/portal-jovem-aprendiz/Causa raiz.png",
            title: "Matriz e Diagrama de Causa Raiz",
            text: "Levantamento das dores e gargalos no acompanhamento dos jovens aprendizes.",
          },
          {
            src: "/projetos/portal-jovem-aprendiz/Evidencias.png",
            title: "Evidências do Portal SharePoint",
            text: "Estrutura da página inicial, modelos de layout e organização visual das informações.",
          },
          {
            src: "/projetos/portal-jovem-aprendiz/IA.PNG",
            title: "Agente de IA do SharePoint",
            text: "Agente inteligente criado em coparticipação com um coordenador de BI para responder às perguntas dos jovens diretamente pelo portal.",
          },
        ],
      },
      {
        type: "document",
        id: "diagrama-portal",
        label: tabLabels.document,
        file: "/projetos/portal-jovem-aprendiz/Diagrama portal.pdf",
        pages: [],
        points: [
          "Mapeamento detalhado dos gargalos do processo anterior através de diagrama de causa raiz.",
          "Estruturação da arquitetura do portal SharePoint e definição da hierarquia de acessos.",
        ],
      },
    ],
  },
  {
    id: "tcc-deluxe",
    cover: "/projetos/tcc-deluxe/HOME.PNG",
    tags: ["Laravel", "MySQL", "Tailwind", "Bootstrap", "Full Stack", "UX/UI"],
    content: {
      pt: {
        subtitle: "TCC • Etec • Desenvolvimento de Sistemas",
        title: "Deluxe Cortinas & Persianas",
        summary:
          "Sistema web completo de gestão desenvolvido de ponta a ponta para eliminar falhas de comunicação, perdas de anotações em papel e atrasos no fluxo de pedidos, produção e instalação.",
        role: "Desenvolvedora Full Stack & UX/UI Designer (Autoria Completa)",
        period: "2025",
        did: [
          "Desenvolvimento completo de ponta a ponta (Full Stack) utilizando Laravel, PHP, MySQL, HTML/CSS, Tailwind e Bootstrap",
          "Concepção de toda a interface UX/UI, modelagem do banco de dados, regras de negócio e documentação técnica",
          "Implementação do fluxo contínuo de pedidos integrando todos os setores: Admin → Produção → Agendamento → Instalador → Finalizado",
          "Sistema de notificações internas entre setores, agendamento de instalações e registro fotográfico de conclusão pelo instalador",
        ],
        results: [
          "Eliminação de retrabalho, perda de dados em papel e falhas de agendamento",
          "Rastreabilidade total das etapas do pedido e aprovação máxima pela banca examinadora",
        ],
        highlights: [
          { value: "1º Lugar", label: "Melhor TCC da Noite" },
          { value: "100%", label: "Aprovação pela Banca Examinadora" },
        ],
      },
      en: {
        subtitle: "Final Thesis (TCC) • Etec • Systems Development",
        title: "Deluxe Curtains & Blinds",
        summary:
          "End-to-end web management system built to eliminate communication failures, paper-based data loss, and delays across order tracking, production, and installation.",
        role: "Full Stack Developer & UX/UI Designer (Sole Developer)",
        period: "2025",
        did: [
          "Full-stack architecture and development from scratch using Laravel, PHP, MySQL, HTML/CSS, Tailwind, and Bootstrap",
          "Complete UX/UI design, database modeling, business logic, and technical documentation",
          "End-to-end order workflow implementation connecting all departments: Admin → Production → Scheduling → Installer → Completed",
          "Built internal cross-department notifications, installation scheduling, and photo upload confirmation for installers",
        ],
        results: [
          "Eliminated rework, lost paper notes, and scheduling conflicts for small and medium enterprises",
          "Full order traceability and unanimous approval with top honors from the examining board",
        ],
        highlights: [
          { value: "1st Place", label: "Best Final Project of the Night" },
          { value: "100%", label: "Approval by the Examining Board" },
        ],
      },
      ko: {
        subtitle: "졸업 프로젝트 (TCC) • Etec • 시스템 개발",
        title: "Deluxe 커튼 & 블라인드 관리 시스템",
        summary:
          "수기 기록으로 인한 데이터 손실과 부서 간 소통 오류를 해결하기 위해 주문부터 생산, 설치까지 전 과정을 통합한 웹 관리 시스템입니다.",
        role: "풀스택 개발자 & UX/UI 디자이너 (전체 단독 개발)",
        period: "2025",
        did: [
          "Laravel, PHP, MySQL, Tailwind, Bootstrap을 활용한 프론트엔드 및 백엔드 전체 단독 개발",
          "데이터베이스 설계, UX/UI 디자인 및 시스템 아키텍처 전면 구축",
          "관리자 → 생산 → 일정 예약 → 설치 기사 → 완료로 이어지는 주문 추적 워크플로우 구현",
          "부서 간 실시간 알림 및 설치 완료 사진 등록 기능 구현",
        ],
        results: [
          "업무 재작업 및 일정 오류를 방지하고 중소기업 운영 효율성 극대화",
          "심사위원단 만장일치 합격 및 최우수 졸업 작품 선정",
        ],
        highlights: [
          { value: "1위 수상", label: "최우수 졸업 프로젝트 선정" },
          { value: "100%", label: "심사위원단 만장일치 통과" },
        ],
      },
    },
    tabs: [
      {
        type: "video",
        label: tabLabels.video,
        src: "/projetos/tcc-deluxe/DELUXE - TCC.mp4",
        poster: "/projetos/tcc-deluxe/HOME.PNG",
        youtubeId: "",
      },
      {
        type: "document",
        id: "documentacao-deluxe",
        label: tabLabels.document,
        file: "/projetos/tcc-deluxe/Deluxe.pdf",
        pages: [],
        points: [
          "Problematização: Substituição de anotações em papel por controle digital centralizado.",
          "Stack Tecnológica: Laravel, XAMPP, MySQL, HTML/CSS, Tailwind e Bootstrap.",
          "Fluxo do Pedido: Admin → Produção → Agendamento → Instalador → Finalizado.",
        ],
      },
    ],
  },
];