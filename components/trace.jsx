// Learning trace — causal, interpretable record.
// Hover any highlighted span -> see which AI event authored it.
// Side panel lists AI actions linked to spans.

import { useState, Fragment } from 'react';
import { Icon, FigCaption } from './primitives';
import { STAGES, CITATIONS, SOURCES } from './data';
import { HELP_KINDS } from './askai';

export default function TraceScreen({ setScreen, embedded }) {
  const [fromIdx, setFromIdx] = useState(0);
  const [toIdx, setToIdx] = useState(2);
  const [showEvents, setShowEvents] = useState(true);
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const stageA = STAGES[fromIdx];
  const stageB = STAGES[toIdx];

  // All AI events across stages (flattened for timeline + side panel)
  const allAiEvents = STAGES.flatMap((s, si) =>
    (s.aiEvents || []).map((ev, ei) => ({ ...ev, stageIdx: si, stageLabel: s.label, _localIdx: ei }))
  );

  return (
    <div style={{ padding: embedded ? 0 : '32px 40px 60px', maxWidth: 1400, margin: '0 auto', width: '100%' }}>
      {!embedded && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 22 }}>
          <div>
            <div className="mono" style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: 6 }}>
              Learning trace · Amara Okafor · COGS 210 · Week 6
            </div>
            <h2 className="serif" style={{ fontSize: 28, fontWeight: 600, margin: 0, letterSpacing: '-0.01em' }}>
              Revision history <span className="muted" style={{ fontStyle: 'italic', fontWeight: 400 }}>— three snapshots, three AI interactions</span>
            </h2>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              className="btn"
              onClick={() => setShowEvents(!showEvents)}
              style={{ borderColor: showEvents ? 'var(--ai)' : 'var(--ink-2)', color: showEvents ? 'var(--ai)' : 'var(--ink)' }}
            >
              <Icon.Sparkles size={12} /> {showEvents ? 'Hide AI marks' : 'Show AI marks'}
            </button>
            <button className="btn" onClick={() => setScreen('write')}>
              <Icon.ArrowLeft size={12} /> Back to draft
            </button>
          </div>
        </div>
      )}

      {/* stage-compare strip */}
      <div style={{ display: 'flex', gap: 0, marginBottom: 22, padding: '18px 22px', background: 'var(--page)', border: '0.5px solid var(--rule)', borderRadius: 2, position: 'relative' }}>
        <span className="fig-tag" style={{ position: 'absolute', top: -8, left: 16, background: 'var(--paper)', padding: '0 8px' }}>
          FIG 1 · COMPARE SNAPSHOTS
        </span>
        {STAGES.map((s, i) => (
          <Fragment key={s.id}>
            <StageNode stage={s} idx={i} isFrom={i === fromIdx} isTo={i === toIdx}
              onSelect={() => { if (i < toIdx) setFromIdx(i); else if (i > fromIdx) setToIdx(i); }}
            />
            {i < STAGES.length - 1 && (
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', padding: '0 10px', position: 'relative' }}>
                <div style={{ flex: 1, height: 1, background: 'var(--rule)', position: 'relative' }}>
                  <div style={{
                    position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)',
                    fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: 'var(--ink-3)', background: 'var(--page)', padding: '0 6px', whiteSpace: 'nowrap',
                  }}>
                    {(STAGES[i+1].aiEvents || []).map(e => e.label).join(' + ')}
                  </div>
                </div>
              </div>
            )}
          </Fragment>
        ))}
      </div>

      {/* AI event timeline — horizontal */}
      <EventTimeline
        events={allAiEvents}
        hoveredEvent={hoveredEvent}
        setHoveredEvent={setHoveredEvent}
        selectedEvent={selectedEvent}
        setSelectedEvent={setSelectedEvent}
      />

      {/* diff + side panel */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 300px', gap: 16, marginTop: 22 }}>
        <DiffPane side="before" stage={stageA} showEvents={false}
          hoveredEvent={hoveredEvent} setHoveredEvent={setHoveredEvent}
          selectedEvent={selectedEvent} setSelectedEvent={setSelectedEvent} />
        <DiffPane side="after" stage={stageB} showEvents={showEvents} withCitations
          hoveredEvent={hoveredEvent} setHoveredEvent={setHoveredEvent}
          selectedEvent={selectedEvent} setSelectedEvent={setSelectedEvent} />
        <ActionsPanel
          events={allAiEvents}
          hoveredEvent={hoveredEvent}
          setHoveredEvent={setHoveredEvent}
          selectedEvent={selectedEvent}
          setSelectedEvent={setSelectedEvent}
        />
      </div>

      {/* source grounding */}
      <div style={{ marginTop: 28 }}>
        <FigCaption tag="FIG 3 · Source grounding">
          Each footnote links to the passage the AI pointed to.
        </FigCaption>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {CITATIONS.map(c => {
            const src = SOURCES.find(s => s.id === c.sourceId);
            const snip = src.snippets.find(s => s.id === c.snippetId);
            return (
              <div key={c.n} style={{ background: 'var(--page)', border: '0.5px solid var(--rule)', padding: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span className="mono" style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)' }}>
                    Footnote [{c.n}]
                  </span>
                  <span className="mono muted-2" style={{ fontSize: 10 }}>{snip.page}</span>
                </div>
                <div className="serif" style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{src.short}</div>
                <div className="muted text-xs serif" style={{ fontStyle: 'italic', marginBottom: 8 }}>{src.title}</div>
                <p className="serif" style={{ margin: 0, fontSize: 12.5, lineHeight: 1.55, color: 'var(--ink-2)', borderLeft: '2px solid var(--accent)', paddingLeft: 10 }}>
                  &ldquo;{snip.quote}&rdquo;
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function EventTimeline({ events, hoveredEvent, setHoveredEvent, selectedEvent, setSelectedEvent }) {
  if (events.length === 0) return null;
  return (
    <div style={{ padding: '14px 20px', background: 'var(--page-2)', border: '0.5px solid var(--rule)', borderRadius: 2, position: 'relative' }}>
      <span className="fig-tag" style={{ position: 'absolute', top: -8, left: 16, background: 'var(--paper)', padding: '0 8px' }}>
        FIG 2 · INTERACTION TIMELINE
      </span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginTop: 2 }}>
        {events.map((ev, i) => {
          const isHover = hoveredEvent && hoveredEvent.stageIdx === ev.stageIdx && hoveredEvent.eventIdx === ev._localIdx;
          const isSel = selectedEvent && selectedEvent.stageIdx === ev.stageIdx && selectedEvent.eventIdx === ev._localIdx;
          const k = HELP_KINDS.find(x => x.id === ev.kind) || HELP_KINDS[0];
          const I = Icon[k.icon];
          return (
            <Fragment key={i}>
              <button
                onMouseEnter={() => setHoveredEvent({ stageIdx: ev.stageIdx, eventIdx: ev._localIdx })}
                onMouseLeave={() => setHoveredEvent(null)}
                onClick={() => setSelectedEvent(isSel ? null : { stageIdx: ev.stageIdx, eventIdx: ev._localIdx })}
                style={{
                  display: 'flex', gap: 8, alignItems: 'center',
                  padding: '8px 12px',
                  border: '0.5px solid ' + (isSel || isHover ? 'var(--ai)' : 'var(--rule)'),
                  background: isSel ? 'rgba(43,74,106,0.08)' : isHover ? 'rgba(43,74,106,0.04)' : 'var(--page)',
                  cursor: 'pointer', borderRadius: 2, fontFamily: 'inherit', color: 'inherit',
                  transition: 'all 0.15s',
                }}
              >
                <I size={12} />
                <div style={{ textAlign: 'left' }}>
                  <div className="serif" style={{ fontSize: 12, fontWeight: 500 }}>{ev.label}</div>
                  <div className="mono muted-2" style={{ fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{ev.at}</div>
                </div>
              </button>
              {i < events.length - 1 && (
                <div style={{ flex: 1, minWidth: 20, display: 'flex', alignItems: 'center', padding: '0 4px' }}>
                  <div style={{ flex: 1, height: 1, background: 'var(--rule)', position: 'relative' }}>
                    <div style={{
                      position: 'absolute', right: 0, top: -3, width: 6, height: 6,
                      borderRight: '1px solid var(--ink-3)', borderTop: '1px solid var(--ink-3)', transform: 'rotate(45deg)',
                    }}/>
                  </div>
                </div>
              )}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}

function ActionsPanel({ events, hoveredEvent, setHoveredEvent, selectedEvent, setSelectedEvent }) {
  return (
    <div style={{ background: 'var(--page)', border: '0.5px solid var(--rule)', padding: '18px 18px', borderRadius: 2, position: 'relative' }}>
      <span className="fig-tag" style={{ position: 'absolute', top: -8, left: 14, background: 'var(--paper)', padding: '0 8px' }}>
        FIG 2b · ACTIONS
      </span>
      <p className="muted text-xs serif" style={{ fontStyle: 'italic', margin: '4px 0 14px' }}>
        Hover to see the span it produced.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {events.map((ev, i) => {
          const isHover = hoveredEvent && hoveredEvent.stageIdx === ev.stageIdx && hoveredEvent.eventIdx === ev._localIdx;
          const isSel = selectedEvent && selectedEvent.stageIdx === ev.stageIdx && selectedEvent.eventIdx === ev._localIdx;
          const k = HELP_KINDS.find(x => x.id === ev.kind) || HELP_KINDS[0];
          const I = Icon[k.icon];
          const danger = k.lastResort;
          return (
            <button
              key={i}
              onMouseEnter={() => setHoveredEvent({ stageIdx: ev.stageIdx, eventIdx: ev._localIdx })}
              onMouseLeave={() => setHoveredEvent(null)}
              onClick={() => setSelectedEvent(isSel ? null : { stageIdx: ev.stageIdx, eventIdx: ev._localIdx })}
              style={{
                textAlign: 'left',
                padding: '10px 12px',
                border: '0.5px solid ' + (isSel ? 'var(--ai)' : isHover ? 'var(--ink-3)' : 'var(--rule)'),
                background: isSel ? 'rgba(43,74,106,0.06)' : isHover ? 'var(--page-2)' : 'transparent',
                borderRadius: 2, cursor: 'pointer', fontFamily: 'inherit', color: 'inherit',
                transition: 'all 0.12s',
              }}
            >
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                <div style={{ color: danger ? 'var(--warn)' : 'var(--ai)' }}><I size={12} /></div>
                <span className="serif" style={{ fontSize: 13, fontWeight: 500 }}>{ev.label}</span>
                <span className="mono muted-2" style={{ fontSize: 9, marginLeft: 'auto', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{ev.at}</span>
              </div>
              {ev.prompt && (
                <div className="serif muted text-xs" style={{ fontStyle: 'italic', marginBottom: 4, lineHeight: 1.45 }}>
                  &ldquo;{ev.prompt}&rdquo;
                </div>
              )}
              <div className="serif" style={{ fontSize: 11.5, color: 'var(--ink-2)', lineHeight: 1.45 }}>
                {ev.note}
              </div>
              {ev.sourceIds && ev.sourceIds.length > 0 && (
                <div style={{ display: 'flex', gap: 4, marginTop: 6, flexWrap: 'wrap' }}>
                  {ev.sourceIds.map(sid => (
                    <span key={sid} className="chip chip-source" style={{ fontSize: 9 }}>{sid}</span>
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StageNode({ stage, idx, isFrom, isTo, onSelect }) {
  const selected = isFrom || isTo;
  return (
    <button onClick={onSelect} style={{
      textAlign: 'left', padding: '10px 14px',
      border: '0.5px solid ' + (selected ? 'var(--ink)' : 'var(--rule)'),
      background: selected ? 'var(--page-2)' : 'transparent',
      cursor: 'pointer', borderRadius: 2, minWidth: 180,
      fontFamily: 'inherit', color: 'inherit',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
        <span className="mono" style={{ fontSize: 9, color: 'var(--ink-3)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
          v{idx} · {stage.timestamp}
        </span>
        {isFrom && <span className="chip" style={{ fontSize: 9, padding: '1px 5px' }}>BEFORE</span>}
        {isTo && <span className="chip chip-ai" style={{ fontSize: 9, padding: '1px 5px' }}>AFTER</span>}
      </div>
      <div className="serif" style={{ fontSize: 13, fontWeight: 500, marginBottom: 2 }}>{stage.label}</div>
      <div className="muted" style={{ fontSize: 11 }}>{stage.wordCount} words</div>
    </button>
  );
}

function DiffPane({ side, stage, showEvents, withCitations, hoveredEvent, setHoveredEvent, selectedEvent, setSelectedEvent }) {
  return (
    <div style={{ background: 'var(--page)', border: '0.5px solid var(--rule)', padding: '20px 22px', borderRadius: 2 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14, paddingBottom: 10, borderBottom: '0.5px solid var(--rule)' }}>
        <div>
          <div className="mono" style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>
            {side === 'before' ? 'BEFORE ·' : 'AFTER ·'} {stage.timestamp}
          </div>
          <div className="serif" style={{ fontSize: 15, fontWeight: 600, marginTop: 2 }}>{stage.label}</div>
        </div>
        <span className="mono muted-2" style={{ fontSize: 10 }}>{stage.wordCount} words</span>
      </div>
      <div className="serif" style={{ fontSize: 14, lineHeight: 1.75, color: 'var(--ink-2)', whiteSpace: 'pre-wrap' }}>
        {renderText(stage, { showEvents, withCitations, hoveredEvent, setHoveredEvent, selectedEvent, setSelectedEvent, side })}
      </div>
    </div>
  );
}

// Render text with AI-event highlighting.
function renderText(stage, opts) {
  const { showEvents, withCitations, hoveredEvent, setHoveredEvent, selectedEvent, setSelectedEvent } = opts;
  const text = stage.text;
  if (!showEvents || !stage.events || stage.events.length === 0) {
    return withCitations ? injectCitations(text) : text;
  }
  const nodes = [];
  let cursor = 0;
  const sorted = [...stage.events].sort((a, b) => a.range[0] - b.range[0]);
  for (const ev of sorted) {
    const [s, e] = ev.range;
    if (s > cursor) {
      const slice = text.slice(cursor, s);
      nodes.push(withCitations ? <Fragment key={`pre-${s}`}>{injectCitations(slice)}</Fragment> : slice);
    }
    const color = ev.kind === 'ai-hint' ? 'var(--accent-3)' : ev.kind === 'ai-critique' ? 'var(--accent-2)' : 'var(--ai)';
    const bg    = ev.kind === 'ai-hint' ? 'rgba(138,109,28,0.12)' : ev.kind === 'ai-critique' ? 'rgba(43,74,51,0.12)' : 'rgba(43,74,106,0.12)';
    const isHover = hoveredEvent && hoveredEvent.stageIdx === 2 && hoveredEvent.eventIdx === ev.eventIdx;
    const isSel = selectedEvent && selectedEvent.stageIdx === 2 && selectedEvent.eventIdx === ev.eventIdx;
    const label = ev.kind === 'ai-hint' ? 'Hint' : ev.kind === 'ai-critique' ? 'Critique' : 'Outline';
    const spanText = text.slice(s, Math.min(e, text.length));
    nodes.push(
      <span
        key={`ev-${s}`}
        onMouseEnter={() => setHoveredEvent && setHoveredEvent({ stageIdx: 2, eventIdx: ev.eventIdx })}
        onMouseLeave={() => setHoveredEvent && setHoveredEvent(null)}
        onClick={() => setSelectedEvent && setSelectedEvent(isSel ? null : { stageIdx: 2, eventIdx: ev.eventIdx })}
        title={`From ${label} · ${ev.note}`}
        style={{
          background: isSel ? bg.replace(/0\.12/, '0.28') : isHover ? bg.replace(/0\.12/, '0.22') : bg,
          borderBottom: '1.5px ' + (isSel ? 'solid' : 'dashed') + ' ' + color,
          padding: '1px 2px',
          cursor: 'help',
          transition: 'background 0.15s',
          position: 'relative',
        }}
      >
        {withCitations ? injectCitations(spanText) : spanText}
      </span>
    );
    cursor = Math.min(e, text.length);
  }
  if (cursor < text.length) {
    const tail = text.slice(cursor);
    nodes.push(withCitations ? <Fragment key="tail">{injectCitations(tail)}</Fragment> : tail);
  }
  return nodes;
}

function injectCitations(str) {
  if (typeof str !== 'string') return str;
  const parts = str.split(/(\[\d\])/g);
  return parts.map((p, j) => {
    const m = p.match(/^\[(\d)\]$/);
    if (m) {
      return (
        <sup key={j} style={{
          color: 'var(--accent)', fontFamily: 'var(--mono)', fontWeight: 600,
          padding: '0 2px', cursor: 'pointer', fontSize: 10,
        }}>[{m[1]}]</sup>
      );
    }
    return p;
  });
}
