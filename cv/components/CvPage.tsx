'use client'

import { useEffect, useState } from 'react'
import { Resume } from '../lib/resume'
import {
    ExportConfig,
    getDefaultSiteConfig,
    getDefaultPdfConfig,
    parseConfigFromSearch,
    configsToUrl,
    applyConfig,
} from '../lib/exportConfig'
import ThemeToggle from './ThemeToggle'
import DownloadPdfButton from './DownloadPdfButton'
import ExportPanel from './ExportPanel'
import Header from './Header'
import WorkExperience from './WorkExperience'
import Education from './Education'
import Publications from './Publications'
import Recognition from './Recognition'
import Skills from './Skills'
import Projects from './Projects'
import Languages from './Languages'
import PrintResume from './print/PrintResume'

export default function CvPage({ resume }: { resume: Resume }) {
    const defaultSite = getDefaultSiteConfig()
    const defaultPdf = getDefaultPdfConfig(resume)

    const [siteConfig, setSiteConfig] = useState<ExportConfig>(defaultSite)
    const [pdfConfig, setPdfConfig] = useState<ExportConfig>(defaultPdf)

    useEffect(() => {
        setSiteConfig(parseConfigFromSearch(window.location.search, 'cfg', defaultSite))
        setPdfConfig(parseConfigFromSearch(window.location.search, 'pdfCfg', defaultPdf))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function syncUrl(nextSite: ExportConfig, nextPdf: ExportConfig) {
        window.history.replaceState(null, '', configsToUrl(nextSite, nextPdf, defaultSite, defaultPdf))
    }

    function updateSiteConfig(next: ExportConfig) {
        setSiteConfig(next)
        syncUrl(next, pdfConfig)
    }

    function updatePdfConfig(next: ExportConfig) {
        setPdfConfig(next)
        syncUrl(siteConfig, next)
    }

    const siteFiltered = applyConfig(resume, siteConfig)
    const pdfFiltered = applyConfig(resume, pdfConfig)

    return (
        <>
            <main className="screen-only" style={{ maxWidth: '760px', margin: '0 auto', padding: '48px 24px 96px' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginBottom: '48px', flexWrap: 'wrap' }}>
                    <ExportPanel
                        resume={resume}
                        siteConfig={siteConfig}
                        pdfConfig={pdfConfig}
                        defaultSiteConfig={defaultSite}
                        defaultPdfConfig={defaultPdf}
                        onChangeSite={updateSiteConfig}
                        onChangePdf={updatePdfConfig}
                    />
                    <DownloadPdfButton />
                    <ThemeToggle />
                </div>

                <Header basics={siteFiltered.basics} />
                {siteFiltered.work.length > 0 && <WorkExperience work={siteFiltered.work} />}
                {siteFiltered.education.length > 0 && <Education education={siteFiltered.education} />}
                {siteFiltered.publications.length > 0 && <Publications publications={siteFiltered.publications} />}
                {(siteFiltered.awards.length > 0 || siteFiltered.certificates.length > 0) && (
                    <Recognition awards={siteFiltered.awards} certificates={siteFiltered.certificates} />
                )}
                {siteFiltered.skills.length > 0 && <Skills skills={siteFiltered.skills} />}
                {siteFiltered.projects.length > 0 && <Projects projects={siteFiltered.projects} />}
                {siteFiltered.languages.length > 0 && <Languages languages={siteFiltered.languages} />}
            </main>

            <PrintResume resume={pdfFiltered} />
        </>
    )
}
