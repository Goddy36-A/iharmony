// Web Audio API synthesizer for music theory learning
let audioContext: AudioContext | null = null;

const getAudioContext = (): AudioContext => {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
};

const NOTE_FREQUENCIES: Record<string, number> = {
  'C3': 130.81, 'C#3': 138.59, 'D3': 146.83, 'D#3': 155.56, 'E3': 164.81,
  'F3': 174.61, 'F#3': 185.00, 'G3': 196.00, 'G#3': 207.65, 'A3': 220.00,
  'A#3': 233.08, 'B3': 246.94,
  'C4': 261.63, 'C#4': 277.18, 'D4': 293.66, 'D#4': 311.13, 'E4': 329.63,
  'F4': 349.23, 'F#4': 369.99, 'G4': 392.00, 'G#4': 415.30, 'A4': 440.00,
  'A#4': 466.16, 'B4': 493.88,
  'C5': 523.25, 'C#5': 554.37, 'D5': 587.33, 'D#5': 622.25, 'E5': 659.26,
  'F5': 698.46, 'F#5': 739.99, 'G5': 783.99, 'G#5': 830.61, 'A5': 880.00,
  'A#5': 932.33, 'B5': 987.77, 'C6': 1046.50,
};

export const ALL_NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export const playNote = (note: string, duration = 0.4, type: OscillatorType = 'triangle') => {
  const ctx = getAudioContext();
  const freq = NOTE_FREQUENCIES[note];
  if (!freq) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  osc.type = type;
  osc.frequency.value = freq;

  filter.type = 'lowpass';
  filter.frequency.value = 2000;

  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + duration + 0.05);
};

export const playChord = (notes: string[], duration = 0.8) => {
  notes.forEach(note => playNote(note, duration, 'triangle'));
};

export const playSequence = async (notes: string[], tempo = 200) => {
  for (const note of notes) {
    playNote(note, tempo / 1000 * 0.8);
    await new Promise(resolve => setTimeout(resolve, tempo));
  }
};

// Scale definitions: intervals from root in semitones
export const SCALES: Record<string, { intervals: number[]; description: string }> = {
  'Major': { intervals: [0, 2, 4, 5, 7, 9, 11], description: 'Happy, bright, resolved' },
  'Natural Minor': { intervals: [0, 2, 3, 5, 7, 8, 10], description: 'Sad, dark, emotional' },
  'Harmonic Minor': { intervals: [0, 2, 3, 5, 7, 8, 11], description: 'Exotic, dramatic tension' },
  'Melodic Minor': { intervals: [0, 2, 3, 5, 7, 9, 11], description: 'Jazz, sophisticated' },
  'Dorian': { intervals: [0, 2, 3, 5, 7, 9, 10], description: 'Jazzy minor, funky' },
  'Mixolydian': { intervals: [0, 2, 4, 5, 7, 9, 10], description: 'Bluesy major, rock' },
  'Phrygian': { intervals: [0, 1, 3, 5, 7, 8, 10], description: 'Spanish, dark, flamenco' },
  'Lydian': { intervals: [0, 2, 4, 6, 7, 9, 11], description: 'Dreamy, ethereal, floating' },
  'Pentatonic Major': { intervals: [0, 2, 4, 7, 9], description: 'Universal, simple, folk' },
  'Pentatonic Minor': { intervals: [0, 3, 5, 7, 10], description: 'Blues, rock solos' },
  'Blues': { intervals: [0, 3, 5, 6, 7, 10], description: 'Soulful, gritty, expressive' },
  'Whole Tone': { intervals: [0, 2, 4, 6, 8, 10], description: 'Dreamy, impressionist' },
  'Chromatic': { intervals: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], description: 'All 12 notes' },
};

export const getScaleNotes = (root: string, scaleName: string, octave = 4): string[] => {
  const scale = SCALES[scaleName];
  if (!scale) return [];
  const rootIndex = ALL_NOTES.indexOf(root);
  if (rootIndex === -1) return [];

  return scale.intervals.map(interval => {
    const noteIndex = (rootIndex + interval) % 12;
    const noteOctave = octave + Math.floor((rootIndex + interval) / 12);
    return `${ALL_NOTES[noteIndex]}${noteOctave}`;
  });
};

export const getScaleNoteNames = (root: string, scaleName: string): string[] => {
  const scale = SCALES[scaleName];
  if (!scale) return [];
  const rootIndex = ALL_NOTES.indexOf(root);
  return scale.intervals.map(interval => ALL_NOTES[(rootIndex + interval) % 12]);
};

// Chord progressions
export interface ChordProgression {
  name: string;
  numerals: string[];
  description: string;
  genre: string;
}

