/**
 * data.js — Single source of truth for david_bf's portfolio.
 * Edit this file to update all themes at once.
 */
const PORTFOLIO = {

    // ── Identity ───────────────────────────────────────────────
    name: "David",
    handle: "david_bf",
    fullName: "David Barreto Ferreira",
    title: "Software Engineer",
    location: "Porto, Portugal",
    email: "hello@davidbf.com",

    // ── Bio ────────────────────────────────────────────────────
    // Each string is a paragraph.
    bio: [
        "Hey. I'm David — or david_bf online. The BF stands for Barreto Ferreira, not best friend. Although I am pretty great.",
        "Software engineer with a CS background and a soft spot for distributed systems, clean code, and making machines do the heavy lifting.",
        "When I'm not shipping code, I'm playing guitar, watching movies or traveling — probably all at the same time in some unholy multithreaded process.",
    ],

    // Short one-liner used in compact views
    tagline: "Backend & distributed systems, with a guitar habit.",

    // ── What I'm currently doing ────────────────────────────────
    currently: [
        "Building an AI personal assistant",
        "Creating a NES emulator with Rust",
    ],
    currentlyNote: "Yes, I talk to my computer. It talks back. We are colleagues now.",

    // ── Skills ─────────────────────────────────────────────────
    skills: {
        languages: ["Java", "Python", "Rust", "Go", "SQL"],
        areas: ["Distributed Systems", "System Design", "Backend Engineering", "Algorithms"],
        tools: ["Linux", "Git", "Microservices", "Spring Boot", "Apache Camel", "IntelliJ", "VS Code", "FastAPI", "pandas"],
    },

    // ── Social links ────────────────────────────────────────────
    social: [
        { label: "GitHub", url: "https://github.com/davidbarreto", note: "code & projects" },
        { label: "LinkedIn", url: "https://www.linkedin.com/in/david-ferreira-7283462b/", note: "professional profile" },
        { label: "CV", url: "https://cv.davidbf.com", note: "full résumé" },
    ],

    // ── Competitive programming ─────────────────────────────────
    competitive: [
        { label: "LeetCode", handle: "david_bf", url: "https://leetcode.com/u/david_bf/", color: "#ffa116" },
        { label: "HackerRank", handle: "david_brto", url: "https://www.hackerrank.com/profile/david_brto", color: "#00c853" },
        { label: "Codeforces", handle: "david_bf", url: "https://codeforces.com/profile/david_bf", color: "#f85149" },
        { label: "CodeChef", handle: "david_bf", url: "https://www.codechef.com/users/david_bf", color: "#FFB852" },
        { label: "Topcoder", handle: "david_bf", url: "https://profiles.topcoder.com/david_bf", color: "#00aee0" },
        { label: "SPOJ", handle: "david_bf", url: "https://www.spoj.com/status/david_bf/", color: "#d2a8ff" },
        { label: "UVa Online Judge", handle: "#26642", url: "https://onlinejudge.org/index.php?option=com_onlinejudge&Itemid=19&page=show_authorstats&userid=26642", color: "#7d8590" },
    ],

    // ── Projects ────────────────────────────────────────────────
    projects: [
        { label: "alfred", url: "https://github.com/davidbarreto/alfred", desc: "An AI personal assistant, built with n8n + FastAPI. Still teaching it manners." },
        { label: "k-nes", url: "https://github.com/davidbarreto/k-nes", desc: "A NES emulator written in Rust, one opcode at a time. The 6502 didn't stand a chance." },
        { label: "consulate-schedule-checker", url: "https://github.com/davidbarreto/consulate-schedule-checker", desc: "Watched for open appointment slots at the Brazilian consulate so I didn't have to. Worked great until they redesigned the site out of spite. RIP." },
    ],

    // ── Education ───────────────────────────────────────────────
    // Most recent degree first.
    education: [
        {
            degree: "M.Sc. in Computer Science",
            institution: "Universidade Federal Fluminense (UFF), Brazil",
            year: 2013,
            thesis: "Uma Interface para Prototipagem e Gerenciamento de Aplicações Pervasivas",
            advisor: "Orlando Gomes Loques Filho",
            funding: "CAPES scholarship",
            keywords: ["Rapid prototyping", "Simulation", "Smart environments", "Ubiquitous computing"],
            url: "https://www.ic.uff.br/wp-content/tesesedissertacoes/frontend-tesesdissertacoes/download.php?id=630.pdf&tipo=trabalho",
        },
        {
            degree: "B.Sc. in Computer Science",
            institution: "Universidade do Estado do Rio de Janeiro (UERJ), Brazil",
            year: 2010,
            advisor: "Alexandre Sztajnberg",
            funding: "CNPq",
        },
    ],

    // ── Publications ────────────────────────────────────────────
    // From CAPES/CNPq (Lattes) record. "type: abstract" = conference abstract, not a full paper.
    publications: [
        { title: "Uma Interface de Prototipagem para Aplicações Pervasivas", authors: "Ferreira, D. B.; Erthal, M. S.; Mareli, D. F. M.; Loques, O.", venue: "SBRC 2013 — Simpósio Brasileiro de Redes de Computadores e Sistemas Distribuídos, Brasília", year: 2013, role: "first-author", type: "paper", url: "http://sbrc2013.unb.br/files/anais/trilha-principal/artigos/artigo-44.pdf" },
        { title: "Um Framework de Desenvolvimento de Aplicações Ubíquas em Ambientes Inteligentes", authors: "Mareli, D. F. M.; Erthal, M. S.; Ferreira, D. B.; Loques, O.", venue: "SBRC 2013, Brasília", year: 2013, role: "co-author", type: "paper", url: "http://sbrc2013.unb.br/files/anais/trilha-principal/artigos/artigo-45.pdf" },
        { title: "Interpretação de Contexto em Ambientes Inteligentes", authors: "Erthal, M. S.; Mareli, D. F. M.; Barreto, D.; Loques, O.", venue: "V Simpósio Brasileiro de Computação Ubíqua e Pervasiva (CSBC 2013), Maceió", year: 2013, role: "co-author", type: "paper", url: "https://sol.sbc.org.br/index.php/sbcup/article/view/16946/16785" },
        { title: "Suporte para Coleta e Persistência de Dados de Contexto em um Sistema de Monitoramento Domiciliar Remoto de Pacientes", authors: "Macedo, E. L. C.; Ferreira, D. B.; Lemos, G. M. R.; Sztajnberg, A.; Loques, O.", venue: "Computer on the Beach 2011, Florianópolis", year: 2011, role: "co-author", type: "paper", url: "https://scispace.com/pdf/suporte-para-coleta-e-persistencia-de-dados-de-contexto-em-ny85n5i0lc.pdf" },
        // Undergrad-era conference abstracts, pre-master's — left out for now.
        // { title: "Utilizando Acelerômetros para Monitorar Atividades de um Usuário em um Ambiente Controlado", authors: "Ferreira, D. B.; Sztajnberg, A.", venue: "18ª Semana de Iniciação Científica, Rio de Janeiro", year: 2009, role: "first-author", type: "abstract" },
        // { title: "A informática na difusão do conhecimento científico", authors: "Ferreira, D. B.; Oliveira, D. C.", venue: "19ª UERJ sem muros, Rio de Janeiro", year: 2008, role: "first-author", type: "abstract" },
    ],

    // ── Neofetch-style extras (used by CLI theme) ───────────────
    neofetch: {
        OS: "All (but <3 Unix-like OS's)",
        Language: "Whatever which gets the job done",
        Memory: "∞ (coffee-powered)",
        Uptime: "since graduation",
        Location: "Porto, Portugal 🇵🇹",
        Music: "playing guitar @ 1am",
    },
};