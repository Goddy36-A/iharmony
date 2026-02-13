// Genre-specific beat synthesizer using Web Audio API
// No external URLs needed - generates beats in real-time

let ctx: AudioContext | null = null;

const getCtx = (): AudioContext => {
  if (!ctx) ctx = new AudioContext();
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
};

type DrumHit = 'kick' | 'snare' | 'hihat' | 'clap' | 'rim' | 'cowbell' | 'shaker' | 'conga' | 'tom';

const playDrum = (c: AudioContext, type: DrumHit, time: number, volume = 0.5) => {
  const g = c.createGain();
  g.connect(c.destination);
  g.gain.setValueAtTime(volume, time);

  switch (type) {
    case 'kick': {
      const o = c.createOscillator();
      o.type = 'sine';
      o.frequency.setValueAtTime(150, time);
      o.frequency.exponentialRampToValueAtTime(30, time + 0.15);
      g.gain.exponentialRampToValueAtTime(0.001, time + 0.3);
      o.connect(g);
      o.start(time);
      o.stop(time + 0.3);
      break;
    }
    case 'snare': {
      const o = c.createOscillator();
      o.type = 'triangle';
      o.frequency.setValueAtTime(200, time);
      o.frequency.exponentialRampToValueAtTime(80, time + 0.1);
      const ng = c.createGain();
      ng.connect(c.destination);
      ng.gain.setValueAtTime(volume * 0.6, time);
      ng.gain.exponentialRampToValueAtTime(0.001, time + 0.15);
      const bufSize = c.sampleRate * 0.15;
      const buf = c.createBuffer(1, bufSize, c.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
      const noise = c.createBufferSource();
      noise.buffer = buf;
      const hp = c.createBiquadFilter();
      hp.type = 'highpass';
      hp.frequency.value = 3000;
      noise.connect(hp);
      hp.connect(ng);
      noise.start(time);
      noise.stop(time + 0.15);
      g.gain.exponentialRampToValueAtTime(0.001, time + 0.12);
      o.connect(g);
      o.start(time);
      o.stop(time + 0.12);
      break;
    }
    case 'hihat': {
      const bufSize = c.sampleRate * 0.05;
      const buf = c.createBuffer(1, bufSize, c.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
      const noise = c.createBufferSource();
      noise.buffer = buf;
      const hp = c.createBiquadFilter();
      hp.type = 'highpass';
      hp.frequency.value = 7000;
      noise.connect(hp);
      hp.connect(g);
      g.gain.setValueAtTime(volume * 0.3, time);
      g.gain.exponentialRampToValueAtTime(0.001, time + 0.05);
      noise.start(time);
      noise.stop(time + 0.05);
      break;
    }
    case 'clap': {
      for (let i = 0; i < 3; i++) {
        const bufSize = c.sampleRate * 0.02;
        const buf = c.createBuffer(1, bufSize, c.sampleRate);
        const data = buf.getChannelData(0);
        for (let j = 0; j < bufSize; j++) data[j] = Math.random() * 2 - 1;
        const noise = c.createBufferSource();
        noise.buffer = buf;
        const bp = c.createBiquadFilter();
        bp.type = 'bandpass';
        bp.frequency.value = 2000;
        const cg = c.createGain();
        cg.gain.setValueAtTime(volume * 0.4, time + i * 0.01);
        cg.gain.exponentialRampToValueAtTime(0.001, time + i * 0.01 + 0.08);
        noise.connect(bp);
        bp.connect(cg);
        cg.connect(c.destination);
        noise.start(time + i * 0.01);
        noise.stop(time + i * 0.01 + 0.08);
      }
      break;
    }
    case 'rim': {
      const o = c.createOscillator();
      o.type = 'square';
      o.frequency.value = 800;
      g.gain.setValueAtTime(volume * 0.3, time);
      g.gain.exponentialRampToValueAtTime(0.001, time + 0.03);
      o.connect(g);
      o.start(time);
      o.stop(time + 0.03);
      break;
    }
    case 'cowbell': {
      const o1 = c.createOscillator();
      const o2 = c.createOscillator();
      o1.type = 'square';
      o2.type = 'square';
      o1.frequency.value = 560;
      o2.frequency.value = 845;
      const cg = c.createGain();
      cg.gain.setValueAtTime(volume * 0.25, time);
      cg.gain.exponentialRampToValueAtTime(0.001, time + 0.1);
      o1.connect(cg);
      o2.connect(cg);
      cg.connect(c.destination);
      o1.start(time);
      o2.start(time);
      o1.stop(time + 0.1);
      o2.stop(time + 0.1);
      break;
    }
    case 'shaker': {
      const bufSize = c.sampleRate * 0.04;
      const buf = c.createBuffer(1, bufSize, c.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
      const noise = c.createBufferSource();
      noise.buffer = buf;
      const bp = c.createBiquadFilter();
      bp.type = 'bandpass';
      bp.frequency.value = 9000;
      bp.Q.value = 2;
      noise.connect(bp);
      bp.connect(g);
      g.gain.setValueAtTime(volume * 0.15, time);
      g.gain.exponentialRampToValueAtTime(0.001, time + 0.04);
      noise.start(time);
      noise.stop(time + 0.04);
      break;
    }
    case 'conga': {
      const o = c.createOscillator();
      o.type = 'sine';
      o.frequency.setValueAtTime(300, time);
      o.frequency.exponentialRampToValueAtTime(150, time + 0.1);
      g.gain.setValueAtTime(volume * 0.4, time);
      g.gain.exponentialRampToValueAtTime(0.001, time + 0.15);
      o.connect(g);
      o.start(time);
      o.stop(time + 0.15);
      break;
    }
    case 'tom': {
      const o = c.createOscillator();
      o.type = 'sine';
      o.frequency.setValueAtTime(200, time);
      o.frequency.exponentialRampToValueAtTime(80, time + 0.2);
      g.gain.exponentialRampToValueAtTime(0.001, time + 0.25);
      o.connect(g);
      o.start(time);
      o.stop(time + 0.25);
      break;
    }
  }
};

const playBassNote = (c: AudioContext, freq: number, time: number, dur: number, volume = 0.3) => {
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = 'sine';
  o.frequency.value = freq;
  g.gain.setValueAtTime(volume, time);
  g.gain.exponentialRampToValueAtTime(0.001, time + dur);
  o.connect(g);
  g.connect(c.destination);
  o.start(time);
  o.stop(time + dur);
};

type Step = { hit: DrumHit; vol?: number };
type BeatPattern = {
  bpm: number;
  steps: (Step[] | null)[];  // 16 steps, null = silence
  bassPattern?: { step: number; freq: number; dur?: number }[];
  bars: number;
};

// Genre-specific patterns
const GENRE_PATTERNS: Record<string, BeatPattern> = {
  'Pop': {
    bpm: 120, bars: 2,
    steps: [
      [{ hit: 'kick' }], [{ hit: 'hihat' }], [{ hit: 'hihat' }], [{ hit: 'hihat' }],
      [{ hit: 'snare' }, { hit: 'hihat' }], [{ hit: 'hihat' }], [{ hit: 'hihat' }], [{ hit: 'hihat' }],
      [{ hit: 'kick' }], [{ hit: 'hihat' }], [{ hit: 'kick' }], [{ hit: 'hihat' }],
      [{ hit: 'snare' }, { hit: 'hihat' }], [{ hit: 'hihat' }], [{ hit: 'hihat' }], [{ hit: 'hihat' }],
    ],
    bassPattern: [
      { step: 0, freq: 65 }, { step: 4, freq: 82 }, { step: 8, freq: 73 }, { step: 12, freq: 82 },
    ],
  },
  'Hip-Hop': {
    bpm: 90, bars: 2,
    steps: [
      [{ hit: 'kick' }], null, [{ hit: 'hihat' }], null,
      [{ hit: 'snare' }], null, [{ hit: 'hihat' }], [{ hit: 'kick' }],
      null, [{ hit: 'hihat' }], [{ hit: 'kick' }], null,
      [{ hit: 'snare' }], null, [{ hit: 'hihat' }], [{ hit: 'hihat' }],
    ],
    bassPattern: [
      { step: 0, freq: 55, dur: 0.4 }, { step: 7, freq: 55, dur: 0.3 }, { step: 10, freq: 62, dur: 0.3 },
    ],
  },
  'Trap': {
    bpm: 140, bars: 2,
    steps: [
      [{ hit: 'kick' }], [{ hit: 'hihat' }], [{ hit: 'hihat' }], [{ hit: 'hihat' }],
      [{ hit: 'snare' }, { hit: 'hihat' }], [{ hit: 'hihat' }], [{ hit: 'hihat' }], [{ hit: 'hihat' }],
      [{ hit: 'hihat' }], [{ hit: 'hihat' }], [{ hit: 'kick' }], [{ hit: 'hihat' }],
      [{ hit: 'snare' }, { hit: 'hihat' }], [{ hit: 'hihat' }], [{ hit: 'hihat' }], [{ hit: 'hihat' }],
    ],
    bassPattern: [
      { step: 0, freq: 40, dur: 0.6 }, { step: 10, freq: 40, dur: 0.4 },
    ],
  },
  'Drill': {
    bpm: 145, bars: 2,
    steps: [
      [{ hit: 'kick' }], [{ hit: 'hihat' }], [{ hit: 'hihat' }], [{ hit: 'kick' }],
      [{ hit: 'snare' }, { hit: 'hihat' }], [{ hit: 'hihat' }], [{ hit: 'hihat' }], [{ hit: 'hihat' }],
      [{ hit: 'kick' }], [{ hit: 'hihat' }], [{ hit: 'hihat' }], [{ hit: 'hihat' }],
      [{ hit: 'snare' }, { hit: 'hihat' }], [{ hit: 'hihat' }], [{ hit: 'kick' }, { hit: 'hihat' }], [{ hit: 'hihat' }],
    ],
    bassPattern: [
      { step: 0, freq: 44, dur: 0.5 }, { step: 3, freq: 49, dur: 0.3 }, { step: 8, freq: 44, dur: 0.5 },
    ],
  },
  'Funk': {
    bpm: 115, bars: 2,
    steps: [
      [{ hit: 'kick' }], [{ hit: 'hihat' }], [{ hit: 'hihat' }], [{ hit: 'kick' }, { hit: 'hihat' }],
      [{ hit: 'snare' }, { hit: 'hihat' }], [{ hit: 'hihat' }], [{ hit: 'kick' }, { hit: 'hihat' }], [{ hit: 'hihat' }],
      [{ hit: 'kick' }], [{ hit: 'hihat' }], [{ hit: 'hihat' }], [{ hit: 'hihat' }],
      [{ hit: 'snare' }, { hit: 'hihat' }], [{ hit: 'hihat' }], [{ hit: 'kick' }, { hit: 'hihat' }], [{ hit: 'hihat' }],
    ],
    bassPattern: [
      { step: 0, freq: 73 }, { step: 3, freq: 82 }, { step: 6, freq: 65 }, { step: 8, freq: 73 }, { step: 11, freq: 82 }, { step: 14, freq: 65 },
    ],
  },
  'Amapiano': {
    bpm: 115, bars: 2,
    steps: [
      [{ hit: 'kick' }], [{ hit: 'shaker' }], [{ hit: 'hihat' }], [{ hit: 'shaker' }],
      [{ hit: 'kick' }, { hit: 'clap' }], [{ hit: 'shaker' }], [{ hit: 'hihat' }], [{ hit: 'shaker' }],
      [{ hit: 'kick' }], [{ hit: 'shaker' }], [{ hit: 'hihat' }], [{ hit: 'shaker' }],
      [{ hit: 'kick' }, { hit: 'clap' }], [{ hit: 'shaker' }], [{ hit: 'hihat' }], [{ hit: 'shaker' }],
    ],
    bassPattern: [
      { step: 0, freq: 55, dur: 0.5 }, { step: 4, freq: 62, dur: 0.5 }, { step: 8, freq: 49, dur: 0.5 }, { step: 12, freq: 55, dur: 0.5 },
    ],
  },
  'Afrobeats': {
    bpm: 108, bars: 2,
    steps: [
      [{ hit: 'kick' }], [{ hit: 'shaker' }], [{ hit: 'conga' }], [{ hit: 'shaker' }],
      [{ hit: 'snare' }], [{ hit: 'shaker' }], [{ hit: 'conga' }], [{ hit: 'kick' }, { hit: 'shaker' }],
      [{ hit: 'conga' }], [{ hit: 'shaker' }], [{ hit: 'kick' }], [{ hit: 'shaker' }],
      [{ hit: 'snare' }], [{ hit: 'shaker' }], [{ hit: 'conga' }], [{ hit: 'shaker' }],
    ],
    bassPattern: [
      { step: 0, freq: 65 }, { step: 7, freq: 73 }, { step: 10, freq: 82 },
    ],
  },
  'Hyperpop': {
    bpm: 160, bars: 2,
    steps: [
      [{ hit: 'kick' }, { hit: 'hihat' }], [{ hit: 'hihat' }], [{ hit: 'hihat' }], [{ hit: 'hihat' }],
      [{ hit: 'snare' }, { hit: 'clap' }, { hit: 'hihat' }], [{ hit: 'hihat' }], [{ hit: 'hihat' }], [{ hit: 'hihat' }],
      [{ hit: 'kick' }, { hit: 'hihat' }], [{ hit: 'hihat' }], [{ hit: 'kick' }, { hit: 'hihat' }], [{ hit: 'hihat' }],
      [{ hit: 'snare' }, { hit: 'clap' }, { hit: 'hihat' }], [{ hit: 'hihat' }], [{ hit: 'hihat' }], [{ hit: 'hihat' }],
    ],
    bassPattern: [
      { step: 0, freq: 55, dur: 0.2 }, { step: 2, freq: 62, dur: 0.2 }, { step: 8, freq: 49, dur: 0.2 }, { step: 10, freq: 55, dur: 0.2 },
    ],
  },
  'R&B / Soul': {
    bpm: 80, bars: 2,
    steps: [
      [{ hit: 'kick' }], [{ hit: 'hihat' }], [{ hit: 'hihat' }], [{ hit: 'hihat' }],
      [{ hit: 'snare' }, { hit: 'hihat' }], [{ hit: 'hihat' }], [{ hit: 'hihat' }], [{ hit: 'hihat' }],
      [{ hit: 'kick' }], [{ hit: 'hihat' }], [{ hit: 'kick' }], [{ hit: 'hihat' }],
      [{ hit: 'snare' }, { hit: 'hihat' }], [{ hit: 'hihat' }], [{ hit: 'hihat' }], [{ hit: 'hihat' }],
    ],
    bassPattern: [
      { step: 0, freq: 55, dur: 0.6 }, { step: 4, freq: 65, dur: 0.4 }, { step: 8, freq: 73, dur: 0.4 }, { step: 12, freq: 65, dur: 0.6 },
    ],
  },
  'Jazz': {
    bpm: 140, bars: 2,
    steps: [
      [{ hit: 'rim' }], null, [{ hit: 'hihat' }], null,
      [{ hit: 'rim' }], null, [{ hit: 'hihat' }], null,
      [{ hit: 'rim' }], null, [{ hit: 'hihat' }], null,
      [{ hit: 'rim' }], null, [{ hit: 'hihat' }], [{ hit: 'rim' }],
    ],
    bassPattern: [
      { step: 0, freq: 65 }, { step: 4, freq: 73 }, { step: 8, freq: 82 }, { step: 12, freq: 73 },
    ],
  },
  'Blues': {
    bpm: 80, bars: 2,
    steps: [
      [{ hit: 'kick' }], null, [{ hit: 'hihat' }], null,
      [{ hit: 'snare' }], null, [{ hit: 'hihat' }], null,
      [{ hit: 'kick' }], null, [{ hit: 'hihat' }], [{ hit: 'kick' }],
      [{ hit: 'snare' }], null, [{ hit: 'hihat' }], null,
    ],
    bassPattern: [
      { step: 0, freq: 55, dur: 0.6 }, { step: 4, freq: 65, dur: 0.4 }, { step: 8, freq: 73, dur: 0.4 }, { step: 12, freq: 65, dur: 0.6 },
    ],
  },
  'Electronic / EDM': {
    bpm: 128, bars: 2,
    steps: [
      [{ hit: 'kick' }], [{ hit: 'hihat' }], [{ hit: 'kick' }, { hit: 'hihat' }], [{ hit: 'hihat' }],
      [{ hit: 'kick' }, { hit: 'clap' }], [{ hit: 'hihat' }], [{ hit: 'kick' }, { hit: 'hihat' }], [{ hit: 'hihat' }],
      [{ hit: 'kick' }], [{ hit: 'hihat' }], [{ hit: 'kick' }, { hit: 'hihat' }], [{ hit: 'hihat' }],
      [{ hit: 'kick' }, { hit: 'clap' }], [{ hit: 'hihat' }], [{ hit: 'kick' }, { hit: 'hihat' }], [{ hit: 'hihat' }],
    ],
    bassPattern: [
      { step: 0, freq: 55, dur: 0.3 }, { step: 4, freq: 55, dur: 0.3 }, { step: 8, freq: 55, dur: 0.3 }, { step: 12, freq: 55, dur: 0.3 },
    ],
  },
  'House': {
    bpm: 124, bars: 2,
    steps: [
      [{ hit: 'kick' }], [{ hit: 'hihat' }], [{ hit: 'kick' }], [{ hit: 'hihat' }],
      [{ hit: 'kick' }, { hit: 'clap' }], [{ hit: 'hihat' }], [{ hit: 'kick' }], [{ hit: 'hihat' }],
      [{ hit: 'kick' }], [{ hit: 'hihat' }], [{ hit: 'kick' }], [{ hit: 'hihat' }],
      [{ hit: 'kick' }, { hit: 'clap' }], [{ hit: 'hihat' }], [{ hit: 'kick' }], [{ hit: 'hihat' }],
    ],
    bassPattern: [
      { step: 0, freq: 55, dur: 0.4 }, { step: 8, freq: 65, dur: 0.4 },
    ],
  },
  'Techno': {
    bpm: 135, bars: 2,
    steps: [
      [{ hit: 'kick' }], [{ hit: 'hihat' }], [{ hit: 'kick' }], [{ hit: 'hihat' }],
      [{ hit: 'kick' }, { hit: 'rim' }], [{ hit: 'hihat' }], [{ hit: 'kick' }], [{ hit: 'hihat' }],
      [{ hit: 'kick' }], [{ hit: 'hihat' }], [{ hit: 'kick' }], [{ hit: 'hihat' }],
      [{ hit: 'kick' }, { hit: 'rim' }], [{ hit: 'hihat' }], [{ hit: 'kick' }], [{ hit: 'hihat' }],
    ],
  },
  'Drum & Bass': {
    bpm: 174, bars: 2,
    steps: [
      [{ hit: 'kick' }], [{ hit: 'hihat' }], [{ hit: 'hihat' }], [{ hit: 'hihat' }],
      [{ hit: 'snare' }], [{ hit: 'hihat' }], [{ hit: 'kick' }], [{ hit: 'hihat' }],
      [{ hit: 'hihat' }], [{ hit: 'kick' }], [{ hit: 'hihat' }], [{ hit: 'hihat' }],
      [{ hit: 'snare' }], [{ hit: 'hihat' }], [{ hit: 'kick' }], [{ hit: 'hihat' }],
    ],
    bassPattern: [
      { step: 0, freq: 40, dur: 0.3 }, { step: 6, freq: 40, dur: 0.2 }, { step: 9, freq: 45, dur: 0.2 },
    ],
  },
  'Lo-fi': {
    bpm: 78, bars: 2,
    steps: [
      [{ hit: 'kick' }], null, [{ hit: 'hihat' }], null,
      [{ hit: 'snare' }], null, [{ hit: 'hihat' }], null,
      [{ hit: 'kick' }], [{ hit: 'hihat' }], null, null,
      [{ hit: 'snare' }], null, [{ hit: 'hihat' }], null,
    ],
    bassPattern: [
      { step: 0, freq: 55, dur: 0.5 }, { step: 4, freq: 65, dur: 0.5 }, { step: 8, freq: 73, dur: 0.3 },
    ],
  },
  'Reggaeton': {
    bpm: 92, bars: 2,
    steps: [
      [{ hit: 'kick' }], null, [{ hit: 'hihat' }], [{ hit: 'kick' }],
      [{ hit: 'snare' }], null, [{ hit: 'hihat' }], [{ hit: 'kick' }],
      null, null, [{ hit: 'hihat' }], [{ hit: 'kick' }],
      [{ hit: 'snare' }], null, [{ hit: 'hihat' }], null,
    ],
    bassPattern: [
      { step: 0, freq: 55, dur: 0.3 }, { step: 3, freq: 55, dur: 0.2 }, { step: 7, freq: 55, dur: 0.2 }, { step: 11, freq: 55, dur: 0.2 },
    ],
  },
  'Dancehall': {
    bpm: 100, bars: 2,
    steps: [
      [{ hit: 'kick' }], [{ hit: 'shaker' }], [{ hit: 'hihat' }], [{ hit: 'shaker' }],
      [{ hit: 'snare' }], [{ hit: 'shaker' }], [{ hit: 'hihat' }], [{ hit: 'kick' }, { hit: 'shaker' }],
      null, [{ hit: 'shaker' }], [{ hit: 'hihat' }], [{ hit: 'shaker' }],
      [{ hit: 'snare' }], [{ hit: 'shaker' }], [{ hit: 'hihat' }], [{ hit: 'shaker' }],
    ],
  },
  'Reggae': {
    bpm: 75, bars: 2,
    steps: [
      null, null, [{ hit: 'rim' }], null,
      [{ hit: 'kick' }, { hit: 'snare' }], null, [{ hit: 'rim' }], null,
      null, null, [{ hit: 'rim' }], null,
      [{ hit: 'kick' }, { hit: 'snare' }], null, [{ hit: 'rim' }], null,
    ],
    bassPattern: [
      { step: 0, freq: 55, dur: 0.5 }, { step: 4, freq: 65, dur: 0.4 }, { step: 8, freq: 73, dur: 0.4 }, { step: 12, freq: 65, dur: 0.4 },
    ],
  },
  'Synthwave / Retrowave': {
    bpm: 100, bars: 2,
    steps: [
      [{ hit: 'kick' }], [{ hit: 'hihat' }], [{ hit: 'hihat' }], [{ hit: 'hihat' }],
      [{ hit: 'snare' }, { hit: 'clap' }], [{ hit: 'hihat' }], [{ hit: 'hihat' }], [{ hit: 'hihat' }],
      [{ hit: 'kick' }], [{ hit: 'hihat' }], [{ hit: 'kick' }], [{ hit: 'hihat' }],
      [{ hit: 'snare' }, { hit: 'clap' }], [{ hit: 'hihat' }], [{ hit: 'hihat' }], [{ hit: 'hihat' }],
    ],
  },
  'Phonk': {
    bpm: 140, bars: 2,
    steps: [
      [{ hit: 'kick' }, { hit: 'cowbell' }], [{ hit: 'hihat' }], [{ hit: 'cowbell' }], [{ hit: 'hihat' }],
      [{ hit: 'snare' }, { hit: 'cowbell' }], [{ hit: 'hihat' }], [{ hit: 'cowbell' }], [{ hit: 'hihat' }],
      [{ hit: 'kick' }, { hit: 'cowbell' }], [{ hit: 'hihat' }], [{ hit: 'kick' }, { hit: 'cowbell' }], [{ hit: 'hihat' }],
      [{ hit: 'snare' }, { hit: 'cowbell' }], [{ hit: 'hihat' }], [{ hit: 'cowbell' }], [{ hit: 'hihat' }],
    ],
    bassPattern: [
      { step: 0, freq: 40, dur: 0.5 }, { step: 10, freq: 40, dur: 0.3 },
    ],
  },
  'Brazilian Funk (Funk Carioca)': {
    bpm: 135, bars: 2,
    steps: [
      [{ hit: 'kick' }], [{ hit: 'hihat' }], [{ hit: 'kick' }], [{ hit: 'hihat' }],
      [{ hit: 'snare' }], [{ hit: 'hihat' }], null, [{ hit: 'kick' }, { hit: 'hihat' }],
      [{ hit: 'kick' }], [{ hit: 'hihat' }], [{ hit: 'kick' }], [{ hit: 'hihat' }],
      [{ hit: 'snare' }], [{ hit: 'hihat' }], [{ hit: 'kick' }], [{ hit: 'hihat' }],
    ],
    bassPattern: [
      { step: 0, freq: 50, dur: 0.3 }, { step: 2, freq: 50, dur: 0.2 }, { step: 7, freq: 55, dur: 0.2 }, { step: 10, freq: 50, dur: 0.3 },
    ],
  },
  'Highlife': {
    bpm: 115, bars: 2,
    steps: [
      [{ hit: 'kick' }], [{ hit: 'shaker' }], [{ hit: 'hihat' }], [{ hit: 'shaker' }],
      [{ hit: 'snare' }], [{ hit: 'shaker' }], [{ hit: 'hihat' }], [{ hit: 'shaker' }],
      [{ hit: 'kick' }], [{ hit: 'shaker' }], [{ hit: 'kick' }], [{ hit: 'shaker' }],
      [{ hit: 'snare' }], [{ hit: 'shaker' }], [{ hit: 'hihat' }], [{ hit: 'shaker' }],
    ],
    bassPattern: [
      { step: 0, freq: 65 }, { step: 4, freq: 82 }, { step: 8, freq: 73 }, { step: 12, freq: 82 },
    ],
  },
  'Soukous / Congolese Rumba': {
    bpm: 140, bars: 2,
    steps: [
      [{ hit: 'kick' }, { hit: 'conga' }], [{ hit: 'shaker' }], [{ hit: 'conga' }], [{ hit: 'shaker' }],
      [{ hit: 'snare' }, { hit: 'conga' }], [{ hit: 'shaker' }], [{ hit: 'conga' }], [{ hit: 'shaker' }],
      [{ hit: 'kick' }, { hit: 'conga' }], [{ hit: 'shaker' }], [{ hit: 'conga' }], [{ hit: 'shaker' }],
      [{ hit: 'snare' }, { hit: 'conga' }], [{ hit: 'shaker' }], [{ hit: 'conga' }], [{ hit: 'kick' }, { hit: 'shaker' }],
    ],
    bassPattern: [
      { step: 0, freq: 65 }, { step: 4, freq: 73 }, { step: 8, freq: 82 }, { step: 12, freq: 73 },
    ],
  },
  'Gqom': {
    bpm: 124, bars: 2,
    steps: [
      [{ hit: 'kick' }], null, [{ hit: 'kick' }], null,
      [{ hit: 'clap' }], null, null, [{ hit: 'kick' }],
      [{ hit: 'kick' }], null, [{ hit: 'kick' }], null,
      [{ hit: 'clap' }], null, null, null,
    ],
    bassPattern: [
      { step: 0, freq: 40, dur: 0.6 }, { step: 7, freq: 40, dur: 0.4 },
    ],
  },
  'Kwaito': {
    bpm: 110, bars: 2,
    steps: [
      [{ hit: 'kick' }], [{ hit: 'hihat' }], [{ hit: 'kick' }], [{ hit: 'hihat' }],
      [{ hit: 'clap' }], [{ hit: 'hihat' }], null, [{ hit: 'hihat' }],
      [{ hit: 'kick' }], [{ hit: 'hihat' }], [{ hit: 'kick' }], [{ hit: 'hihat' }],
      [{ hit: 'clap' }], [{ hit: 'hihat' }], null, [{ hit: 'hihat' }],
    ],
    bassPattern: [
      { step: 0, freq: 50, dur: 0.5 }, { step: 4, freq: 55, dur: 0.4 }, { step: 8, freq: 50, dur: 0.5 },
    ],
  },
  'Bongo Flava': {
    bpm: 105, bars: 2,
    steps: [
      [{ hit: 'kick' }], [{ hit: 'shaker' }], [{ hit: 'hihat' }], [{ hit: 'shaker' }],
      [{ hit: 'snare' }], [{ hit: 'shaker' }], [{ hit: 'hihat' }], [{ hit: 'shaker' }],
      [{ hit: 'kick' }], [{ hit: 'shaker' }], [{ hit: 'kick' }], [{ hit: 'shaker' }],
      [{ hit: 'snare' }], [{ hit: 'shaker' }], [{ hit: 'hihat' }], [{ hit: 'shaker' }],
    ],
  },
  'Cumbia': {
    bpm: 95, bars: 2,
    steps: [
      [{ hit: 'kick' }], [{ hit: 'shaker' }], [{ hit: 'conga' }], [{ hit: 'shaker' }],
      [{ hit: 'snare' }], [{ hit: 'shaker' }], [{ hit: 'conga' }], [{ hit: 'shaker' }],
      [{ hit: 'kick' }], [{ hit: 'shaker' }], [{ hit: 'conga' }], [{ hit: 'shaker' }],
      [{ hit: 'snare' }], [{ hit: 'shaker' }], [{ hit: 'conga' }], [{ hit: 'shaker' }],
    ],
    bassPattern: [
      { step: 0, freq: 55 }, { step: 4, freq: 65 }, { step: 8, freq: 73 }, { step: 12, freq: 65 },
    ],
  },
  'Sega / Maloya': {
    bpm: 120, bars: 2,
    steps: [
      [{ hit: 'conga' }], [{ hit: 'shaker' }], [{ hit: 'conga' }], [{ hit: 'shaker' }],
      [{ hit: 'conga' }, { hit: 'clap' }], [{ hit: 'shaker' }], [{ hit: 'conga' }], [{ hit: 'shaker' }],
      [{ hit: 'conga' }], [{ hit: 'shaker' }], [{ hit: 'conga' }], [{ hit: 'shaker' }],
      [{ hit: 'conga' }, { hit: 'clap' }], [{ hit: 'shaker' }], [{ hit: 'conga' }], [{ hit: 'shaker' }],
    ],
  },
  'Gnawa / Moroccan': {
    bpm: 100, bars: 2,
    steps: [
      [{ hit: 'tom' }], [{ hit: 'rim' }], [{ hit: 'rim' }], null,
      [{ hit: 'tom' }], [{ hit: 'rim' }], null, [{ hit: 'rim' }],
      [{ hit: 'tom' }], null, [{ hit: 'rim' }], [{ hit: 'rim' }],
      [{ hit: 'tom' }], [{ hit: 'rim' }], null, [{ hit: 'rim' }],
    ],
    bassPattern: [
      { step: 0, freq: 55, dur: 0.4 }, { step: 4, freq: 55, dur: 0.4 }, { step: 8, freq: 62, dur: 0.4 }, { step: 12, freq: 55, dur: 0.4 },
    ],
  },
  'Kuduro': {
    bpm: 135, bars: 2,
    steps: [
      [{ hit: 'kick' }], [{ hit: 'hihat' }], [{ hit: 'kick' }], [{ hit: 'hihat' }],
      [{ hit: 'clap' }, { hit: 'kick' }], [{ hit: 'hihat' }], [{ hit: 'kick' }], [{ hit: 'hihat' }],
      [{ hit: 'kick' }], [{ hit: 'hihat' }], [{ hit: 'kick' }], [{ hit: 'hihat' }],
      [{ hit: 'clap' }, { hit: 'kick' }], [{ hit: 'hihat' }], [{ hit: 'kick' }], [{ hit: 'hihat' }],
    ],
    bassPattern: [
      { step: 0, freq: 50, dur: 0.3 }, { step: 2, freq: 55, dur: 0.2 }, { step: 8, freq: 50, dur: 0.3 },
    ],
  },
  'Calypso / Soca': {
    bpm: 145, bars: 2,
    steps: [
      [{ hit: 'kick' }], [{ hit: 'hihat' }], [{ hit: 'hihat' }], [{ hit: 'hihat' }],
      [{ hit: 'snare' }, { hit: 'cowbell' }], [{ hit: 'hihat' }], [{ hit: 'hihat' }], [{ hit: 'hihat' }],
      [{ hit: 'kick' }], [{ hit: 'hihat' }], [{ hit: 'kick' }], [{ hit: 'hihat' }],
      [{ hit: 'snare' }, { hit: 'cowbell' }], [{ hit: 'hihat' }], [{ hit: 'hihat' }], [{ hit: 'hihat' }],
    ],
  },
  'Rock': {
    bpm: 120, bars: 2,
    steps: [
      [{ hit: 'kick' }, { hit: 'hihat' }], [{ hit: 'hihat' }], [{ hit: 'hihat' }], [{ hit: 'hihat' }],
      [{ hit: 'snare' }, { hit: 'hihat' }], [{ hit: 'hihat' }], [{ hit: 'hihat' }], [{ hit: 'hihat' }],
      [{ hit: 'kick' }, { hit: 'hihat' }], [{ hit: 'hihat' }], [{ hit: 'kick' }, { hit: 'hihat' }], [{ hit: 'hihat' }],
      [{ hit: 'snare' }, { hit: 'hihat' }], [{ hit: 'hihat' }], [{ hit: 'hihat' }], [{ hit: 'hihat' }],
    ],
  },
  'Country': {
    bpm: 110, bars: 2,
    steps: [
      [{ hit: 'kick' }], [{ hit: 'hihat' }], [{ hit: 'hihat' }], [{ hit: 'hihat' }],
      [{ hit: 'snare' }], [{ hit: 'hihat' }], [{ hit: 'hihat' }], [{ hit: 'hihat' }],
      [{ hit: 'kick' }], [{ hit: 'hihat' }], [{ hit: 'kick' }], [{ hit: 'hihat' }],
      [{ hit: 'snare' }], [{ hit: 'hihat' }], [{ hit: 'hihat' }], [{ hit: 'hihat' }],
    ],
  },
  'Gospel': {
    bpm: 100, bars: 2,
    steps: [
      [{ hit: 'kick' }], [{ hit: 'hihat' }], [{ hit: 'hihat' }], [{ hit: 'hihat' }],
      [{ hit: 'snare' }, { hit: 'clap' }], [{ hit: 'hihat' }], [{ hit: 'hihat' }], [{ hit: 'hihat' }],
      [{ hit: 'kick' }], [{ hit: 'hihat' }], [{ hit: 'kick' }], [{ hit: 'hihat' }],
      [{ hit: 'snare' }, { hit: 'clap' }], [{ hit: 'hihat' }], [{ hit: 'hihat' }], [{ hit: 'hihat' }],
    ],
  },
  'Latin / Salsa': {
    bpm: 180, bars: 2,
    steps: [
      [{ hit: 'conga' }], null, [{ hit: 'cowbell' }], [{ hit: 'conga' }],
      null, [{ hit: 'cowbell' }], [{ hit: 'conga' }], null,
      [{ hit: 'cowbell' }], [{ hit: 'conga' }], null, [{ hit: 'cowbell' }],
      [{ hit: 'conga' }], null, [{ hit: 'cowbell' }], [{ hit: 'conga' }],
    ],
    bassPattern: [
      { step: 0, freq: 73 }, { step: 3, freq: 82 }, { step: 6, freq: 65 }, { step: 9, freq: 73 }, { step: 12, freq: 82 },
    ],
  },
  'Classical': {
    bpm: 100, bars: 2,
    steps: [
      [{ hit: 'tom' }], null, null, null,
      null, null, [{ hit: 'rim' }], null,
      null, null, null, null,
      [{ hit: 'tom' }], null, null, null,
    ],
    bassPattern: [
      { step: 0, freq: 65, dur: 0.8 }, { step: 6, freq: 73, dur: 0.6 }, { step: 12, freq: 55, dur: 0.8 },
    ],
  },
};

// Fallback pattern for genres not explicitly defined
const DEFAULT_PATTERN: BeatPattern = {
  bpm: 120, bars: 2,
  steps: [
    [{ hit: 'kick' }], [{ hit: 'hihat' }], [{ hit: 'hihat' }], [{ hit: 'hihat' }],
    [{ hit: 'snare' }], [{ hit: 'hihat' }], [{ hit: 'hihat' }], [{ hit: 'hihat' }],
    [{ hit: 'kick' }], [{ hit: 'hihat' }], [{ hit: 'kick' }], [{ hit: 'hihat' }],
    [{ hit: 'snare' }], [{ hit: 'hihat' }], [{ hit: 'hihat' }], [{ hit: 'hihat' }],
  ],
};

export interface GenrePlayer {
  stop: () => void;
  isPlaying: () => boolean;
}

export const playGenreBeat = (genreName: string): GenrePlayer => {
  const c = getCtx();
  const pattern = GENRE_PATTERNS[genreName] || DEFAULT_PATTERN;
  const stepDur = 60 / pattern.bpm / 4; // 16th note duration
  const totalSteps = pattern.steps.length * pattern.bars;
  let stopped = false;
  let playing = true;

  const startTime = c.currentTime + 0.05;

  for (let bar = 0; bar < pattern.bars; bar++) {
    for (let step = 0; step < pattern.steps.length; step++) {
      const globalStep = bar * pattern.steps.length + step;
      const time = startTime + globalStep * stepDur;
      const hits = pattern.steps[step];
      if (hits) {
        hits.forEach(h => playDrum(c, h.hit, time, h.vol ?? 0.5));
      }
      // Bass
      if (pattern.bassPattern) {
        const bassHit = pattern.bassPattern.find(b => b.step === step);
        if (bassHit) {
          playBassNote(c, bassHit.freq, time, bassHit.dur ?? stepDur * 2);
        }
      }
    }
  }

  const totalDuration = totalSteps * stepDur;
  const timeout = setTimeout(() => {
    playing = false;
  }, totalDuration * 1000);

  return {
    stop: () => {
      if (!stopped) {
        stopped = true;
        playing = false;
        clearTimeout(timeout);
        // Close and recreate context to stop all sounds
        if (ctx) {
          ctx.close();
          ctx = null;
        }
      }
    },
    isPlaying: () => playing,
  };
};

export const getPatternBpm = (genreName: string): number => {
  return (GENRE_PATTERNS[genreName] || DEFAULT_PATTERN).bpm;
};

export const hasGenrePattern = (genreName: string): boolean => {
  return genreName in GENRE_PATTERNS;
};