export const CHORD_PROGRESSIONS: ChordProgression[] = [
  { name: 'Pop Classic', numerals: ['I', 'V', 'vi', 'IV'], description: 'The most popular progression in modern pop', genre: 'Pop' },
  { name: '12-Bar Blues', numerals: ['I', 'I', 'I', 'I', 'IV', 'IV', 'I', 'I', 'V', 'IV', 'I', 'V'], description: 'Foundation of blues and early rock', genre: 'Blues' },
  { name: 'Jazz ii-V-I', numerals: ['ii', 'V', 'I'], description: 'The most important jazz progression', genre: 'Jazz' },
  { name: 'Sad Progression', numerals: ['vi', 'IV', 'I', 'V'], description: 'Emotional, melancholic feel', genre: 'Pop/Rock' },
  { name: 'Andalusian Cadence', numerals: ['i', 'VII', 'VI', 'V'], description: 'Spanish/flamenco flavor', genre: 'World' },
  { name: 'Doo-Wop', numerals: ['I', 'vi', 'IV', 'V'], description: '50s rock and roll classic', genre: 'Rock' },
  { name: 'Canon', numerals: ['I', 'V', 'vi', 'iii', 'IV', 'I', 'IV', 'V'], description: 'Pachelbel\'s famous progression', genre: 'Classical' },
  { name: 'Trap/Hip-Hop', numerals: ['i', 'VI', 'III', 'VII'], description: 'Dark, modern trap feel', genre: 'Hip-Hop' },
];

// Build chords from scale degree
const MAJOR_CHORD_MAP: Record<string, number[]> = {
  'I': [0, 4, 7], 'ii': [2, 5, 9], 'iii': [4, 7, 11], 'IV': [5, 9, 12],
  'V': [7, 11, 14], 'vi': [9, 12, 16], 'vii°': [11, 14, 17],
  'i': [0, 3, 7], 'III': [3, 7, 10], 'VI': [8, 12, 15], 'VII': [10, 14, 17],
};

export const getChordNotes = (root: string, numeral: string, octave = 4): string[] => {
  const intervals = MAJOR_CHORD_MAP[numeral];
  if (!intervals) return [];
  const rootIndex = ALL_NOTES.indexOf(root);

  return intervals.map(interval => {
    const noteIndex = (rootIndex + interval) % 12;
    const noteOctave = octave + Math.floor((rootIndex + interval) / 12);
    return `${ALL_NOTES[noteIndex]}${noteOctave}`;
  });
};

// Song structures
export interface SongSection {
  name: string;
  bars: number;
  color: string;
}

export interface SongStructure {
  name: string;
  genre: string;
  sections: SongSection[];
  description: string;
}

export const SONG_STRUCTURES: SongStructure[] = [
  {
    name: 'Pop Song', genre: 'Pop',
    description: 'Standard verse-chorus format, catchy and memorable',
    sections: [
      { name: 'Intro', bars: 4, color: 'primary' },
      { name: 'Verse 1', bars: 8, color: 'secondary' },
      { name: 'Pre-Chorus', bars: 4, color: 'muted' },
      { name: 'Chorus', bars: 8, color: 'accent' },
      { name: 'Verse 2', bars: 8, color: 'secondary' },
      { name: 'Pre-Chorus', bars: 4, color: 'muted' },
      { name: 'Chorus', bars: 8, color: 'accent' },
      { name: 'Bridge', bars: 8, color: 'warm' },
      { name: 'Chorus', bars: 8, color: 'accent' },
      { name: 'Outro', bars: 4, color: 'primary' },
    ],
  },
  {
    name: 'EDM Track', genre: 'Electronic',
    description: 'Build-up and drop focused, high energy',
    sections: [
      { name: 'Intro', bars: 16, color: 'primary' },
      { name: 'Build-Up', bars: 8, color: 'secondary' },
      { name: 'Drop', bars: 16, color: 'accent' },
      { name: 'Breakdown', bars: 8, color: 'muted' },
      { name: 'Build-Up', bars: 8, color: 'secondary' },
      { name: 'Drop', bars: 16, color: 'accent' },
      { name: 'Outro', bars: 8, color: 'primary' },
    ],
  },
  {
    name: 'Hip-Hop Beat', genre: 'Hip-Hop',
    description: 'Loop-based with hook sections',
    sections: [
      { name: 'Intro', bars: 4, color: 'primary' },
      { name: 'Verse 1', bars: 16, color: 'secondary' },
      { name: 'Hook', bars: 8, color: 'accent' },
      { name: 'Verse 2', bars: 16, color: 'secondary' },
      { name: 'Hook', bars: 8, color: 'accent' },
      { name: 'Bridge', bars: 8, color: 'warm' },
      { name: 'Hook', bars: 8, color: 'accent' },
      { name: 'Outro', bars: 4, color: 'primary' },
    ],
  },
  {
    name: 'Blues Standard', genre: 'Blues',
    description: 'Classic 12-bar blues repeated format',
    sections: [
      { name: 'Intro', bars: 4, color: 'primary' },
      { name: '12-Bar (I)', bars: 12, color: 'secondary' },
      { name: '12-Bar (II)', bars: 12, color: 'secondary' },
      { name: 'Solo', bars: 12, color: 'accent' },
      { name: '12-Bar (III)', bars: 12, color: 'secondary' },
      { name: 'Turnaround', bars: 4, color: 'warm' },
    ],
  },
  {
    name: 'Jazz Standard', genre: 'Jazz',
    description: 'AABA form, improvisational',
    sections: [
      { name: 'Head A', bars: 8, color: 'primary' },
      { name: 'Head A', bars: 8, color: 'primary' },
      { name: 'Head B', bars: 8, color: 'accent' },
      { name: 'Head A', bars: 8, color: 'primary' },
      { name: 'Solo (A)', bars: 8, color: 'secondary' },
      { name: 'Solo (A)', bars: 8, color: 'secondary' },
      { name: 'Solo (B)', bars: 8, color: 'warm' },
      { name: 'Solo (A)', bars: 8, color: 'secondary' },
      { name: 'Head A', bars: 8, color: 'primary' },
      { name: 'Coda', bars: 4, color: 'muted' },
    ],
  },
];

