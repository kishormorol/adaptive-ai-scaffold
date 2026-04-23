// Ask AI — inline guided flow (NOT a chat). 3 steps + reflection gate for last-resort.

import { useState, useEffect, useMemo } from 'react';
import { Icon } from './primitives';
import { CITATIONS, SOURCES } from './data';

export const HELP_KINDS = [
  { id: 'hint',     label: 'Hint',              icon: 'Lightbulb', tier: 1,
    blurb: "A small nudge. Keeps the thinking on your side.",
    detail: "No answer. Points to what to re-read.", intensity: "minimal" },
  { id: 'critique', label: 'Critique my answer', icon: 'Scale', tier: 2,
    blurb: "Feedback on what you have written so far.",
    detail: "Reads your text. Flags gaps, weak claims, missing citations.", intensity: "responsive" },
  { id: 'explain',  label: 'Explain a concept',  icon: 'Book', tier: 2,
    blurb: "Grounded walk-through from the readings.",
    detail: "Conceptual clarification. You decide how to use it.", intensity: "conceptual" },
  { id: 'outline',  label: 'Suggest an outline', icon: 'List', tier: 3,
    blurb: "A scaffold for your argument. You fill in the prose.",
    detail: "Structure only — no finished sentences.", intensity: "structural" },
  { id: 'answer',   label: 'Give full answer',   icon: 'Warn', tier: 4, lastResort: true,
    blurb: "A complete response. Requires a reflection first.",
    detail: "Logged and visible to your instructor. Use sparingly.", intensity: "complete" },
];

