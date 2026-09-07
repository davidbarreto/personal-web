'use client'

export default function DownloadPdfButton() {
    return (
        <button
            type="button"
            onClick={() => window.print()}
            aria-label="Download as PDF"
            className="relative z-10"
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
                transition: 'all 0.2s',
            }}
        >
            ↓ PDF
        </button>
    )
}
