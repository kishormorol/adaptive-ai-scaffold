// Shared primitives + icons

// -------- icons (line, 1.25 stroke, research-paper feel) --------
export const Icon = {
  ArrowRight: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25">
      <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  ArrowLeft: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25">
      <path d="M13 8H3M7 4L3 8l4 4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Spark: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25">
      <path d="M8 2v3M8 11v3M2 8h3M11 8h3M4 4l2 2M10 10l2 2M4 12l2-2M10 6l2-2" strokeLinecap="round"/>
    </svg>
  ),
  Pen: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25">
      <path d="M2 14l3-1 8-8-2-2-8 8-1 3z" strokeLinejoin="round"/>
      <path d="M10 4l2 2" strokeLinecap="round"/>
    </svg>
  ),
  Eye: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25">
      <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z"/>
      <circle cx="8" cy="8" r="2"/>
    </svg>
  ),
  Book: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25">
      <path d="M3 2h5a2 2 0 012 2v10a1 1 0 00-1-1H3V2zM13 2H8.5c.5 0 2 .5 2 2v10a1 1 0 011-1H13V2z"/>
    </svg>
  ),
  Clock: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25">
      <circle cx="8" cy="8" r="6"/>
      <path d="M8 5v3l2 2" strokeLinecap="round"/>
    </svg>
  ),
  Users: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25">
      <circle cx="6" cy="6" r="2.5"/>
      <circle cx="11" cy="7" r="2"/>
      <path d="M2 13c0-2 2-3.5 4-3.5s4 1.5 4 3.5M10 13c0-1.5 1-2.5 2.5-2.5s2 1 2 2.5"/>
    </svg>
  ),
  Dot: ({ size = 14, filled = true }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.25">
      <circle cx="8" cy="8" r="3"/>
    </svg>
  ),
  Check: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 8l3 3 7-7" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Warn: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25">
      <path d="M8 2l6.5 11h-13L8 2z" strokeLinejoin="round"/>
      <path d="M8 6.5v3M8 11.5v.1" strokeLinecap="round"/>
    </svg>
  ),
  X: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25">
      <path d="M4 4l8 8M12 4l-8 8" strokeLinecap="round"/>
    </svg>
  ),
  Quote: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor">
      <path d="M3 5h3v3H4v2H3V5zm7 0h3v3h-2v2h-1V5z"/>
    </svg>
  ),
  Sparkles: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25">
      <path d="M6 2l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z" strokeLinejoin="round"/>
      <path d="M12 9l.7 1.8L14.5 11.5l-1.8.7L12 14l-.7-1.8L9.5 11.5l1.8-.7L12 9z" strokeLinejoin="round"/>
    </svg>
  ),
  Lightbulb: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25">
      <path d="M5 10c-1-1-1.5-2-1.5-3.5A4.5 4.5 0 018 2a4.5 4.5 0 014.5 4.5c0 1.5-.5 2.5-1.5 3.5-.5.5-1 1-1 1.5v.5h-5v-.5c0-.5-.5-1-1-1.5zM6 13h4M6.5 14.5h3" strokeLinecap="round"/>
    </svg>
  ),
  Scale: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25">
      <path d="M8 2v12M3 5h10M3 5l-1.5 4h3L3 5zM13 5l-1.5 4h3L13 5zM5.5 13.5h5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  List: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25">
      <path d="M4 4h9M4 8h9M4 12h9" strokeLinecap="round"/>
      <circle cx="2" cy="4" r="0.5" fill="currentColor"/>
      <circle cx="2" cy="8" r="0.5" fill="currentColor"/>
      <circle cx="2" cy="12" r="0.5" fill="currentColor"/>
    </svg>
  ),
  Compass: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25">
      <circle cx="8" cy="8" r="6"/>
      <path d="M10.5 5.5L9 9l-3.5 1.5L7 7l3.5-1.5z" strokeLinejoin="round"/>
    </svg>
  ),
  File: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25">
      <path d="M4 2h5l3 3v9H4V2z"/>
      <path d="M9 2v3h3"/>
    </svg>
  ),
  Diff: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25">
      <rect x="2" y="3" width="5" height="10"/>
      <rect x="9" y="3" width="5" height="10"/>
      <path d="M4 6h1M4 8h1.5M11 6h1.5M11 8h2M11 10h1"/>
    </svg>
  ),
  ChevronRight: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25">
      <path d="M6 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  ChevronDown: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25">
      <path d="M3 6l5 5 5-5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Log: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25">
      <rect x="2.5" y="2.5" width="11" height="11"/>
      <path d="M5 6h6M5 8h6M5 10h4"/>
    </svg>
  ),
};

