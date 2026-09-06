'use client'

import { useState } from 'react'
import { Mail } from 'lucide-react'
import { BrandIcons } from '../lib/icons'
import CircleIcon from './ui/CircleIcon'
import SpeechBubbleToggle from './ui/SpeechBubbleToggle'
import { ResumeBasics } from '../lib/resume'

interface Props {
    basics: ResumeBasics
}

export default function Header({ basics }: Props) {
    const [summaryOpen, setSummaryOpen] = useState(true)

    return (
        <header>
            {/* Name + photo */}
            <div className="flex flex-col-reverse sm:flex-row items-center sm:items-start justify-between gap-6 sm:gap-12">
                <div className="flex-1 w-full text-center sm:text-left">
                    <h1 style={{
                        fontSize: '34px',
                        fontWeight: 700,
                        letterSpacing: '-0.03em',
                        color: 'var(--text-primary)',
                        margin: 0,
                        lineHeight: 1.1,
                    }}>
                        {basics.name}
                    </h1>

                    <p style={{
                        margin: 0,
                        marginTop: '8px',
                        fontSize: '13px',
                        color: 'var(--accent)',
                        fontFamily: 'monospace',
                        letterSpacing: '0.06em',
                        fontWeight: 500,
                    }}>
                        {basics.label}
                    </p>

                    <p style={{
                        marginTop: '3px',
                        fontSize: '11px',
                        color: 'var(--text-muted)',
                        fontFamily: 'monospace',
                    }}>
                        {basics.location.city}, {basics.location.region} · {basics.location.countryCode}
                    </p>

                    {/* About row */}
                    <div className="flex items-center justify-center sm:justify-start mt-5">
                        <button
                            type="button"
                            onClick={() => setSummaryOpen(o => !o)}
                            className="relative z-10 flex items-center gap-2 bg-transparent border-none p-2 -ml-2 cursor-pointer transition-opacity hover:opacity-80"
                            title={summaryOpen ? "Hide summary" : "Show summary"}
                        >
                            <span style={{
                                fontSize: '11px',
                                fontWeight: 600,
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase',
                                fontFamily: 'monospace',
                                color: summaryOpen ? 'var(--accent)' : 'var(--text-muted)',
                                transition: 'color 0.2s',
                            }}>
                                about
                            </span>
                            <SpeechBubbleToggle open={summaryOpen} />
                        </button>
                    </div>

                    {/* Summary */}
                    <div 
                        className="overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out"
                        style={{
                            maxHeight: summaryOpen ? '1000px' : '0',
                            opacity: summaryOpen ? 1 : 0,
                        }}
                    >
                        <p 
                            className="mx-auto sm:mx-0 text-justify"
                            style={{
                                marginTop: '10px',
                                fontSize: '14px',
                                lineHeight: 1.75,
                                color: 'var(--text-secondary)',
                                maxWidth: '520px',
                            }}
                        >
                            {basics.summary}
                        </p>
                    </div>

                    {/* Social links */}
                    <div className="relative z-10 flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-5">
                        <CircleIcon href={`mailto:${basics.email}`} label={basics.email}>
                            <Mail size={13} />
                        </CircleIcon>
                        {basics.profiles.map(({ network, url }) => {
                            const Icon = BrandIcons[network]
                            return Icon ? (
                                <CircleIcon key={network} href={url} label={network}>
                                    <Icon />
                                </CircleIcon>
                            ) : null
                        })}
                    </div>
                </div>

                <img
                    src={basics.image}
                    alt={basics.name}
                    className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-2 border-[var(--border)] object-cover shrink-0"
                />
            </div>
        </header>
    )
}