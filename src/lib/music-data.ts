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
  description: string;
  promptTips: string[];
  sampleLinks: { label: string; url: string }[];
  subgenres?: string[];
}

export const GENRES: GenreInfo[] = [
  {
    name: 'Pop', bpm: '100-130', timeSignature: '4/4',
    commonScales: ['Major', 'Pentatonic Major'],
    characteristics: ['Catchy melodies', 'Verse-chorus form', 'Simple harmonies', 'Hook-driven'],
    keyArtists: ['The Beatles', 'Michael Jackson', 'Taylor Swift', 'Billie Eilish'],
    description: 'The most commercially accessible genre. Built around memorable hooks, strong choruses, and polished production. Modern pop blends electronic, R&B, and hip-hop elements.',
    promptTips: ['"upbeat pop song with catchy chorus"', '"modern pop ballad, Billie Eilish style"', '"synth-pop with 80s vibes"'],
    sampleLinks: [
      { label: '🎵 Pop Beat Loop', url: 'https://cdn.pixabay.com/audio/2024/11/29/audio_90a07a6412.mp3' },
      { label: '🎵 Pop Piano Melody', url: 'https://cdn.pixabay.com/audio/2024/09/18/audio_6e2966fcbc.mp3' },
    ],
    subgenres: ['Synth-Pop', 'Electropop', 'Indie Pop', 'Dream Pop', 'Art Pop', 'K-Pop'],
  },
  {
    name: 'Hip-Hop', bpm: '60-100', timeSignature: '4/4',
    commonScales: ['Pentatonic Minor', 'Blues', 'Phrygian'],
    characteristics: ['Heavy bass', 'Sampled beats', 'Rhythmic vocals', '808 drums'],
    keyArtists: ['Kanye West', 'Kendrick Lamar', 'J Dilla', 'Drake'],
    description: 'Born in the Bronx in the 1970s. Characterized by rhythmic vocal delivery (rapping), sampling, and heavy bass. Modern hip-hop blends melodic elements with trap production.',
    promptTips: ['"boom bap hip-hop beat, 90s style"', '"dark trap beat with 808s"', '"melodic hip-hop, Drake vibes"'],
    sampleLinks: [
      { label: '🎵 Boom Bap Beat', url: 'https://cdn.pixabay.com/audio/2024/09/12/audio_0b3fa726a3.mp3' },
      { label: '🎵 Lo-fi Hip-Hop', url: 'https://cdn.pixabay.com/audio/2024/04/16/audio_73e0c0a808.mp3' },
    ],
    subgenres: ['Boom Bap', 'Trap', 'Drill', 'Lo-fi Hip-Hop', 'Cloud Rap', 'Conscious Hip-Hop'],
  },
  {
    name: 'Trap', bpm: '130-170 (half-time feel)', timeSignature: '4/4',
    commonScales: ['Phrygian', 'Natural Minor', 'Pentatonic Minor'],
    characteristics: ['Booming 808 bass', 'Triplet hi-hats', 'Dark melodies', 'Half-time snare', 'Autotune vocals'],
    keyArtists: ['Future', 'Travis Scott', 'Metro Boomin', 'Young Thug'],
    description: 'A subgenre of hip-hop originating from Atlanta. Defined by its heavy 808 bass, rapid hi-hat rolls, dark synths, and half-time drum patterns. Dominated mainstream music since the 2010s.',
    promptTips: ['"heavy trap beat, 808 bass, triplet hi-hats"', '"Travis Scott type beat, dark and atmospheric"', '"melodic trap with autotune vocals"'],
    sampleLinks: [
      { label: '🎵 Trap 808 Beat', url: 'https://cdn.pixabay.com/audio/2023/10/26/audio_45ea2e3c11.mp3' },
      { label: '🎵 Dark Trap Loop', url: 'https://cdn.pixabay.com/audio/2024/02/14/audio_68eda8a5d3.mp3' },
    ],
    subgenres: ['Melodic Trap', 'Hard Trap', 'Phonk', 'Rage Beats'],
  },
  {
    name: 'Drill', bpm: '140-150', timeSignature: '4/4',
    commonScales: ['Natural Minor', 'Phrygian', 'Harmonic Minor'],
    characteristics: ['Sliding 808 bass', 'Aggressive hi-hats', 'Dark piano melodies', 'Bouncy drum patterns'],
    keyArtists: ['Chief Keef', 'Pop Smoke', 'Central Cee', 'Headie One'],
    description: 'Originated in Chicago, evolved into UK Drill (darker, more complex). Known for sliding 808s, aggressive energy, and dark minor-key melodies. NYC drill added sample-heavy beats.',
    promptTips: ['"UK drill beat, sliding 808s, dark piano"', '"NY drill with sample chops"', '"aggressive drill beat, 140 BPM"'],
    sampleLinks: [
      { label: '🎵 UK Drill Beat', url: 'https://cdn.pixabay.com/audio/2024/06/13/audio_e5f8b31b81.mp3' },
    ],
    subgenres: ['Chicago Drill', 'UK Drill', 'NY Drill', 'Brooklyn Drill'],
  },
  {
    name: 'Funk', bpm: '100-130', timeSignature: '4/4',
    commonScales: ['Dorian', 'Mixolydian', 'Pentatonic Minor'],
    characteristics: ['Syncopated bass lines', 'Tight rhythm section', 'Horn stabs', 'Wah-wah guitar', 'Groove-heavy'],
    keyArtists: ['James Brown', 'Parliament-Funkadelic', 'Prince', 'Earth Wind & Fire'],
    description: 'All about THE GROOVE. Funk emphasizes the "one" (first beat), features syncopated bass lines, tight drums, and horn sections. The foundation of modern groove-based music including hip-hop and dance music.',
    promptTips: ['"funky groove with slap bass and horns"', '"70s funk, James Brown style"', '"modern funk, Daft Punk inspired"'],
    sampleLinks: [
      { label: '🎵 Funky Groove', url: 'https://cdn.pixabay.com/audio/2024/09/24/audio_e4a5da2ff3.mp3' },
      { label: '🎵 Funk Bass Line', url: 'https://cdn.pixabay.com/audio/2022/12/23/audio_5e174bbc16.mp3' },
    ],
    subgenres: ['P-Funk', 'G-Funk', 'Electro-Funk', 'Nu-Funk', 'Boogie'],
  },
  {
    name: 'Amapiano', bpm: '110-120', timeSignature: '4/4',
    commonScales: ['Major', 'Dorian', 'Pentatonic Major'],
    characteristics: ['Log drum bass', 'Jazzy piano chords', 'Percussion-heavy', 'Shakers', 'Vocal chants', 'Warm pads'],
    keyArtists: ['Kabza De Small', 'DJ Maphorisa', 'Uncle Waffles', 'Vigro Deep'],
    description: 'A South African genre blending deep house, jazz, and lounge music. Characterized by wide, detuned synth bass (log drums), jazzy piano melodies, and intricate percussion patterns. Exploded globally in the 2020s.',
    promptTips: ['"amapiano beat with log drum bass and jazzy piano"', '"South African amapiano, deep house vibes"', '"amapiano with vocal chants and shakers"'],
    sampleLinks: [
      { label: '🎵 Amapiano Groove', url: 'https://cdn.pixabay.com/audio/2023/07/19/audio_e1b87cca2b.mp3' },
    ],
    subgenres: ['Private School Amapiano', 'Mainstream Amapiano', 'Tech Amapiano'],
  },
  {
    name: 'Afrobeats', bpm: '95-120', timeSignature: '4/4',
    commonScales: ['Major', 'Dorian', 'Pentatonic Major'],
    characteristics: ['Polyrhythmic percussion', 'Call and response', 'Pidgin/Yoruba vocals', 'Guitar licks', 'Danceable'],
    keyArtists: ['Burna Boy', 'Wizkid', 'Davido', 'Tems', 'Fela Kuti'],
    description: 'Modern West African pop music rooted in Fela Kuti\'s Afrobeat. Combines African rhythms with pop, dancehall, and hip-hop. Not to be confused with Fela\'s "Afrobeat" (one word). Global phenomenon since 2019.',
    promptTips: ['"Afrobeats song with guitar licks and dancehall vibes"', '"Burna Boy style Afrobeats"', '"Afro-fusion with R&B elements"'],
    sampleLinks: [
      { label: '🎵 Afrobeats Rhythm', url: 'https://cdn.pixabay.com/audio/2024/01/18/audio_cb73ddb46e.mp3' },
    ],
    subgenres: ['Afro-Fusion', 'Afro-Pop', 'Alte', 'Afro-Swing'],
  },
  {
    name: 'Hyperpop', bpm: '140-180', timeSignature: '4/4',
    commonScales: ['Major', 'Chromatic', 'Whole Tone'],
    characteristics: ['Extreme autotune', 'Distorted bass', 'Glitchy production', 'Pitched-up vocals', 'Maximalist', 'Bitcrushed'],
    keyArtists: ['100 gecs', 'Charli XCX', 'A.G. Cook', 'SOPHIE', 'Bladee'],
    description: 'An experimental genre that takes pop to extremes—louder, faster, more distorted. Features heavily processed vocals, chaotic production, and deliberately "ugly" yet catchy sonic choices. Internet-native genre that blurs all boundaries.',
    promptTips: ['"hyperpop with pitched vocals, glitchy production"', '"100 gecs style, chaotic and distorted"', '"bubblegum bass with extreme autotune"'],
    sampleLinks: [
      { label: '🎵 Glitchy Electronic', url: 'https://cdn.pixabay.com/audio/2024/03/11/audio_0dc2f53143.mp3' },
    ],
    subgenres: ['Bubblegum Bass', 'Glitchcore', 'Digicore', 'Nightcore'],
  },
  {
    name: 'R&B / Soul', bpm: '60-100', timeSignature: '4/4',
    commonScales: ['Dorian', 'Pentatonic Minor', 'Mixolydian'],
    characteristics: ['Smooth vocals', 'Groove-focused', 'Rich harmonies', 'Emotional expression', 'Neo-soul textures'],
    keyArtists: ['Stevie Wonder', 'D\'Angelo', 'Frank Ocean', 'SZA', 'The Weeknd'],
    description: 'Rhythm and Blues—rooted in gospel and jazz. Modern R&B ranges from smooth, traditional soul to experimental alt-R&B. Always prioritizes vocal expression, groove, and emotional depth.',
    promptTips: ['"smooth R&B with lush harmonies"', '"alt-R&B, Frank Ocean vibes"', '"neo-soul with warm analog keys"'],
    sampleLinks: [
      { label: '🎵 R&B Groove', url: 'https://cdn.pixabay.com/audio/2024/07/23/audio_5765e788be.mp3' },
      { label: '🎵 Soul Keys', url: 'https://cdn.pixabay.com/audio/2023/10/05/audio_3aaab4e08d.mp3' },
    ],
    subgenres: ['Neo-Soul', 'Alt-R&B', 'PBR&B', 'Quiet Storm', 'Contemporary R&B'],
  },
  {
    name: 'Jazz', bpm: '80-200', timeSignature: '4/4, 3/4',
    commonScales: ['Dorian', 'Mixolydian', 'Melodic Minor', 'Lydian'],
    characteristics: ['Complex harmony', 'Improvisation', 'Swing feel', '7th/9th/13th chords', 'Walking bass'],
    keyArtists: ['Miles Davis', 'John Coltrane', 'Bill Evans', 'Herbie Hancock'],
    description: 'America\'s classical music. Built on improvisation, complex chord extensions, and swing feel. From bebop to fusion, jazz is the foundation of harmonic sophistication in all popular music.',
    promptTips: ['"smooth jazz with walking bass"', '"bebop jazz, fast tempo improvisations"', '"jazz fusion with electronic elements"'],
    sampleLinks: [
      { label: '🎵 Jazz Piano Trio', url: 'https://cdn.pixabay.com/audio/2024/09/10/audio_6b59c98a79.mp3' },
      { label: '🎵 Smooth Jazz', url: 'https://cdn.pixabay.com/audio/2023/05/16/audio_166b475509.mp3' },
    ],
    subgenres: ['Bebop', 'Cool Jazz', 'Free Jazz', 'Fusion', 'Smooth Jazz', 'Acid Jazz'],
  },
  {
    name: 'Blues', bpm: '60-120', timeSignature: '4/4, 12/8',
    commonScales: ['Blues', 'Pentatonic Minor'],
    characteristics: ['12-bar form', 'Call & response', 'Blue notes', 'Expressive bends', 'Emotional guitar'],
    keyArtists: ['B.B. King', 'Muddy Waters', 'Robert Johnson', 'Stevie Ray Vaughan'],
    description: 'The root of virtually all Western popular music. Originated from African American spirituals and work songs. The 12-bar blues progression and blue note scale are used across every genre.',
    promptTips: ['"delta blues with slide guitar"', '"electric blues, B.B. King style"', '"slow blues ballad with soulful guitar"'],
    sampleLinks: [
      { label: '🎵 Blues Guitar', url: 'https://cdn.pixabay.com/audio/2023/08/10/audio_a0e6c557e1.mp3' },
    ],
    subgenres: ['Delta Blues', 'Chicago Blues', 'Electric Blues', 'Blues Rock'],
  },
  {
    name: 'Electronic / EDM', bpm: '120-150', timeSignature: '4/4',
    commonScales: ['Natural Minor', 'Phrygian', 'Whole Tone'],
    characteristics: ['Synthesizers', 'Build-up & drop', 'Four-on-the-floor kick', 'Heavy processing', 'Sidechain compression'],
    keyArtists: ['Daft Punk', 'Deadmau5', 'Skrillex', 'Calvin Harris'],
    description: 'Broad umbrella for music made primarily with electronic instruments. From ambient textures to face-melting drops. The build-up/drop structure defines mainstream EDM.',
    promptTips: ['"EDM track with massive drop and build-up"', '"progressive house, melodic and euphoric"', '"dubstep with heavy wobble bass"'],
    sampleLinks: [
      { label: '🎵 EDM Drop', url: 'https://cdn.pixabay.com/audio/2024/06/06/audio_48e9cf2ffa.mp3' },
      { label: '🎵 House Beat', url: 'https://cdn.pixabay.com/audio/2024/08/06/audio_69a61c5e14.mp3' },
    ],
    subgenres: ['House', 'Techno', 'Dubstep', 'Drum & Bass', 'Trance', 'Future Bass'],
  },
  {
    name: 'House', bpm: '120-130', timeSignature: '4/4',
    commonScales: ['Natural Minor', 'Dorian', 'Major'],
    characteristics: ['Four-on-the-floor kick', 'Offbeat hi-hats', 'Synth stabs', 'Vocal samples', 'Warm basslines'],
    keyArtists: ['Frankie Knuckles', 'Disclosure', 'Fisher', 'Chris Lake'],
    description: 'Born in Chicago in the early 80s. The four-on-the-floor kick pattern is its heartbeat. From deep and soulful to hard and driving, house music is the backbone of club culture worldwide.',
    promptTips: ['"deep house with warm bass and vocal chops"', '"tech house with driving rhythm"', '"soulful house, disco influenced"'],
    sampleLinks: [
      { label: '🎵 Deep House Groove', url: 'https://cdn.pixabay.com/audio/2024/08/06/audio_69a61c5e14.mp3' },
    ],
    subgenres: ['Deep House', 'Tech House', 'Progressive House', 'Afro House', 'Acid House'],
  },
  {
    name: 'Techno', bpm: '125-150', timeSignature: '4/4',
    commonScales: ['Phrygian', 'Natural Minor'],
    characteristics: ['Repetitive patterns', 'Industrial sounds', 'Minimal melody', 'Hypnotic grooves', 'Dark atmosphere'],
    keyArtists: ['Carl Cox', 'Nina Kraviz', 'Amelie Lens', 'Jeff Mills'],
    description: 'Born in Detroit in the mid-80s. Hypnotic, repetitive, and often dark. Techno prioritizes rhythm and texture over melody. The ultimate "lose yourself in the music" experience.',
    promptTips: ['"dark techno, industrial and hypnotic"', '"minimal techno, repetitive and groovy"', '"acid techno with 303 bass"'],
    sampleLinks: [
      { label: '🎵 Techno Loop', url: 'https://cdn.pixabay.com/audio/2024/10/31/audio_f91e5b0d58.mp3' },
    ],
    subgenres: ['Minimal Techno', 'Industrial Techno', 'Acid Techno', 'Dub Techno', 'Hard Techno'],
  },
  {
    name: 'Drum & Bass', bpm: '160-180', timeSignature: '4/4',
    commonScales: ['Natural Minor', 'Phrygian', 'Harmonic Minor'],
    characteristics: ['Fast breakbeats', 'Heavy sub-bass', 'Chopped drums', 'Reese bass', 'Atmospheric pads'],
    keyArtists: ['Goldie', 'Andy C', 'Chase & Status', 'Sub Focus'],
    description: 'High-energy electronic music driven by fast, syncopated breakbeats over heavy sub-bass. From liquid and soulful to dark and heavy (neurofunk). The fastest mainstream electronic genre.',
    promptTips: ['"drum and bass with liquid vibes"', '"neurofunk DnB, heavy and dark"', '"jungle breakbeat with ragga vocals"'],
    sampleLinks: [
      { label: '🎵 DnB Breakbeat', url: 'https://cdn.pixabay.com/audio/2024/02/07/audio_d9eb886306.mp3' },
    ],
    subgenres: ['Liquid DnB', 'Neurofunk', 'Jump Up', 'Jungle'],
  },
  {
    name: 'Lo-fi', bpm: '70-90', timeSignature: '4/4',
    commonScales: ['Dorian', 'Pentatonic Minor', 'Major'],
    characteristics: ['Vinyl crackle', 'Jazzy chords', 'Muffled mix', 'Tape saturation', 'Chill vibes', 'Side-chained kick'],
    keyArtists: ['Nujabes', 'J Dilla', 'tomppabeats', 'idealism'],
    description: 'Intentionally imperfect, warm, and nostalgic. Lo-fi hip-hop uses jazz samples, vinyl noise, and tape effects to create a cozy, study-friendly atmosphere. An internet culture phenomenon.',
    promptTips: ['"lo-fi hip-hop beat with vinyl crackle"', '"chill lo-fi, jazzy piano and tape saturation"', '"lo-fi study music, Nujabes inspired"'],
    sampleLinks: [
      { label: '🎵 Lo-fi Chill', url: 'https://cdn.pixabay.com/audio/2024/04/16/audio_73e0c0a808.mp3' },
    ],
    subgenres: ['Lo-fi Hip-Hop', 'Lo-fi House', 'Chillhop'],
  },
  {
    name: 'Reggaeton', bpm: '85-100', timeSignature: '4/4',
    commonScales: ['Natural Minor', 'Phrygian', 'Harmonic Minor'],
    characteristics: ['Dembow rhythm', 'Latin percussion', 'Spanish vocals', 'Perreo bass', 'Danceable'],
    keyArtists: ['Daddy Yankee', 'Bad Bunny', 'J Balvin', 'Ozuna'],
    description: 'Born in Puerto Rico, built on the iconic "dembow" rhythm pattern (boom-ch-boom-chick). Reggaeton fuses Latin Caribbean music with hip-hop and dancehall. Dominates global charts.',
    promptTips: ['"reggaeton with dembow rhythm"', '"Bad Bunny style reggaeton, modern"', '"perreo beat with Latin percussion"'],
    sampleLinks: [
      { label: '🎵 Reggaeton Dembow', url: 'https://cdn.pixabay.com/audio/2024/01/16/audio_3979e5ceab.mp3' },
    ],
    subgenres: ['Perreo', 'Reggaeton Romántico', 'Urbano Latino'],
  },
  {
    name: 'Dancehall', bpm: '90-110', timeSignature: '4/4',
    commonScales: ['Natural Minor', 'Pentatonic Minor', 'Major'],
    characteristics: ['Riddim patterns', 'Deejay vocals', 'Digital beats', 'Caribbean bass', 'Energetic'],
    keyArtists: ['Vybz Kartel', 'Sean Paul', 'Popcaan', 'Shenseea'],
    description: 'Jamaican genre born from reggae but faster and more digital. "Riddims" (instrumental beats) are shared across multiple artists. Hugely influential on pop, hip-hop, and Afrobeats.',
    promptTips: ['"dancehall riddim, Caribbean vibes"', '"modern dancehall with digital production"', '"dancehall beat, Sean Paul style"'],
    sampleLinks: [
      { label: '🎵 Dancehall Riddim', url: 'https://cdn.pixabay.com/audio/2022/05/16/audio_1bfdb6ec64.mp3' },
    ],
    subgenres: ['Digital Dancehall', 'Bashment', 'Moombahton'],
  },
  {
    name: 'Reggae', bpm: '60-90', timeSignature: '4/4',
    commonScales: ['Major', 'Pentatonic Major', 'Mixolydian'],
    characteristics: ['Offbeat guitar skank', 'One-drop rhythm', 'Bass-heavy', 'Dub effects', 'Roots lyrics'],
    keyArtists: ['Bob Marley', 'Peter Tosh', 'Lee "Scratch" Perry', 'Chronixx'],
    description: 'Jamaica\'s most famous export. The offbeat guitar "skank" and one-drop drum pattern are instantly recognizable. Dub reggae pioneered many production techniques (delay, reverb, mixing as instrument).',
    promptTips: ['"roots reggae with one-drop rhythm"', '"dub reggae with heavy delay and reverb"', '"modern reggae, Chronixx vibes"'],
    sampleLinks: [
      { label: '🎵 Reggae Groove', url: 'https://cdn.pixabay.com/audio/2023/09/23/audio_9c28e44d49.mp3' },
    ],
    subgenres: ['Roots Reggae', 'Dub', 'Lovers Rock', 'Ska'],
  },
  {
    name: 'Synthwave / Retrowave', bpm: '80-120', timeSignature: '4/4',
    commonScales: ['Natural Minor', 'Dorian', 'Harmonic Minor'],
    characteristics: ['Analog synths', 'Gated reverb drums', '80s nostalgia', 'Arpeggiated bass', 'Neon aesthetic'],
    keyArtists: ['The Midnight', 'Kavinsky', 'Perturbator', 'Gunship'],
    description: 'A modern genre paying homage to 1980s electronic music, film scores, and video games. Heavy use of analog synthesizers, gated reverb, and retro-futuristic aesthetics.',
    promptTips: ['"synthwave with retro 80s synths"', '"dark synthwave, Blade Runner vibes"', '"outrun music with arpeggiated bass"'],
    sampleLinks: [
      { label: '🎵 Synthwave Retro', url: 'https://cdn.pixabay.com/audio/2023/06/07/audio_79aa530d6e.mp3' },
    ],
    subgenres: ['Outrun', 'Darksynth', 'Chillwave', 'Vaporwave'],
  },
  {
    name: 'Phonk', bpm: '130-160', timeSignature: '4/4',
    commonScales: ['Phrygian', 'Natural Minor', 'Blues'],
    characteristics: ['Memphis rap samples', 'Cowbell', 'Distorted 808s', 'Chopped vocals', 'Drifting aesthetic'],
    keyArtists: ['DJ Smokey', 'Kordhell', 'INTERWORLD', 'Freddie Dredd'],
    description: 'Blends Memphis rap aesthetics with modern electronic production. Known for chopped vocal samples, heavy cowbell, and aggressive 808s. Viral on TikTok/car culture. "Drift phonk" is the most popular subtype.',
    promptTips: ['"drift phonk with heavy bass and cowbell"', '"dark phonk, Memphis rap samples"', '"aggressive phonk beat, distorted 808"'],
    sampleLinks: [
      { label: '🎵 Phonk Beat', url: 'https://cdn.pixabay.com/audio/2024/02/14/audio_68eda8a5d3.mp3' },
    ],
    subgenres: ['Drift Phonk', 'Brazilian Phonk', 'House Phonk'],
  },
  {
    name: 'Rock', bpm: '100-140', timeSignature: '4/4',
    commonScales: ['Pentatonic Minor', 'Natural Minor', 'Blues'],
    characteristics: ['Power chords', 'Guitar riffs', 'Strong backbeat', 'High energy', 'Band-driven'],
    keyArtists: ['Led Zeppelin', 'Nirvana', 'Radiohead', 'Arctic Monkeys'],
    description: 'Guitar-driven music with strong rhythmic foundation. From classic rock riffs to alternative experimentation, rock is built on the power of the electric guitar, bass, and drums.',
    promptTips: ['"classic rock with heavy guitar riffs"', '"indie rock, Arctic Monkeys style"', '"alternative rock with grunge influences"'],
    sampleLinks: [
      { label: '🎵 Rock Riff', url: 'https://cdn.pixabay.com/audio/2023/10/03/audio_acaabdfb05.mp3' },
    ],
    subgenres: ['Classic Rock', 'Indie Rock', 'Alternative', 'Punk Rock', 'Grunge', 'Metal'],
  },
  {
    name: 'Country', bpm: '80-140', timeSignature: '4/4, 3/4',
    commonScales: ['Major', 'Pentatonic Major', 'Mixolydian'],
    characteristics: ['Acoustic guitar', 'Pedal steel', 'Fiddle', 'Storytelling lyrics', 'Twangy vocals'],
    keyArtists: ['Johnny Cash', 'Dolly Parton', 'Morgan Wallen', 'Chris Stapleton'],
    description: 'Rooted in American folk, bluegrass, and Western swing. Modern country blends pop and rock elements while maintaining storytelling tradition. Pedal steel guitar and fiddle are signature sounds.',
    promptTips: ['"country ballad with acoustic guitar and pedal steel"', '"modern country pop, Morgan Wallen style"', '"outlaw country, Johnny Cash vibes"'],
    sampleLinks: [
      { label: '🎵 Country Acoustic', url: 'https://cdn.pixabay.com/audio/2023/12/07/audio_1c15e78a27.mp3' },
    ],
    subgenres: ['Country Pop', 'Outlaw Country', 'Bluegrass', 'Americana', 'Bro-Country'],
  },
  {
    name: 'Classical', bpm: 'Variable', timeSignature: 'Variable',
    commonScales: ['Major', 'Natural Minor', 'Harmonic Minor'],
    characteristics: ['Orchestral', 'Written scores', 'Complex structure', 'Dynamic range', 'Counterpoint'],
    keyArtists: ['Bach', 'Beethoven', 'Debussy', 'Hans Zimmer'],
    description: 'Western art music spanning centuries. From Baroque counterpoint to Romantic symphonies to modern film scores. The most harmonically and structurally complex tradition in music.',
    promptTips: ['"orchestral classical, epic film score"', '"solo piano, Chopin inspired"', '"cinematic orchestral, Hans Zimmer style"'],
    sampleLinks: [
      { label: '🎵 Orchestral', url: 'https://cdn.pixabay.com/audio/2024/07/17/audio_2d1bcc3c3f.mp3' },
    ],
    subgenres: ['Baroque', 'Romantic', 'Impressionist', 'Neoclassical', 'Film Score'],
  },
  {
    name: 'Gospel', bpm: '70-130', timeSignature: '4/4, 3/4, 6/8',
    commonScales: ['Major', 'Pentatonic Major', 'Dorian'],
    characteristics: ['Choir harmonies', 'Organ', 'Call and response', 'Emotional dynamics', 'Uplifting'],
    keyArtists: ['Kirk Franklin', 'Mahalia Jackson', 'Fred Hammond', 'Tasha Cobbs Leonard'],
    description: 'Rooted in African American church traditions. Features powerful vocal harmonies, organ, and intensely emotional dynamics. Gospel harmony and vocal techniques directly influenced soul, R&B, and pop.',
    promptTips: ['"gospel choir with organ"', '"modern gospel, Kirk Franklin style"', '"gospel-influenced R&B with choir harmonies"'],
    sampleLinks: [
      { label: '🎵 Gospel Organ', url: 'https://cdn.pixabay.com/audio/2024/05/22/audio_e5a25ba3cb.mp3' },
    ],
    subgenres: ['Traditional Gospel', 'Contemporary Gospel', 'Gospel Choir', 'Urban Gospel'],
  },
  {
    name: 'Latin / Salsa', bpm: '150-250', timeSignature: '4/4',
    commonScales: ['Major', 'Natural Minor', 'Harmonic Minor'],
    characteristics: ['Clave rhythm', 'Brass section', 'Timbales', 'Congas', 'Piano montuno'],
    keyArtists: ['Celia Cruz', 'Tito Puente', 'Marc Anthony', 'Hector Lavoe'],
    description: 'Built around the "clave" rhythm pattern, salsa blends Cuban son, jazz, and Puerto Rican bomba. The clave is arguably the most important rhythmic concept in Latin music.',
    promptTips: ['"salsa with brass section and clave rhythm"', '"Latin jazz with piano montuno"', '"tropical salsa, Celia Cruz inspired"'],
    sampleLinks: [
      { label: '🎵 Latin Rhythm', url: 'https://cdn.pixabay.com/audio/2023/04/04/audio_5bfb8b2a77.mp3' },
    ],
    subgenres: ['Salsa', 'Bachata', 'Merengue', 'Cumbia', 'Son Cubano'],
  },
];
