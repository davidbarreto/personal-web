import { Resume } from '../../lib/resume'

function formatMonthYear(dateStr: string): string {
    const [year, month] = dateStr.split('-')
    const date = new Date(Number(year), Number(month) - 1)
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

function displayUrl(url: string): string {
    return url.replace(/^https?:\/\//, '').replace(/\/$/, '')
}

const styles = {
    page: { fontFamily: 'Georgia, "Times New Roman", serif', color: '#111', fontSize: '10.5pt', lineHeight: 1.45 },
    name: { fontSize: '26pt', fontWeight: 700, margin: 0, letterSpacing: '-0.01em' },
    label: { fontSize: '12pt', color: '#444', marginTop: '4px' },
    columns: { display: 'flex', gap: '32px', marginTop: '24px', alignItems: 'flex-start' },
    main: { flex: '1 1 auto', minWidth: 0 },
    sidebar: { flex: '0 0 190px' },
    h2: { fontSize: '11pt', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.06em', borderBottom: '1.5px solid #111', paddingBottom: '3px', marginBottom: '10px' },
    h3sidebar: { fontSize: '10pt', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.06em', marginBottom: '6px', marginTop: '18px' },
    jobTitle: { fontSize: '10.5pt', fontWeight: 700, margin: 0 },
    jobMeta: { fontSize: '9.5pt', fontStyle: 'italic', color: '#333', margin: '1px 0 6px' },
    p: { margin: '0 0 8px' },
    ul: { margin: '0 0 8px', paddingLeft: '16px' },
    li: { marginBottom: '3px' },
    link: { color: 'inherit', textDecoration: 'none' },
}

export default function PrintResume({ resume }: { resume: Resume }) {
    const { basics, work, education, skills, languages, publications, projects } = resume

    return (
        <div className="print-only" style={styles.page}>
            <h1 style={styles.name}>{basics.name}</h1>
            <p style={styles.label}>{basics.label}</p>

            <div style={styles.columns}>
                <div style={styles.main}>
                    <section className="print-avoid-break">
                        <h2 style={styles.h2}>Summary</h2>
                        <p style={styles.p}>{basics.summary}</p>
                    </section>

                    {work.length > 0 && (
                    <section style={{ marginTop: '20px' }}>
                        <h2 style={styles.h2}>Experience</h2>
                        {work.map((job, i) => (
                            <div key={i} className="print-avoid-break" style={{ marginBottom: '14px' }}>
                                <p style={styles.jobTitle}>{job.position}</p>
                                <p style={styles.jobMeta}>
                                    {job.name} &nbsp;·&nbsp; {formatMonthYear(job.startDate)} – {job.endDate ? formatMonthYear(job.endDate) : 'Present'}
                                </p>
                                <p style={styles.p}>{job.summary}</p>
                                <ul style={styles.ul}>
                                    {job.highlights.map((h, j) => <li key={j} style={styles.li}>{h}</li>)}
                                </ul>
                            </div>
                        ))}
                    </section>
                    )}

                    {projects.length > 0 && (
                        <section style={{ marginTop: '20px' }}>
                            <h2 style={styles.h2}>Projects</h2>
                            {projects.map((p, i) => (
                                <div key={i} className="print-avoid-break" style={{ marginBottom: '10px' }}>
                                    <p style={styles.jobTitle}>
                                        {p.url ? <a href={p.url} style={styles.link}>{p.name}</a> : p.name}
                                    </p>
                                    <p style={styles.p}>{p.description}</p>
                                </div>
                            ))}
                        </section>
                    )}
                </div>

                <div style={styles.sidebar}>
                    <h2 style={styles.h2}>Contact</h2>
                    <p style={styles.p}>
                        <strong>Email</strong><br />
                        <a href={`mailto:${basics.email}`} style={styles.link}>{basics.email}</a>
                    </p>
                    <p style={styles.p}>
                        <strong>Location</strong><br />{basics.location.city}, {basics.location.region}, {basics.location.countryCode}
                    </p>
                    {basics.profiles.map(p => (
                        <p key={p.network} style={{ ...styles.p, wordBreak: 'break-word' }}>
                            <strong>{p.network}</strong><br />
                            <a href={p.url} style={styles.link}>{displayUrl(p.url)}</a>
                        </p>
                    ))}

                    {skills.length > 0 && (
                        <>
                            <h3 style={styles.h3sidebar}>Skills</h3>
                            {skills.map(s => (
                                <p key={s.name} style={styles.p}>
                                    <strong>{s.name}</strong><br />{s.keywords.join(', ')}
                                </p>
                            ))}
                        </>
                    )}

                    {education.length > 0 && (
                        <>
                            <h3 style={styles.h3sidebar}>Education</h3>
                            {education.map((e, i) => (
                                <p key={i} style={styles.p}>
                                    <strong>{e.studyType}</strong><br />
                                    {e.area}<br />
                                    {e.institution} &middot; {e.endDate.slice(0, 4)}
                                </p>
                            ))}
                        </>
                    )}

                    {publications.length > 0 && (
                        <>
                            <h3 style={styles.h3sidebar}>Publications</h3>
                            {publications.map((p, i) => (
                                <p key={i} style={{ ...styles.p, fontSize: '9pt' }}>
                                    {p.url ? <a href={p.url} style={styles.link}>{p.name}</a> : p.name}<br />
                                    <span style={{ color: '#555' }}>{p.publisher}, {p.releaseDate.slice(0, 4)}</span>
                                </p>
                            ))}
                        </>
                    )}

                    {languages.length > 0 && (
                        <>
                            <h3 style={styles.h3sidebar}>Languages</h3>
                            {languages.map(l => (
                                <p key={l.language} style={{ ...styles.p, marginBottom: '4px' }}>
                                    {l.language} <span style={{ color: '#555' }}>— {l.fluency}</span>
                                </p>
                            ))}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
