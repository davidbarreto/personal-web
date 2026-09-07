// lib/exportConfig.ts
// URL-shareable config controlling which resume items appear on the
// CV page and in the PDF export. The site and the PDF have separate
// configs (different defaults, different override lists) so you can
// e.g. keep the full site but ship a trimmed PDF. Encoded as base64url
// JSON in `cfg` (site) / `pdfCfg` (PDF) query params, so different
// "profiles" can be bookmarked/shared as plain links — no backend.

import { Resume } from './resume'

export interface ExportConfig {
    hiddenWork: string[]
    hiddenEducation: string[]
    hiddenSkills: string[]
    hiddenPublications: string[]
    hiddenLanguages: string[]
    hiddenProjects: string[]
    hiddenProfiles: string[]
}

export const EMPTY_CONFIG: ExportConfig = {
    hiddenWork: [],
    hiddenEducation: [],
    hiddenSkills: [],
    hiddenPublications: [],
    hiddenLanguages: [],
    hiddenProjects: [],
    hiddenProfiles: [],
}

// Stable-ish ids for each item, used instead of array indices so a
// saved link doesn't silently point at the wrong item if resume.json
// gets reordered.
export const itemId = {
    work: (job: Resume['work'][number]) => job.startDate,
    education: (e: Resume['education'][number]) => e.studyType,
    skills: (s: Resume['skills'][number]) => s.name,
    publications: (p: Resume['publications'][number]) => p.name,
    languages: (l: Resume['languages'][number]) => l.language,
    projects: (p: Resume['projects'][number]) => p.name,
    profiles: (p: Resume['basics']['profiles'][number]) => p.network,
}

// The site shows everything unless you hide it.
export function getDefaultSiteConfig(): ExportConfig {
    return EMPTY_CONFIG
}

// The PDF starts trimmed: no X/Instagram/Lattes, no publications,
// only Portuguese/English — computed from the live resume data so it
// never points at stale ids.
export function getDefaultPdfConfig(resume: Resume): ExportConfig {
    return {
        ...EMPTY_CONFIG,
        hiddenProfiles: resume.basics.profiles
            .filter(p => ['X', 'Instagram', 'Lattes'].includes(p.network))
            .map(itemId.profiles),
        hiddenPublications: resume.publications.map(itemId.publications),
        hiddenProjects: resume.projects.map(itemId.projects),
        hiddenLanguages: resume.languages
            .filter(l => !['Portuguese', 'English'].includes(l.language))
            .map(itemId.languages),
    }
}

function base64UrlEncode(json: string): string {
    const b64 = typeof window === 'undefined'
        ? Buffer.from(json, 'utf-8').toString('base64')
        : btoa(unescape(encodeURIComponent(json)))
    return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function base64UrlDecode(str: string): string {
    const b64 = str.replace(/-/g, '+').replace(/_/g, '/')
    const padded = b64 + '='.repeat((4 - (b64.length % 4)) % 4)
    return typeof window === 'undefined'
        ? Buffer.from(padded, 'base64').toString('utf-8')
        : decodeURIComponent(escape(atob(padded)))
}

export function encodeConfig(cfg: ExportConfig): string {
    return base64UrlEncode(JSON.stringify(cfg))
}

export function decodeConfig(encoded: string): ExportConfig {
    try {
        const parsed = JSON.parse(base64UrlDecode(encoded))
        return { ...EMPTY_CONFIG, ...parsed }
    } catch {
        return EMPTY_CONFIG
    }
}

export function parseConfigFromSearch(search: string, param: 'cfg' | 'pdfCfg', fallback: ExportConfig): ExportConfig {
    const params = new URLSearchParams(search)
    const encoded = params.get(param)
    if (!encoded) return fallback
    return decodeConfig(encoded)
}

function sameConfig(a: ExportConfig, b: ExportConfig): boolean {
    const keys = Object.keys(EMPTY_CONFIG) as (keyof ExportConfig)[]
    return keys.every(k => {
        const av = [...a[k]].sort()
        const bv = [...b[k]].sort()
        return av.length === bv.length && av.every((v, i) => v === bv[i])
    })
}

export function configsToUrl(site: ExportConfig, pdf: ExportConfig, defaultSite: ExportConfig, defaultPdf: ExportConfig): string {
    const url = new URL(window.location.href)

    if (sameConfig(site, defaultSite)) url.searchParams.delete('cfg')
    else url.searchParams.set('cfg', encodeConfig(site))

    if (sameConfig(pdf, defaultPdf)) url.searchParams.delete('pdfCfg')
    else url.searchParams.set('pdfCfg', encodeConfig(pdf))

    return url.pathname + url.search
}

export function applyConfig(resume: Resume, cfg: ExportConfig): Resume {
    return {
        ...resume,
        basics: {
            ...resume.basics,
            profiles: resume.basics.profiles.filter(p => !cfg.hiddenProfiles.includes(itemId.profiles(p))),
        },
        work: resume.work.filter(j => !cfg.hiddenWork.includes(itemId.work(j))),
        education: resume.education.filter(e => !cfg.hiddenEducation.includes(itemId.education(e))),
        skills: resume.skills.filter(s => !cfg.hiddenSkills.includes(itemId.skills(s))),
        publications: resume.publications.filter(p => !cfg.hiddenPublications.includes(itemId.publications(p))),
        languages: resume.languages.filter(l => !cfg.hiddenLanguages.includes(itemId.languages(l))),
        projects: resume.projects.filter(p => !cfg.hiddenProjects.includes(itemId.projects(p))),
    }
}