// AI responses are scenario-specific AND reference the student's own words where useful.
function buildResponses(studentReasoning) {
  const hasRetrieval = /retriev/i.test(studentReasoning);
  const hasContext = /context|cue|encod/i.test(studentReasoning);

  return {
    hint: {
      echo: hasRetrieval
        ? "You used the word 'retrieval' — that is the first mechanism."
        : "You wrote that spaced repetitions make information 'stay in your head'. That is a start.",
      body: (
        <>
          <p style={{ margin: '0 0 10px' }}>
            The readings name <strong>two distinct mechanisms</strong>. You have identified {hasRetrieval ? 'one' : 'a vague version of one'}.
          </p>
          <ul style={{ margin: '0 0 4px', paddingLeft: 18 }}>
            <li style={{ marginBottom: 4 }}>Re-read <SrcRef page="p. 61" n={1}>Bjork &amp; Bjork</SrcRef> — what does retrieval <em>do</em> to the memory trace?</li>
            <li>Re-read <SrcRef page="slide 14" n={3}>Lecture 6</SrcRef> — why would a <em>different</em> context matter at encoding?</li>
          </ul>
        </>
      ),
      tone: "Two prompts, no answer. You do the synthesis.",
      citeNs: [1, 3],
    },
    critique: {
      echo: hasRetrieval
        ? `Reading your draft: retrieval is present, but ${hasContext ? 'the second mechanism is gestured at rather than named.' : 'the second mechanism is missing.'}`
        : "Reading your draft: the prompt asks for two mechanisms, but the argument currently points at only one.",
      body: (
        <>
          <ul style={{ margin: '0 0 10px', paddingLeft: 18, listStyle: 'none' }}>
            <li style={{ marginBottom: 8, display: 'grid', gridTemplateColumns: '18px 1fr', gap: 6 }}>
              <span style={{ color: 'var(--accent-2)', fontWeight: 700 }}>✓</span>
              <span>
                <strong>Claim present:</strong> retrieval as effortful, memory-modifying.
                <SrcRef page="p. 61" n={1} inline>&nbsp;[1]</SrcRef>
              </span>
            </li>
            <li style={{ marginBottom: 8, display: 'grid', gridTemplateColumns: '18px 1fr', gap: 6 }}>
              <span style={{ color: 'var(--warn)', fontWeight: 700 }}>△</span>
              <span>
                <strong>Missing mechanism.</strong> The prompt asks for <em>at least two</em>. Encoding variability (<SrcRef page="slide 14" n={3} inline>Lecture 6</SrcRef>) would complete the argument.
              </span>
            </li>
            <li style={{ display: 'grid', gridTemplateColumns: '18px 1fr', gap: 6 }}>
              <span style={{ color: 'var(--warn)', fontWeight: 700 }}>△</span>
              <span>
                <strong>Unsupported claim:</strong> &ldquo;fluency is misleading&rdquo; is correct but uncited. See <SrcRef page="p. 58" n={1} inline>Bjork &amp; Bjork</SrcRef>.
              </span>
            </li>
          </ul>
          <p style={{ margin: 0 }} className="muted">Add the second mechanism its own paragraph and a citation.</p>
        </>
      ),
      tone: "Points out, does not rewrite.",
      citeNs: [1, 3],
    },
    explain: {
      echo: "Since you mentioned 'context', here is the formal name for it.",
      body: (
        <>
          <p style={{ margin: '0 0 8px' }}><strong>Encoding variability.</strong> <SrcRef page="slide 14" n={3} inline>[Lecture 6]</SrcRef></p>
          <p style={{ margin: '0 0 8px' }}>
            Every study episode occurs in a slightly different internal state (attention, mood) and external context (room, time, surrounding material). Those features become <em>retrieval cues</em> attached to the memory.
          </p>
          <p style={{ margin: 0 }}>
            Spaced repetitions naturally span more contexts than a single crammed session, so a broader cue set is attached. At test time, the chance that <em>some</em> cue overlaps with the test situation goes up.
          </p>
        </>
      ),
      tone: "Grounded explanation. You decide how to use it.",
      citeNs: [3],
    },
    outline: {
      echo: "A scaffold, given your current draft covers one mechanism.",
      body: (
        <>
          <ol style={{ margin: 0, paddingLeft: 18 }}>
            <li style={{ marginBottom: 8 }}>
              <strong>Thesis (1 sentence).</strong> Two mechanisms explain why spacing &gt; massing.
            </li>
            <li style={{ marginBottom: 8 }}>
              <strong>Mechanism 1 · Retrieval practice.</strong> Forgetting → effortful retrieval → memory modified.
              <SrcRef page="p. 61" n={1} inline> [cite 1]</SrcRef>
            </li>
            <li style={{ marginBottom: 8 }}>
              <strong>Mechanism 2 · Encoding variability.</strong> Varied contexts → richer cue set.
              <SrcRef page="slide 14" n={3} inline> [cite 3]</SrcRef>
            </li>
            <li style={{ marginBottom: 8 }}>
              <strong>Boundary condition.</strong> Effect grows with retention interval.
              <SrcRef page="p. 359" n={2} inline> [cite 2]</SrcRef>
            </li>
            <li>
              <strong>Close.</strong> Why cramming <em>feels</em> productive but isn&apos;t.
            </li>
          </ol>
        </>
      ),
      tone: "Structure only. No prose written for you.",
      citeNs: [1, 2, 3],
    },
    answer: {
      echo: null,
      body: (
        <>
          <div style={{
            padding: 10, border: '0.5px dashed var(--warn)',
            background: 'rgba(166,63,31,0.04)', fontSize: 12, marginBottom: 10,
          }} className="muted">
            <strong style={{ color: 'var(--warn)' }}>Last-resort answer.</strong> This interaction is flagged in your submission, stored alongside your draft, and visible to your instructor.
          </div>
          <p style={{ margin: '0 0 6px' }}>
            Spaced practice outperforms massed practice for two reasons that the readings make clear…
          </p>
          <p style={{ margin: 0, fontStyle: 'italic' }} className="muted">
            [full 200-word response redacted in this demo — the point is the friction, not the text]
          </p>
        </>
      ),
      tone: "Redacted in demo.",
      citeNs: [1, 2, 3],
    },
  };
}

// tiny citation chip used inside responses
function SrcRef({ n, page, inline, children }) {
  return (
    <span style={{
      display: inline ? 'inline' : 'inline-flex',
      alignItems: 'baseline',
      gap: 4,
      color: 'var(--accent)',
      fontFamily: 'var(--serif)',
      fontWeight: 500,
      borderBottom: inline ? '0' : '0.5px dotted var(--accent)',
      paddingBottom: inline ? 0 : 1,
    }}>
      {children}
      <sup style={{ fontFamily: 'var(--mono)', fontSize: 9, fontWeight: 600 }}>[{n}]</sup>
    </span>
  );
}

