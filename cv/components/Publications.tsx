import { ResumePublication } from '../lib/resume'
import Section from './ui/Section'

interface Props {
    publications: ResumePublication[]
}

export default function Publications({ publications }: Props) {
    if (!publications.length) return null

    return (
        <Section title="Publications">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {publications.map((pub, i) => (
                    <div key={i} style={{
                        padding: '14px 20px',
                        borderRadius: '10px',
                        border: '1px solid var(--border)',
                        background: 'var(--card-bg)',
                    }}>
                        <a
                            href={pub.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                fontSize: '13px',
                                fontWeight: 600,
                                color: 'var(--text-primary)',
                                textDecoration: 'none',
                            }}
                        >
                            {pub.name}
                        </a>
                        <p style={{
                            fontSize: '11px',
                            color: 'var(--text-muted)',
                            fontFamily: 'monospace',
                            marginTop: '4px',
                        }}>
                            {pub.publisher} · {pub.releaseDate.slice(0, 4)}
                        </p>
                    </div>
                ))}
            </div>
        </Section>
    )
}