// Genre info
export interface GenreInfo {
  name: string;
  bpm: string;
  timeSignature: string;
  commonScales: string[];
  characteristics: string[];
  keyArtists: string[];
}

export const GENRES: GenreInfo[] = [
  { name: 'Pop', bpm: '100-130', timeSignature: '4/4', commonScales: ['Major', 'Pentatonic Major'], characteristics: ['Catchy melodies', 'Verse-chorus form', 'Simple harmonies', 'Hook-driven'], keyArtists: ['The Beatles', 'Michael Jackson', 'Taylor Swift'] },
  { name: 'Hip-Hop', bpm: '60-100', timeSignature: '4/4', commonScales: ['Pentatonic Minor', 'Blues', 'Phrygian'], characteristics: ['Heavy bass', 'Sampled beats', 'Rhythmic vocals', '808 drums'], keyArtists: ['Kanye West', 'Kendrick Lamar', 'J Dilla'] },
  { name: 'Jazz', bpm: '80-200', timeSignature: '4/4, 3/4', commonScales: ['Dorian', 'Mixolydian', 'Melodic Minor'], characteristics: ['Complex harmony', 'Improvisation', 'Swing feel', '7th/9th chords'], keyArtists: ['Miles Davis', 'John Coltrane', 'Bill Evans'] },
  { name: 'Blues', bpm: '60-120', timeSignature: '4/4, 12/8', commonScales: ['Blues', 'Pentatonic Minor'], characteristics: ['12-bar form', 'Call & response', 'Blue notes', 'Expressive bends'], keyArtists: ['B.B. King', 'Muddy Waters', 'Robert Johnson'] },
  { name: 'Electronic/EDM', bpm: '120-150', timeSignature: '4/4', commonScales: ['Natural Minor', 'Phrygian', 'Whole Tone'], characteristics: ['Synthesizers', 'Build-up & drop', 'Repetitive loops', 'Heavy processing'], keyArtists: ['Daft Punk', 'Deadmau5', 'Aphex Twin'] },
  { name: 'R&B/Soul', bpm: '60-100', timeSignature: '4/4', commonScales: ['Dorian', 'Pentatonic Minor', 'Mixolydian'], characteristics: ['Smooth vocals', 'Groove-focused', 'Rich harmonies', 'Emotional expression'], keyArtists: ['Stevie Wonder', 'D\'Angelo', 'Frank Ocean'] },
  { name: 'Rock', bpm: '100-140', timeSignature: '4/4', commonScales: ['Pentatonic Minor', 'Natural Minor', 'Blues'], characteristics: ['Power chords', 'Guitar riffs', 'Strong backbeat', 'High energy'], keyArtists: ['Led Zeppelin', 'Nirvana', 'Radiohead'] },
  { name: 'Classical', bpm: 'Variable', timeSignature: 'Variable', commonScales: ['Major', 'Natural Minor', 'Harmonic Minor'], characteristics: ['Orchestral', 'Written scores', 'Complex structure', 'Dynamic range'], keyArtists: ['Bach', 'Beethoven', 'Debussy'] },
];
