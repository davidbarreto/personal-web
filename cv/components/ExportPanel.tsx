'use client'

import { useEffect, useRef, useState } from 'react'
import { Resume } from '../lib/resume'
import { ExportConfig, itemId } from '../lib/exportConfig'

interface Props {
    resume: Resume
    siteConfig: ExportConfig
    pdfConfig: ExportConfig
    defaultSiteConfig: ExportConfig
    defaultPdfConfig: ExportConfig
    onChangeSite: (cfg: ExportConfig) => void
    onChangePdf: (cfg: ExportConfig) => void
}

type SectionKey = keyof ExportConfig
type Target = 'site' | 'pdf'

interface SectionDef {
    key: SectionKey
    title: string
    items: { id: string; label: string }[]
}

export default function ExportPanel({
    resume, siteConfig, pdfConfig, defaultSiteConfig, defaultPdfConfig, onChangeSite, onChangePdf,
}: Props) {
    const [open, setOpen] = useState(false)
    const [target, setTarget] = useState<Target>('site')
    const [copied, setCopied] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function onDocClick(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
        }
        if (open) document.addEventListener('mousedown', onDocClick)
        return () => document.removeEventListener('mousedown', onDocClick)
    }, [open])

    const config = target === 'site' ? siteConfig : pdfConfig
    const onChange = target === 'site' ? onChangeSite : onChangePdf
    const defaultConfig = target === 'site' ? defaultSiteConfig : defaultPdfConfig

    const sections: SectionDef[] = [
        { key: 'hiddenProfiles', title: 'Contact links', items: resume.basics.profiles.map(p => ({ id: itemId.profiles(p), label: p.network })) },
        { key: 'hiddenWork', title: 'Experience', items: resume.work.map(j => ({ id: itemId.work(j), label: `${j.position} — ${j.name}` })) },
        { key: 'hiddenEducation', title: 'Education', items: resume.education.map(e => ({ id: itemId.education(e), label: e.studyType })) },
        { key: 'hiddenSkills', title: 'Skills', items: resume.skills.map(s => ({ id: itemId.skills(s), label: s.name })) },
        { key: 'hiddenPublications', title: 'Publications', items: resume.publications.map(p => ({ id: itemId.publications(p), label: p.name })) },
        { key: 'hiddenProjects', title: 'Projects', items: resume.projects.map(p => ({ id: itemId.projects(p), label: p.name })) },
        { key: 'hiddenLanguages', title: 'Languages', items: resume.languages.map(l => ({ id: itemId.languages(l), label: l.language })) },
    ]

    function toggleItem(key: SectionKey, id: string) {
        const current = config[key]
        const next = current.includes(id) ? current.filter(x => x !== id) : [...current, id]
        onChange({ ...config, [key]: next })
    }

    function setAll(key: SectionKey, ids: string[], hide: boolean) {
        onChange({ ...config, [key]: hide ? ids : [] })
    }

    async function copyLink() {
        try {
            await navigator.clipboard.writeText(window.location.href)
            setCopied(true)
            setTimeout(() => setCopied(false), 1500)
        } catch {}
    }

    const tabStyle = (active: boolean): React.CSSProperties => ({
        flex: 1,
        padding: '6px 0',
        fontSize: '11px',
        fontFamily: 'monospace',
        letterSpacing: '0.05em',
        textAlign: 'center',
        cursor: 'pointer',
        border: 'none',
        borderRadius: '6px',
        background: active ? 'var(--accent-subtle)' : 'transparent',
        color: active ? 'var(--accent)' : 'var(--text-muted)',
        fontWeight: active ? 700 : 400,
    })

    return (
        <div ref={ref} style={{ position: 'relative' }}>
            <button
                type="button"
                onClick={() => setOpen(o => !o)}
                aria-label="Customize sections"
                style={{
                    padding: '6px 14px',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    background: 'var(--card-bg)',
                    color: 'var(--text-secondary)',
                    fontSize: '12px',
                    cursor: 'pointer',
                    fontFamily: 'monospace',
                    letterSpacing: '0.05em',
                }}
            >
                ⚙ Customize
            </button>

            {open && (
                <div style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    right: 0,
                    width: '320px',
                    maxHeight: '75vh',
                    overflowY: 'auto',
                    background: 'var(--card-bg)',
                    border: '1px solid var(--border)',
                    borderRadius: '10px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                    padding: '16px',
                    zIndex: 20,
                    textAlign: 'left',
                }}>
                    <div style={{ display: 'flex', gap: '4px', background: 'var(--bg)', borderRadius: '8px', padding: '3px', marginBottom: '12px' }}>
                        <button type="button" style={tabStyle(target === 'site')} onClick={() => setTarget('site')}>Site</button>
                        <button type="button" style={tabStyle(target === 'pdf')} onClick={() => setTarget('pdf')}>PDF export</button>
                    </div>

                    <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '14px', lineHeight: 1.5 }}>
                        {target === 'site'
                            ? 'Uncheck what to leave off the live page. The link updates as you go — copy it to save this version.'
                            : 'Uncheck what to leave out of the PDF download. Independent from the site — copy the link to save this version.'}
                    </p>

                    {sections.map(section => {
                        const hidden = config[section.key]
                        const allIds = section.items.map(i => i.id)
                        const allHidden = allIds.length > 0 && allIds.every(id => hidden.includes(id))
                        return (
                            <div key={section.key} style={{ marginBottom: '14px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                                    <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--accent)' }}>
                                        {section.title}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => setAll(section.key, allIds, !allHidden)}
                                        style={{
                                            background: 'none', border: 'none', cursor: 'pointer',
                                            fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'monospace',
                                            textDecoration: 'underline',
                                        }}
                                    >
                                        {allHidden ? 'show all' : 'hide all'}
                                    </button>
                                </div>
                                {section.items.map(item => (
                                    <label key={item.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12px', color: 'var(--text-secondary)', padding: '3px 0', cursor: 'pointer' }}>
                                        <input
                                            type="checkbox"
                                            checked={!hidden.includes(item.id)}
                                            onChange={() => toggleItem(section.key, item.id)}
                                            style={{ marginTop: '3px' }}
                                        />
                                        {item.label}
                                    </label>
                                ))}
                            </div>
                        )
                    })}

                    <div style={{ display: 'flex', gap: '8px', marginTop: '10px', paddingTop: '12px', borderTop: '1px solid var(--border)' }}>
                        <button
                            type="button"
                            onClick={() => onChange(defaultConfig)}
                            style={{ flex: 1, fontSize: '11px', padding: '6px 10px', borderRadius: '6px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer', fontFamily: 'monospace' }}
                        >
                            Reset
                        </button>
                        <button
                            type="button"
                            onClick={copyLink}
                            style={{ flex: 1, fontSize: '11px', padding: '6px 10px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--accent-subtle)', color: 'var(--accent)', cursor: 'pointer', fontFamily: 'monospace' }}
                        >
                            {copied ? 'Copied!' : 'Copy link'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
