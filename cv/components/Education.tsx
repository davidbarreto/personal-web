'use client'

import { ResumeEducation } from '../lib/resume'
import Section from './ui/Section'

interface Props {
    education: ResumeEducation[]
}

export default function Education({ education }: Props) {
    return (
        <Section title="Education">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {education.map((entry) => (
                    <div key={entry.institution} style={{
                        padding: '18px 22px',
                        borderRadius: '10px',
                        border: '1px solid var(--border)',
                        background: 'var(--card-bg)',
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <span style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text-primary)' }}>
                                    {entry.studyType}
                                </span>
                                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '3px' }}>
                                    {entry.area} ·{' '}
                                    <a href={entry.url}
                                        style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}
                                        onMouseEnter={e => ((e.target as HTMLElement).style.color = 'var(--text-primary)')}
                                        onMouseLeave={e => ((e.target as HTMLElement).style.color = 'var(--text-secondary)')}
                                    >
                                        {entry.institution}
                                    </a>
                                </p>
                            </div>
                            <span style={{
                                fontSize: '11px',
                                color: 'var(--text-muted)',
                                fontFamily: 'monospace',
                                whiteSpace: 'nowrap',
                                marginLeft: '16px',
                            }}>
                                {entry.startDate.slice(0, 4)} — {entry.endDate.slice(0, 4)}
                            </span>
                        </div>
                        {
                            entry.summary && (
                                <p style={{ marginTop: '10px', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                    {entry.summary}
                                </p>
                            )
                        }
                        {
                            entry.thesisUrl && (
                                <a
                                    href={entry.thesisUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'inline-block',
                                        marginTop: '8px',
                                        fontSize: '11px',
                                        fontFamily: 'monospace',
                                        color: 'var(--accent)',
                                    }}
                                >
                                    Read thesis →
                                </a>
                            )
                        }
                    </div>
                ))}
            </div>
        </Section>
    )
}