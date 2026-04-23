// Writing screen — the main student workspace

import { useState } from 'react';
import { Icon, FigCaption, SourceSnippet } from './primitives';
import { AskAIFlow, HELP_KINDS } from './askai';
import { ASSIGNMENT, SOURCES } from './data';

export default function WritingScreen({ gate, setScreen }) {
  const [draft, setDraft] = useState(
`Spaced practice produces stronger long-term retention than massed practice because of how retrieval and context interact with memory.

When we cram, the material feels fluent in the moment but that fluency is misleading — we confuse ease of processing with actual learning. Spacing, by contrast, lets some forgetting occur between sessions.`
  );
  const [askAIOpen, setAskAIOpen] = useState(false);
  const [aiHistory, setAiHistory] = useState([
    { kind: 'hint', at: '7:49 PM' },
  ]);
  const [highlightedSrc, setHighlightedSrc] = useState(null);

  const wordCount = draft.trim().split(/\s+/).filter(Boolean).length;
  const minWords = gate === 'hard' ? 60 : gate === 'medium' ? 30 : 10;
  const gateOK = wordCount >= minWords;

  const gateMessage = gate === 'soft'
    ? `Try writing ${minWords}+ words first. You can open AI any time.`
    : gate === 'medium'
    ? `Write at least ${minWords} words, then AI unlocks.`
    : `AI stays locked until you've written ${minWords} words.`;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 0, flex: 1 }}>
      {/* main column — the essay */}
      <div style={{ padding: '32px 40px 80px', overflowY: 'auto', maxHeight: 'calc(100vh - 57px)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          {/* Assignment header */}
          <div style={{ marginBottom: 24 }}>
            <div className="mono" style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: 6 }}>
              {ASSIGNMENT.course} &nbsp;·&nbsp; {ASSIGNMENT.week} &nbsp;·&nbsp; {ASSIGNMENT.dueRelative}
            </div>
            <h2 className="serif" style={{ fontSize: 28, fontWeight: 600, margin: '0 0 10px', letterSpacing: '-0.01em', lineHeight: 1.25 }}>
              {ASSIGNMENT.title}
            </h2>
            <p className="serif muted" style={{ fontSize: 14, fontStyle: 'italic', margin: 0, lineHeight: 1.55 }}>
              {ASSIGNMENT.prompt}
            </p>
          </div>

          <hr className="hairline" style={{ margin: '0 0 28px' }} />

          {/* Reasoning gate */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20,
            padding: '10px 14px',
            background: gateOK ? 'rgba(43,74,51,0.04)' : 'rgba(138,109,28,0.05)',
            border: '0.5px solid ' + (gateOK ? 'rgba(43,74,51,0.25)' : 'rgba(138,109,28,0.3)'),
            borderRadius: 2,
          }}>
            <div style={{
              width: 22, height: 22, display: 'grid', placeItems: 'center',
              color: gateOK ? 'var(--accent-2)' : 'var(--accent-3)',
            }}>
              {gateOK ? <Icon.Check size={14} /> : <Icon.Pen size={14} />}
            </div>
            <div style={{ flex: 1 }}>
              <div className="mono" style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: gateOK ? 'var(--accent-2)' : 'var(--accent-3)', marginBottom: 2 }}>
                {gateOK ? 'Ready for AI · reasoning round complete' : 'Hints round · write first'}
              </div>
              <div className="serif text-sm muted">{gateMessage}</div>
            </div>
            <div className="mono" style={{ fontSize: 11, color: 'var(--ink-3)' }}>
              <span style={{ color: gateOK ? 'var(--accent-2)' : 'var(--ink-2)', fontWeight: 600 }}>{wordCount}</span>
              <span style={{ color: 'var(--ink-4)' }}>/{minWords}</span>
            </div>
          </div>

          {/* Editor */}
          <div style={{
            background: 'var(--page)',
            border: '0.5px solid var(--rule)',
            padding: '28px 40px 36px',
            position: 'relative',
            borderRadius: 2,
          }}>
            <FigCaption tag="FIG 1 · Your response">
              Drafts are auto-saved. The learning trace captures revisions and AI interactions.
            </FigCaption>

            <textarea
              value={draft}
              onChange={e => setDraft(e.target.value)}
              rows={Math.max(10, Math.ceil(draft.split('\n').length * 1.2))}
              className="serif"
              style={{
                fontSize: 16, lineHeight: 1.75, color: 'var(--ink)',
                minHeight: 260,
              }}
              placeholder="Start writing your answer here…"
            />

            {/* Inline AI flow sits inside the editor */}
            <AskAIFlow
              open={askAIOpen}
              onClose={() => setAskAIOpen(false)}
              gate={gate}
              studentReasoning={draft}
              onComplete={(kindId) => {
                setAiHistory(h => [...h, { kind: kindId, at: 'now' }]);
              }}
            />

            {/* Inline floating action — the "cursor" Ask AI button */}
            {!askAIOpen && (
              <div style={{
                position: 'sticky',
                bottom: -12,
                marginTop: 18,
                display: 'flex',
                gap: 10,
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}>
                <span className="mono muted-2" style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  {aiHistory.length} AI event{aiHistory.length === 1 ? '' : 's'} in this draft
                </span>
                <button
                  className="btn"
                  onClick={() => setAskAIOpen(true)}
                  disabled={!gateOK && gate === 'hard'}
                  style={{
                    borderColor: 'var(--ai)', color: 'var(--ai)',
                    boxShadow: '0 6px 18px -10px rgba(43,74,106,0.4)',
                    background: 'var(--page)',
                  }}
                >
                  <Icon.Sparkles size={13} /> Ask AI
                </button>
              </div>
            )}
          </div>

          {/* meta under editor */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 14 }}>
            <div className="mono muted-2" style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {wordCount} words · target 180–250 · auto-saved 12s ago
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn" onClick={() => setScreen('trace')}>
                <Icon.Diff size={13} /> View trace
              </button>
              <button className="btn btn-primary">Submit draft</button>
            </div>
          </div>
        </div>
      </div>

      {/* right rail — sources + AI log */}
      <aside style={{
        borderLeft: '0.5px solid var(--rule)',
        background: 'var(--paper)',
        padding: '28px 24px',
        overflowY: 'auto',
        maxHeight: 'calc(100vh - 57px)',
      }}>
        <FigCaption tag="FIG 2 · Assigned sources">
          {SOURCES.length} readings. AI responses are grounded in these.
        </FigCaption>

        {SOURCES.map(src => (
          <div key={src.id} style={{ marginBottom: 18 }}>
            <div
              onMouseEnter={() => setHighlightedSrc(src.id)}
              onMouseLeave={() => setHighlightedSrc(null)}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6, cursor: 'default' }}
            >
              <div>
                <div className="serif" style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>
                  {src.short}
                </div>
                <div className="muted text-xs serif" style={{ fontStyle: 'italic' }}>{src.title}</div>
              </div>
              <span className="chip">{src.kind}</span>
            </div>
            {src.snippets.map(sn => (
              <SourceSnippet
                key={sn.id}
                source={src}
                snippet={sn}
                highlighted={highlightedSrc === src.id}
              />
            ))}
          </div>
        ))}

        <hr className="hairline" style={{ margin: '24px 0 18px' }} />

        <FigCaption tag="FIG 3 · AI interactions">
          Visible to your instructor.
        </FigCaption>

        {aiHistory.length === 0 ? (
          <div className="serif muted text-sm" style={{ fontStyle: 'italic' }}>None yet.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {aiHistory.map((ev, i) => {
              const k = HELP_KINDS.find(x => x.id === ev.kind) || HELP_KINDS[0];
              const I = Icon[k.icon];
              const danger = k.lastResort;
              return (
                <div key={i} style={{
                  display: 'flex', gap: 10, alignItems: 'center',
                  padding: '8px 10px',
                  border: '0.5px solid ' + (danger ? 'rgba(166,63,31,0.35)' : 'var(--rule)'),
                  background: danger ? 'rgba(166,63,31,0.04)' : 'var(--page)',
                }}>
                  <div style={{ color: danger ? 'var(--warn)' : 'var(--ai)' }}><I size={12} /></div>
                  <div style={{ flex: 1 }}>
                    <div className="serif text-sm" style={{ fontWeight: 500 }}>{k.label}</div>
                    <div className="mono muted-2" style={{ fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      {ev.at}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </aside>
    </div>
  );
}
