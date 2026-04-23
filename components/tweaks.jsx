// Tweaks panel — minimal, just the reasoning-gate strictness

import { Icon } from './primitives';

export default function TweaksPanel({ gate, setGate, onClose }) {
  return (
    <div style={{
      position: 'fixed', bottom: 20, right: 20, width: 300, zIndex: 100,
      background: 'var(--page)', border: '0.5px solid var(--ink-2)',
      boxShadow: '0 14px 40px -18px rgba(40,30,10,0.4), 0 2px 0 rgba(0,0,0,0.03)',
      borderRadius: 2,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', borderBottom: '0.5px solid var(--rule)', background: 'var(--page-2)' }}>
        <span className="mono" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-2)' }}>
          § Tweaks
        </span>
        <button className="btn btn-ghost btn-sm" onClick={onClose} style={{ padding: '2px 4px' }}>
          <Icon.X size={12} />
        </button>
      </div>
      <div style={{ padding: 16 }}>
        <div className="label" style={{ marginBottom: 8 }}>Reasoning gate</div>
        <div className="muted text-xs serif" style={{ fontStyle: 'italic', marginBottom: 12 }}>
          How strictly must students write before AI unlocks?
        </div>
        {[
          { id: 'soft',   label: 'Soft',   desc: 'Suggested minimum; skippable.' },
          { id: 'medium', label: 'Medium', desc: 'Threshold required; reason to skip.' },
          { id: 'hard',   label: 'Hard',   desc: 'AI disabled until threshold met.' },
        ].map(opt => (
          <button
            key={opt.id}
            onClick={() => setGate(opt.id)}
            style={{
              display: 'block', width: '100%', textAlign: 'left',
              padding: '8px 10px', marginBottom: 4,
              border: '0.5px solid ' + (gate === opt.id ? 'var(--ink)' : 'var(--rule)'),
              background: gate === opt.id ? 'var(--page-2)' : 'transparent',
              cursor: 'pointer', fontFamily: 'inherit', color: 'inherit', borderRadius: 2,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="serif" style={{ fontSize: 13, fontWeight: 500 }}>{opt.label}</span>
              {gate === opt.id && <Icon.Check size={12} />}
            </div>
            <div className="muted text-xs">{opt.desc}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
