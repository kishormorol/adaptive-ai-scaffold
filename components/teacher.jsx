// Teacher dashboard — overview → detail

import { useState } from 'react';
import { Icon, FigCaption, MiniBar } from './primitives';
import { CLASS_ROSTER, CLASS_AI_BREAKDOWN, ASSIGNMENT } from './data';
import TraceScreen from './trace';

export default function TeacherScreen({ setScreen }) {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? CLASS_ROSTER :
    filter === 'overreliant' ? CLASS_ROSTER.filter(s => s.profile === 'overreliant') :
    filter === 'flagged' ? CLASS_ROSTER.filter(s => s.lastResort) :
    CLASS_ROSTER.filter(s => s.status === 'in-progress');

  const totalAI = CLASS_AI_BREAKDOWN.reduce((a, b) => a + b.count, 0);
  const maxWords = Math.max(...CLASS_ROSTER.map(s => s.initialWords));
  const maxAI = Math.max(...CLASS_ROSTER.map(s => s.aiCalls));

  if (selected) {
    return <StudentDetail student={selected} onBack={() => setSelected(null)} />;
  }

  return (
    <div style={{ padding: '32px 40px 60px', maxWidth: 1400, margin: '0 auto', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 22 }}>
        <div>
          <div className="mono" style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: 6 }}>
            Instructor view · {ASSIGNMENT.course} · {ASSIGNMENT.week}
          </div>
          <h2 className="serif" style={{ fontSize: 28, fontWeight: 600, margin: 0, letterSpacing: '-0.01em' }}>
            {ASSIGNMENT.title}
          </h2>
        </div>
        <div className="mono" style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>
          {CLASS_ROSTER.filter(s => s.status === 'complete').length}/{CLASS_ROSTER.length} submitted
        </div>
      </div>

      {/* Summary figures */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.3fr', gap: 18, marginBottom: 28 }}>
        <StatBlock
          tag="FIG 1 · Initial reasoning"
          caption="Words written before first AI call"
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 12 }}>
            <div className="serif" style={{ fontSize: 36, fontWeight: 600, letterSpacing: '-0.02em' }}>
              {Math.round(CLASS_ROSTER.reduce((a, s) => a + s.initialWords, 0) / CLASS_ROSTER.length)}
            </div>
            <div className="muted text-sm">median</div>
          </div>
          <Histogram data={CLASS_ROSTER.map(s => s.initialWords)} buckets={6} color="var(--accent-3)" />
          <div className="mono muted-2" style={{ fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 6, display: 'flex', justifyContent: 'space-between' }}>
            <span>0 words</span><span>150+ words</span>
          </div>
        </StatBlock>

        <StatBlock
          tag="FIG 2 · Flags"
          caption="Students who used last-resort help"
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 14 }}>
            <div className="serif" style={{ fontSize: 36, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--warn)' }}>
              {CLASS_ROSTER.filter(s => s.lastResort).length}
            </div>
            <div className="muted text-sm">of {CLASS_ROSTER.length}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {CLASS_ROSTER.filter(s => s.lastResort).map(s => (
              <button
                key={s.id}
                onClick={() => setSelected(s)}
                style={{
                  display: 'flex', justifyContent: 'space-between',
                  padding: '4px 8px', border: '0.5px solid rgba(166,63,31,0.35)',
                  background: 'rgba(166,63,31,0.04)', borderRadius: 2, cursor: 'pointer',
                  fontFamily: 'inherit', textAlign: 'left', color: 'inherit',
                }}
              >
                <span className="serif text-sm">{s.name}</span>
                <span className="mono muted" style={{ fontSize: 10 }}>{s.aiCalls} AI · {s.initialWords} w</span>
              </button>
            ))}
          </div>
        </StatBlock>

        <StatBlock
          tag="FIG 3 · AI usage breakdown"
          caption={`${totalAI} total interactions across the class`}
        >
          <div style={{ display: 'flex', width: '100%', height: 18, marginBottom: 14, border: '0.5px solid var(--rule)' }}>
            {CLASS_AI_BREAKDOWN.map((b, i) => (
              <div
                key={b.kind}
                style={{
                  width: `${(b.count / totalAI) * 100}%`,
                  background: b.color,
                  borderRight: i < CLASS_AI_BREAKDOWN.length - 1 ? '0.5px solid var(--page)' : 0,
                }}
                title={`${b.kind}: ${b.count}`}
              />
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
            {CLASS_AI_BREAKDOWN.map(b => (
              <div key={b.kind} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <div style={{ width: 8, height: 8, background: b.color, flex: '0 0 8px' }} />
                <span className="serif text-sm" style={{ flex: 1 }}>{b.kind}</span>
                <span className="mono muted" style={{ fontSize: 11 }}>{b.count}</span>
              </div>
            ))}
          </div>
        </StatBlock>
      </div>

      {/* Roster table */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
          <FigCaption tag="FIG 4 · Roster">
            Click a row to open that student&apos;s trace.
          </FigCaption>
          <div style={{ display: 'flex', gap: 4 }}>
            {[['all', 'All'], ['overreliant', 'Over-reliant'], ['flagged', 'Flagged'], ['in-progress', 'In progress']].map(([v, l]) => (
              <button
                key={v}
                onClick={() => setFilter(v)}
                className="btn btn-sm"
                style={{
                  background: filter === v ? 'var(--ink)' : 'var(--page)',
                  color: filter === v ? 'var(--page)' : 'var(--ink-2)',
                  borderColor: filter === v ? 'var(--ink)' : 'var(--rule)',
                }}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: 'var(--page)', border: '0.5px solid var(--rule)' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '36px 1.6fr 1.4fr 1.4fr 80px 80px 60px',
            gap: 14, padding: '10px 16px',
            borderBottom: '0.5px solid var(--rule)',
            background: 'var(--page-2)',
          }}>
            <span></span>
            <span className="mono" style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>Student</span>
            <span className="mono" style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>Initial reasoning</span>
            <span className="mono" style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>AI calls</span>
            <span className="mono" style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>Cites</span>
            <span className="mono" style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>Flag</span>
            <span></span>
          </div>
          {filtered.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setSelected(s)}
              style={{
                display: 'grid',
                gridTemplateColumns: '36px 1.6fr 1.4fr 1.4fr 80px 80px 60px',
                gap: 14, padding: '12px 16px', alignItems: 'center',
                borderBottom: i === filtered.length - 1 ? 0 : '0.5px solid var(--rule-2)',
                background: 'transparent', cursor: 'pointer', textAlign: 'left',
                width: '100%', border: 'none', fontFamily: 'inherit', color: 'inherit',
                transition: 'background 0.12s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--page-2)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{
                width: 28, height: 28, borderRadius: 2,
                border: '0.5px solid var(--ink-2)',
                display: 'grid', placeItems: 'center',
                fontFamily: 'var(--mono)', fontSize: 10, fontWeight: 600, letterSpacing: '0.05em',
                color: 'var(--ink-2)', background: 'var(--page-2)',
              }}>{s.init}</div>
              <div>
                <div className="serif" style={{ fontSize: 14, fontWeight: 500 }}>{s.name}</div>
                <div className="mono muted-2" style={{ fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  {s.status === 'in-progress' ? '• in progress' : 'submitted'}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ flex: 1 }}>
                  <MiniBar value={s.initialWords} max={maxWords} color={s.initialWords < 30 ? 'var(--warn)' : 'var(--accent-3)'} />
                </div>
                <span className="mono" style={{ fontSize: 11, color: s.initialWords < 30 ? 'var(--warn)' : 'var(--ink-2)', minWidth: 28, textAlign: 'right' }}>
                  {s.initialWords}w
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ flex: 1 }}>
                  <MiniBar value={s.aiCalls} max={maxAI} color={s.aiCalls > 5 ? 'var(--warn)' : 'var(--ai)'} />
                </div>
                <span className="mono" style={{ fontSize: 11, color: s.aiCalls > 5 ? 'var(--warn)' : 'var(--ink-2)', minWidth: 28, textAlign: 'right' }}>
                  {s.aiCalls}×
                </span>
              </div>
              <span className="mono" style={{ fontSize: 11, color: s.cites < 2 ? 'var(--warn)' : 'var(--ink-2)' }}>
                {s.cites}
              </span>
              <span>
                {s.lastResort
                  ? <span className="chip chip-warn">flagged</span>
                  : s.profile === 'strong'
                  ? <span className="chip chip-source">strong</span>
                  : <span className="muted-2 mono" style={{ fontSize: 10 }}>—</span>}
              </span>
              <Icon.ChevronRight size={14} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function StudentDetail({ student, onBack }) {
  return (
    <div style={{ padding: '32px 40px 60px', maxWidth: 1400, margin: '0 auto', width: '100%' }}>
      <button className="btn btn-ghost" onClick={onBack} style={{ marginBottom: 16 }}>
        <Icon.ArrowLeft size={12} /> Roster
      </button>

      <div style={{ display: 'flex', gap: 20, alignItems: 'center', marginBottom: 24, paddingBottom: 18, borderBottom: '0.5px solid var(--rule)' }}>
        <div style={{
          width: 56, height: 56, borderRadius: 2,
          border: '0.5px solid var(--ink-2)',
          display: 'grid', placeItems: 'center',
          fontFamily: 'var(--mono)', fontSize: 18, fontWeight: 600, letterSpacing: '0.05em',
          color: 'var(--ink)', background: 'var(--page-2)',
        }}>{student.init}</div>
        <div>
          <div className="mono" style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: 4 }}>
            Student · profile: {student.profile}
          </div>
          <h2 className="serif" style={{ fontSize: 26, fontWeight: 600, margin: 0 }}>{student.name}</h2>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 16 }}>
          <Metric label="Initial" value={`${student.initialWords}w`} warn={student.initialWords < 30} />
          <Metric label="AI calls" value={`${student.aiCalls}×`} warn={student.aiCalls > 5} />
          <Metric label="Citations" value={student.cites} warn={student.cites < 2} />
          <Metric label="Flag" value={student.lastResort ? 'last-resort' : '—'} warn={student.lastResort} />
        </div>
      </div>

      {/* Key moments — instructor-oriented interpretations */}
      <div style={{ marginBottom: 22 }}>
        <FigCaption tag="FIG 5 · Key moments">
          Auto-surfaced from this student&apos;s trace — the three things worth looking at.
        </FigCaption>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {buildKeyMoments(student).map((m, i) => (
            <div key={i} style={{
              background: 'var(--page)', border: '0.5px solid ' + (m.tone === 'warn' ? 'rgba(166,63,31,0.4)' : m.tone === 'good' ? 'rgba(43,74,51,0.4)' : 'var(--rule)'),
              padding: '14px 16px', borderRadius: 2, position: 'relative',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                <span className="mono" style={{
                  fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase',
                  color: m.tone === 'warn' ? 'var(--warn)' : m.tone === 'good' ? 'var(--accent-2)' : 'var(--ink-3)',
                }}>
                  {m.tag}
                </span>
                <span className="mono muted-2" style={{ fontSize: 9, marginLeft: 'auto' }}>{m.at}</span>
              </div>
              <div className="serif" style={{ fontSize: 13.5, fontWeight: 600, lineHeight: 1.4, marginBottom: 4 }}>{m.headline}</div>
              <div className="serif muted" style={{ fontSize: 12, lineHeight: 1.5 }}>{m.body}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Reuse trace pane */}
      <TraceScreen setScreen={() => onBack()} embedded />
    </div>
  );
}

function Metric({ label, value, warn }) {
  return (
    <div style={{ textAlign: 'right' }}>
      <div className="mono" style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>{label}</div>
      <div className="serif" style={{ fontSize: 20, fontWeight: 600, color: warn ? 'var(--warn)' : 'var(--ink)' }}>{value}</div>
    </div>
  );
}

function StatBlock({ tag, caption, children }) {
  return (
    <div style={{ background: 'var(--page)', border: '0.5px solid var(--rule)', padding: '18px 20px 16px', borderRadius: 2, position: 'relative' }}>
      <span className="fig-tag" style={{ position: 'absolute', top: -8, left: 14, background: 'var(--paper)', padding: '0 8px' }}>
        {tag}
      </span>
      <div className="muted text-xs serif" style={{ fontStyle: 'italic', marginBottom: 12, marginTop: 4 }}>{caption}</div>
      {children}
    </div>
  );
}

function Histogram({ data, buckets = 6, color }) {
  const max = Math.max(...data);
  const bucketSize = Math.ceil(max / buckets) || 1;
  const counts = Array(buckets).fill(0);
  data.forEach(v => {
    const idx = Math.min(buckets - 1, Math.floor(v / bucketSize));
    counts[idx]++;
  });
  const maxCount = Math.max(...counts);
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 52 }}>
      {counts.map((c, i) => (
        <div key={i} style={{
          flex: 1,
          height: `${(c / maxCount) * 100}%`,
          minHeight: c > 0 ? 4 : 1,
          background: color,
          opacity: 0.3 + (c / maxCount) * 0.7,
        }} />
      ))}
    </div>
  );
}

// Instructor-facing interpretation of a student's trace — the "so what".
function buildKeyMoments(s) {
  if (s.lastResort) {
    return [
      { tag: 'Flag', tone: 'warn', at: '9:14 PM', headline: 'Used last-resort help',
        body: 'Asked for full answer after only ' + s.initialWords + ' words of their own. Reflection was short.' },
      { tag: 'Signal', tone: 'warn', at: 'Overall', headline: 'Low independent reasoning',
        body: 'Initial writing was brief and the first AI call came quickly after opening the draft.' },
      { tag: 'Next', tone: 'neutral', at: '—', headline: 'Suggested follow-up',
        body: 'Ask in office hours what the second mechanism is — the full answer gave it but reflection did not.' },
    ];
  }
  if (s.profile === 'strong') {
    return [
      { tag: 'Strength', tone: 'good', at: '7:49 PM', headline: 'Asked for a hint first',
        body: 'Started with a Hint (tier 1) rather than Outline — kept the thinking on their side.' },
      { tag: 'Strength', tone: 'good', at: '9:06 PM', headline: 'Used AI for structure, not prose',
        body: 'Requested an outline after drafting one mechanism in their own words. Added a second, cited it.' },
      { tag: 'Next', tone: 'neutral', at: '—', headline: 'Suggested follow-up',
        body: s.cites < 3 ? 'Push on the boundary-condition citation — they hinted but did not cite Cepeda.' : 'Consider a harder prompt next week.' },
    ];
  }
  if (s.profile === 'overreliant') {
    return [
      { tag: 'Signal', tone: 'warn', at: 'Early', headline: 'Low pre-AI reasoning',
        body: 'Opened AI with ' + s.initialWords + ' words written. Reflection was minimal.' },
      { tag: 'Signal', tone: 'warn', at: 'Session', headline: 'Heavy AI use',
        body: s.aiCalls + ' AI calls across the session, skewed toward Outline and Critique.' },
      { tag: 'Next', tone: 'neutral', at: '—', headline: 'Suggested follow-up',
        body: 'Worth a conversation — assignment may need to be rewritten from scratch without AI.' },
    ];
  }
  return [
    { tag: 'Signal', tone: 'neutral', at: 'Early', headline: 'Balanced early session',
      body: 'Wrote ' + s.initialWords + ' words before opening AI — above class median.' },
    { tag: 'Signal', tone: 'neutral', at: 'Middle', headline: 'Modest AI use',
      body: s.aiCalls + ' call' + (s.aiCalls === 1 ? '' : 's') + ', mix of hint and critique.' },
    { tag: 'Next', tone: 'neutral', at: '—', headline: 'Suggested follow-up',
      body: 'Looks on track — a citation quality check would push them further.' },
  ];
}