function HelpCard({ kind, onPick, disabled }) {
  const I = Icon[kind.icon];
  const isDanger = kind.lastResort;
  return (
    <button
      onClick={() => !disabled && onPick(kind.id)}
      disabled={disabled}
      style={{
        textAlign: 'left', padding: '14px 16px',
        border: '0.5px solid ' + (isDanger ? 'rgba(166,63,31,0.5)' : 'var(--rule)'),
        background: isDanger ? 'rgba(166,63,31,0.03)' : 'var(--page)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1,
        display: 'flex', gap: 12, alignItems: 'flex-start',
        transition: 'all 0.15s', borderRadius: 2,
        fontFamily: 'inherit', color: 'inherit', width: '100%',
      }}
      onMouseEnter={e => {
        if (!disabled) e.currentTarget.style.borderColor = isDanger ? 'var(--warn)' : 'var(--ink-2)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = isDanger ? 'rgba(166,63,31,0.5)' : 'var(--rule)';
      }}
    >
      <div style={{
        flex: '0 0 28px', height: 28, display: 'grid', placeItems: 'center',
        border: '0.5px solid ' + (isDanger ? 'var(--warn)' : 'var(--ink-2)'),
        color: isDanger ? 'var(--warn)' : 'var(--ink-2)',
        borderRadius: 2, marginTop: 2,
      }}>
        <I size={14} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <span className="serif" style={{ fontSize: 14, fontWeight: 600, color: isDanger ? 'var(--warn)' : 'var(--ink)' }}>
            {kind.label}
          </span>
          {kind.lastResort && <span className="chip chip-warn" style={{ fontSize: 9 }}>reflection required</span>}
          <span className="mono muted-2" style={{ fontSize: 9, marginLeft: 'auto', letterSpacing: '0.1em' }}>
            TIER {kind.tier}
          </span>
        </div>
        <div className="text-xs" style={{ lineHeight: 1.5, color: 'var(--ink-2)' }}>{kind.blurb}</div>
        <div className="text-xs muted" style={{ lineHeight: 1.5, marginTop: 2, fontStyle: 'italic' }}>{kind.detail}</div>
      </div>
    </button>
  );
}

function StepDot({ n, active, done, children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{
        width: 20, height: 20, display: 'grid', placeItems: 'center',
        border: '0.5px solid ' + (active ? 'var(--ink)' : done ? 'var(--ink-3)' : 'var(--rule)'),
        background: active ? 'var(--ink)' : done ? 'var(--page)' : 'transparent',
        color: active ? 'var(--page)' : done ? 'var(--ink-3)' : 'var(--ink-4)',
        fontFamily: 'var(--mono)', fontSize: 10, fontWeight: 600, borderRadius: 2,
      }}>
        {done ? <Icon.Check size={10} /> : n}
      </div>
      <span className="mono" style={{
        fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase',
        color: active ? 'var(--ink)' : 'var(--ink-3)',
      }}>{children}</span>
    </div>
  );
}

function HairlineJoin() {
  return <div style={{ flex: 1, height: 0.5, background: 'var(--rule)' }} />;
}

