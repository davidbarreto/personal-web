// lib/resume.ts

export interface ResumeBasics {
    name: string
    label: string
    image: string
    email: string
    url: string
    summary: string
    location: {
        city: string
        region: string
        countryCode: string
    }
    profiles: {
        network: string
        username?: string
        url: string
    }[]
}

export interface ResumeWork {
    name: string
    position: string
    url: string | null
    startDate: string
    endDate?: string
    summary: string
    highlights: string[]
    keywords: string[]
}

export interface ResumeEducation {
    institution: string
    url: string
    area: string
    studyType: string
    startDate: string
    endDate: string
    summary?: string
}

export interface ResumePublication {
    name: string
    publisher: string
    releaseDate: string
    url?: string
}

export interface ResumeSkill {
    name: string
    keywords: string[]
}

export interface ResumeProject {
    name: string
    description: string
    url?: string
    keywords: string[]
}

export interface ResumeLanguage {
    language: string
    fluency: string
}

export interface ResumeAward {
    title: string
    date: string
    awarder: string
    summary: string
}

export interface ResumeCertificate {
    name: string
    issuer: string
    date: string
    summary?: string
}

export interface Resume {
    basics: ResumeBasics
    work: ResumeWork[]
    education: ResumeEducation[]
    awards: ResumeAward[]
    certificates: ResumeCertificate[]
    publications: ResumePublication[]
    skills: ResumeSkill[]
    languages: ResumeLanguage[]
    interests: { name: string; keywords: string[] }[]
    projects: ResumeProject[]
}

// add this at the bottom of lib/resume.ts
import resumeData from '../content/resume.json'

export function getResume(): Resume {
    return resumeData as Resume
}