// -------- Topbar --------
export function TopBar({ screen, setScreen, gate, setGate, onOpenTweaks }) {
  return (
    <div className="topbar">
      <div className="topbar-brand">
        <h1>Adaptive AI Scaffold</h1>
        <span className="sub">· research prototype · v0.3.1</span>
      </div>
      <div className="topbar-nav">
        <button className={screen === 'write' ? 'active' : ''} onClick={() => setScreen('write')}>Write</button>
        <button className={screen === 'trace' ? 'active' : ''} onClick={() => setScreen('trace')}>Trace</button>
        <button className={screen === 'teacher' ? 'active' : ''} onClick={() => setScreen('teacher')}>Instructor</button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div className="mono" style={{ fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: 0, background: 'var(--accent)', marginRight: 6, animation: 'pulse 2s infinite' }}/>
          Logging active
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          fontFamily: 'var(--mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink-3)',
          padding: '4px 8px', border: '0.5px solid var(--rule)', borderRadius: 2, background: 'var(--page)'
        }}>
          <span>gate</span>
          <select
            value={gate} onChange={e => setGate(e.target.value)}
            style={{
              fontFamily: 'var(--mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em',
              background: 'transparent', border: 0, color: 'var(--ink)', cursor: 'pointer', outline: 'none'
            }}
          >
            <option value="soft">soft</option>
            <option value="medium">medium</option>
            <option value="hard">hard</option>
          </select>
        </div>
        {onOpenTweaks && (
          <button
            onClick={onOpenTweaks}
            className="btn btn-ghost btn-sm"
            style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase' }}
          >
            § tweaks
          </button>
        )}
      </div>
    </div>
  );
}

// -------- Figure caption --------
export function FigCaption({ tag, children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 14, paddingBottom: 10, borderBottom: '0.5px solid var(--rule)' }}>
      <span className="fig-tag">{tag}</span>
      <span className="serif" style={{ fontSize: 13, color: 'var(--ink-2)', fontStyle: 'italic' }}>{children}</span>
    </div>
  );
}

// -------- Highlighted source snippet --------
export function SourceSnippet({ source, snippet, highlighted }) {
  return (
    <div style={{
      padding: '10px 12px',
      borderLeft: `2px solid ${highlighted ? 'var(--accent)' : 'var(--rule)'}`,
      background: highlighted ? 'rgba(156,63,42,0.04)' : 'transparent',
      transition: 'all 0.3s',
      marginBottom: 10,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
        <span className="mono" style={{ fontSize: 10, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
          {source.short} · {snippet.page}
        </span>
        {highlighted && <span className="chip chip-source" style={{ fontSize: 9 }}>cited</span>}
      </div>
      <p className="serif" style={{ margin: 0, fontSize: 13, lineHeight: 1.5, color: 'var(--ink-2)' }}>
        &ldquo;{snippet.quote}&rdquo;
      </p>
    </div>
  );
}

// -------- small spark / bar --------
export function MiniBar({ value, max, color = 'var(--ink)' }) {
  return (
    <div style={{ width: '100%', height: 3, background: 'var(--rule-2)' }}>
      <div style={{ width: `${(value / max) * 100}%`, height: '100%', background: color }} />
    </div>
  );
}