// ——— Main flow ———
export function AskAIFlow({ open, onClose, gate, studentReasoning, onComplete }) {
  // phases: 'hardGate' (hard mode only) -> 'try' -> 'pick' -> 'reflection' (answer only) -> 'response'
  const needsHardGate = gate === 'hard';
  const [phase, setPhase] = useState(needsHardGate ? 'hardGate' : 'try');
  const [hardReflection, setHardReflection] = useState('');
  const [tried, setTried] = useState('');
  const [kindId, setKindId] = useState(null);
  const [reflection, setReflection] = useState('');

  useEffect(() => {
    if (open) {
      setPhase(gate === 'hard' ? 'hardGate' : 'try');
      setHardReflection('');
      setTried('');
      setKindId(null);
      setReflection('');
    }
  }, [open, gate]);

  const responses = useMemo(() => buildResponses(studentReasoning || ''), [studentReasoning]);

  if (!open) return null;

  const triedMin = gate === 'hard' ? 10 : gate === 'medium' ? 5 : 2;
  const triedCount = tried.trim().split(/\s+/).filter(Boolean).length;
  const triedOK = triedCount >= triedMin;
  const hardReflOK = hardReflection.trim().split(/\s+/).filter(Boolean).length >= 15;

  const kind = HELP_KINDS.find(k => k.id === kindId);

  return (
    <div className="anim-slideDown" style={{
      margin: '16px 0',
      border: '0.5px solid var(--ink-2)',
      background: 'var(--page-2)',
      position: 'relative',
      boxShadow: '0 2px 0 rgba(0,0,0,0.02), 0 14px 30px -20px rgba(40,30,10,0.3)',
    }}>
      {/* corner tab */}
      <div style={{
        position: 'absolute', top: -10, left: 20,
        background: 'var(--ink)', color: 'var(--page)',
        padding: '2px 10px', fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase',
      }}>
        § AI SCAFFOLD · inline
      </div>
      <button
        onClick={onClose}
        className="btn-ghost btn"
        style={{ position: 'absolute', top: 8, right: 8, padding: '4px 6px' }}
        aria-label="Close"
      >
        <Icon.X size={12} />
      </button>

      <div style={{ padding: '22px 24px 20px' }}>
        {/* STEP row */}
        <div style={{ display: 'flex', gap: 20, marginBottom: 18, alignItems: 'center' }}>
          <StepDot n={1} active={phase === 'hardGate' || phase === 'try'} done={phase !== 'hardGate' && phase !== 'try'}>
            {needsHardGate ? 'Reflect + Context' : 'Context'}
          </StepDot>
          <HairlineJoin />
          <StepDot n={2} active={phase === 'pick'} done={phase === 'reflection' || phase === 'response'}>Kind of help</StepDot>
          <HairlineJoin />
          <StepDot n={3} active={phase === 'reflection' || phase === 'response'} done={false}>Response</StepDot>
        </div>

        {/* HARD GATE: structured reflection before ANY AI use */}
        {phase === 'hardGate' && (
          <div className="anim-fadeIn">
            <div className="label label-accent" style={{ marginBottom: 6, color: 'var(--accent-3)' }}>
              Step 1a · Hard gate · structured reflection required
            </div>
            <h3 className="serif" style={{ margin: '0 0 4px', fontSize: 19, fontWeight: 600 }}>
              Before AI unlocks: what is your current thinking?
            </h3>
            <p className="muted text-sm" style={{ margin: '0 0 14px' }}>
              In hard-gate mode, AI stays closed until you commit to a position in writing. 15+ words. This goes into the learning trace.
            </p>
            <div style={{ border: '0.5px solid var(--rule)', background: 'var(--page)', padding: '12px 14px', borderRadius: 2 }}>
              <textarea
                value={hardReflection}
                onChange={e => setHardReflection(e.target.value)}
                placeholder="What do I think is happening, based on what I've read so far? What am I uncertain about?"
                rows={4}
                className="serif"
                style={{ fontSize: 14 }}
                autoFocus
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
              <div className="mono muted-2" style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                {hardReflection.trim().split(/\s+/).filter(Boolean).length} / 15 words
              </div>
              <button
                className="btn btn-primary"
                onClick={() => setPhase('try')}
                disabled={!hardReflOK}
              >
                Unlock AI <Icon.ArrowRight />
              </button>
            </div>
          </div>
        )}

        {/* STEP 1: What have you tried? */}
        {phase === 'try' && (
          <div className="anim-fadeIn">
            <div className="label" style={{ marginBottom: 6 }}>Step 1 · Context</div>
            <h3 className="serif" style={{ margin: '0 0 4px', fontSize: 19, fontWeight: 600 }}>
              What have you tried so far?
            </h3>
            <p className="muted text-sm" style={{ margin: '0 0 12px' }}>
              A sentence or two about your current thinking, what is stuck, or what you already ruled out. This grounds the help.
            </p>

            {/* quick-select chips — click to stamp a canned phrase */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
              {[
                "I re-read the sources but ",
                "I have one mechanism but not the second: ",
                "I am stuck connecting ",
                "I already ruled out ",
              ].map((s, i) => (
                <button
                  key={i}
                  onClick={() => setTried(t => (t ? t + ' ' : '') + s)}
                  style={{
                    fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase',
                    padding: '4px 8px', border: '0.5px dashed var(--rule)', background: 'transparent',
                    cursor: 'pointer', color: 'var(--ink-3)', borderRadius: 2,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--ink)'; e.currentTarget.style.borderColor = 'var(--ink-3)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--ink-3)'; e.currentTarget.style.borderColor = 'var(--rule)'; }}
                >
                  + {s.trim()}…
                </button>
              ))}
            </div>

            <div style={{ border: '0.5px solid var(--rule)', background: 'var(--page)', padding: '12px 14px', borderRadius: 2, minHeight: 84 }}>
              <textarea
                value={tried}
                onChange={e => setTried(e.target.value)}
                placeholder="I started with the idea that cramming fades faster, but I'm not sure what the underlying mechanism is…"
                rows={3}
                className="serif"
                style={{ fontSize: 14 }}
                autoFocus
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
              <div className="mono muted-2" style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                {triedCount} words
                {!triedOK && <span style={{ color: 'var(--ink-3)', marginLeft: 8 }}>· {gate === 'soft' ? `suggested ≥ ${triedMin}` : `need ≥ ${triedMin}`}</span>}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                {gate === 'soft' && !triedOK && (
                  <button className="btn btn-ghost" onClick={() => setPhase('pick')}>Skip — I haven&apos;t tried yet</button>
                )}
                <button
                  className="btn btn-primary"
                  onClick={() => setPhase('pick')}
                  disabled={gate !== 'soft' && !triedOK}
                >
                  Continue <Icon.ArrowRight />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: pick kind */}
        {phase === 'pick' && (
          <div className="anim-fadeIn">
            <div className="label" style={{ marginBottom: 6 }}>Step 2 · Kind of help</div>
            <h3 className="serif" style={{ margin: '0 0 4px', fontSize: 19, fontWeight: 600 }}>
              What kind of help do you want?
            </h3>
            <p className="muted text-sm" style={{ margin: '0 0 14px' }}>
              Options are ordered by how much thinking they leave on your side. Start small.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {HELP_KINDS.filter(k => !k.lastResort).map(k => (
                <HelpCard key={k.id} kind={k} onPick={id => { setKindId(id); setPhase('response'); }} />
              ))}
            </div>
            <div style={{ margin: '14px 0 10px', display: 'flex', alignItems: 'center', gap: 10 }}>
              <hr className="hairline" style={{ flex: 1 }} />
              <span className="mono muted-2" style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase' }}>last resort</span>
              <hr className="hairline" style={{ flex: 1 }} />
            </div>
            <HelpCard
              kind={HELP_KINDS.find(k => k.lastResort)}
              onPick={() => { setKindId('answer'); setPhase('reflection'); }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 14 }}>
              <button className="btn btn-ghost" onClick={() => setPhase(needsHardGate ? 'hardGate' : 'try')}><Icon.ArrowLeft /> Back</button>
            </div>
          </div>
        )}

        {/* REFLECTION gate for last-resort */}
        {phase === 'reflection' && (
          <div className="anim-fadeIn">
            <div className="label label-accent" style={{ marginBottom: 6, color: 'var(--warn)' }}>
              Reflection required · last-resort help
            </div>
            <h3 className="serif" style={{ margin: '0 0 4px', fontSize: 19, fontWeight: 600 }}>
              Why do you need the full answer right now?
            </h3>
            <p className="muted text-sm" style={{ margin: '0 0 14px' }}>
              This answer is stored alongside your draft and visible to your instructor. A brief reason is required before we reveal it.
            </p>
            <div style={{ border: '0.5px solid var(--rule)', background: 'var(--page)', padding: '12px 14px', borderRadius: 2 }}>
              <textarea
                value={reflection}
                onChange={e => setReflection(e.target.value)}
                placeholder="e.g. I've been stuck for 45 minutes and want to check my mental model against a complete version before the deadline."
                rows={3}
                className="serif"
                style={{ fontSize: 14 }}
                autoFocus
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 14 }}>
              <button className="btn btn-ghost" onClick={() => { setKindId(null); setPhase('pick'); }}>
                <Icon.ArrowLeft /> Pick a different kind of help
              </button>
              <button
                className="btn btn-warn"
                onClick={() => setPhase('response')}
                disabled={reflection.trim().split(/\s+/).filter(Boolean).length < 6}
              >
                Reveal full answer <Icon.ArrowRight />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Response */}
        {phase === 'response' && kind && (
          <div className="anim-fadeIn">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, flexWrap: 'wrap' }}>
              <span className="label">Step 3 · Response</span>
              <span className={'chip ' + (kind.lastResort ? 'chip-warn' : 'chip-ai')}>
                {(() => { const I = Icon[kind.icon]; return <I size={11} />; })()} &nbsp;{kind.label}
              </span>
              <span className="mono muted-2" style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                tier {kind.tier} · {kind.intensity}
              </span>
              <span className="mono muted-2" style={{ fontSize: 10, marginLeft: 'auto', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                grounded in {responses[kind.id].citeNs.length} source{responses[kind.id].citeNs.length === 1 ? '' : 's'}
              </span>
            </div>

            {/* Echo-back: AI shows it read the student's text */}
            {responses[kind.id].echo && (
              <div style={{
                display: 'flex', gap: 10, alignItems: 'flex-start',
                padding: '10px 14px', background: 'rgba(43,74,106,0.04)',
                border: '0.5px dashed rgba(43,74,106,0.3)', marginBottom: 10, borderRadius: 2,
              }}>
                <div style={{ color: 'var(--ai)', marginTop: 2 }}><Icon.Quote size={13} /></div>
                <div style={{ flex: 1 }}>
                  <div className="mono" style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ai)', marginBottom: 2 }}>
                    Reading your draft
                  </div>
                  <div className="serif" style={{ fontSize: 13, fontStyle: 'italic', color: 'var(--ink-2)' }}>
                    {responses[kind.id].echo}
                  </div>
                </div>
              </div>
            )}

            <div style={{
              background: 'var(--page)',
              border: '0.5px solid var(--rule)',
              padding: '18px 22px',
              fontFamily: 'var(--serif)', fontSize: 14, lineHeight: 1.65,
              color: 'var(--ink-2)', position: 'relative',
            }}>
              <div style={{ position: 'absolute', left: -1, top: 14, bottom: 14, width: 2, background: kind.lastResort ? 'var(--warn)' : 'var(--ai)' }}/>
              {responses[kind.id].body}

              {/* source-cards footer */}
              <div style={{ marginTop: 14, paddingTop: 10, borderTop: '0.5px dashed var(--rule)' }}>
                <div className="mono" style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: 6 }}>
                  Sources cited
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {responses[kind.id].citeNs.map(n => {
                    const cit = CITATIONS.find(c => c.n === n);
                    if (!cit) return null;
                    const src = SOURCES.find(s => s.id === cit.sourceId);
                    const snip = src.snippets.find(s => s.id === cit.snippetId);
                    return (
                      <div key={n} style={{
                        flex: '1 1 200px', minWidth: 180,
                        padding: '6px 10px',
                        border: '0.5px solid var(--rule)', background: 'var(--page-2)',
                        borderRadius: 2,
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                          <span className="mono" style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)' }}>
                            [{n}] {src.short}
                          </span>
                          <span className="mono muted-2" style={{ fontSize: 9 }}>{snip.page}</span>
                        </div>
                        <div className="serif muted" style={{ fontSize: 11, lineHeight: 1.45, fontStyle: 'italic' }}>
                          &ldquo;{snip.quote.slice(0, 100)}{snip.quote.length > 100 ? '…' : ''}&rdquo;
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="mono muted-2" style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', fontStyle: 'italic' }}>
                  {responses[kind.id].tone}
                </span>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button className="btn btn-sm btn-ghost">Helpful</button>
                  <button className="btn btn-sm btn-ghost">Not helpful</button>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 14, alignItems: 'center' }}>
              <div className="mono muted-2" style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Logged as AI event · {kind.label}{kindId === 'answer' && ' · flagged'}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn" onClick={() => setPhase('pick')}>Try another kind</button>
                <button className="btn btn-primary" onClick={() => { onComplete && onComplete(kindId); onClose(); }}>
                  Back to writing <Icon.ArrowRight />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
