import { useState } from 'react';
import Head from 'next/head';
import { TopBar } from '../components/primitives';
import WritingScreen from '../components/writing';
import TraceScreen from '../components/trace';
import TeacherScreen from '../components/teacher';
import TweaksPanel from '../components/tweaks';

export default function Home() {
  const [screen, setScreen] = useState('write');
  const [gate, setGate] = useState('soft');
  const [tweaksOpen, setTweaksOpen] = useState(false);

  return (
    <>
      <Head>
        <title>Adaptive AI Scaffold — Research Prototype</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <TopBar
          screen={screen}
          setScreen={setScreen}
          gate={gate}
          setGate={setGate}
          onOpenTweaks={() => setTweaksOpen(true)}
        />
        <div style={{ flex: 1, display: 'flex' }}>
          {screen === 'write'   && <WritingScreen gate={gate} setScreen={setScreen} />}
          {screen === 'trace'   && <TraceScreen setScreen={setScreen} />}
          {screen === 'teacher' && <TeacherScreen setScreen={setScreen} />}
        </div>
        {tweaksOpen && (
          <TweaksPanel gate={gate} setGate={setGate} onClose={() => setTweaksOpen(false)} />
        )}
      </div>
    </>
  );
}
