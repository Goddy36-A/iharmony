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
export interface ScaleInfo {
  intervals: number[];
  description: string;
  mood: string;
  usedIn: string;
  howToHear: string;
  promptTip: string;
}

export const SCALES: Record<string, ScaleInfo> = {
  'Major': {
    intervals: [0, 2, 4, 5, 7, 9, 11],
    description: 'The "happy" scale. Think "Happy Birthday" or "Twinkle Twinkle Little Star." It sounds resolved, bright, and complete. Every pop song you\'ve ever hummed likely uses this scale.',
    mood: 'Happy, bright, uplifting, triumphant',
    usedIn: 'Pop, Country, Gospel, Children\'s music, Anthems',
    howToHear: 'Play all the white keys from C to C on a piano. That confident, "everything is fine" feeling? That\'s Major.',
    promptTip: 'Use "in major key" or "bright major melody" for uplifting tracks.',
  },
  'Natural Minor': {
    intervals: [0, 2, 3, 5, 7, 8, 10],
    description: 'The "sad" scale. If Major is sunshine, Minor is moonlight. It creates a darker, more emotional atmosphere. Most R&B, trap, and dramatic film scores live here.',
    mood: 'Sad, dark, emotional, introspective, mysterious',
    usedIn: 'R&B, Trap, Rock ballads, Film scores, Gothic music',
    howToHear: 'Play all white keys from A to A. That melancholic, bittersweet pull you feel? That\'s Natural Minor. Compare it to Major and you\'ll instantly hear the difference.',
    promptTip: 'Use "minor key", "dark minor melody", or "melancholic minor" in prompts.',
  },
  'Harmonic Minor': {
    intervals: [0, 2, 3, 5, 7, 8, 11],
    description: 'Natural Minor\'s dramatic cousin. By raising the 7th note one half-step, you get an exotic, almost Middle Eastern tension. That raised 7th creates an urgent pull back to the root note.',
    mood: 'Exotic, dramatic, tense, Middle Eastern, cinematic',
    usedIn: 'Metal, Flamenco, Middle Eastern music, Film villain themes, Neoclassical',
    howToHear: 'Play Natural Minor but raise the second-to-last note by one key. Hear that sudden tension? That "snake charmer" vibe? That\'s the raised 7th at work.',
    promptTip: 'Use "harmonic minor", "exotic scale", or "dramatic tension" for intense moments.',
  },
  'Melodic Minor': {
    intervals: [0, 2, 3, 5, 7, 9, 11],
    description: 'A sophisticated hybrid—minor at the bottom, major at the top. Jazz musicians live in this scale. It removes the awkward gap in Harmonic Minor for smoother melody writing.',
    mood: 'Sophisticated, jazzy, smooth, bittersweet',
    usedIn: 'Jazz, Neo-soul, Film scores, Fusion, Advanced pop',
    howToHear: 'It starts sad (minor 3rd) but ends bright (major 6th and 7th). This push-pull between sadness and hope is what makes it sound so emotionally complex.',
    promptTip: 'Use "melodic minor", "jazz scale", or "sophisticated harmony" for jazz-influenced tracks.',
  },
  'Dorian': {
    intervals: [0, 2, 3, 5, 7, 9, 10],
    description: 'The "cool minor" scale. It\'s like Natural Minor but with a brighter 6th note that gives it a groovy, less gloomy quality. The secret sauce behind funk and soul.',
    mood: 'Groovy, cool, funky, soulful, sophisticated',
    usedIn: 'Funk, Soul, Jazz, Lo-fi Hip-Hop, Santana, Daft Punk',
    howToHear: 'Play all white keys D to D. It\'s minor, but notice it doesn\'t feel as "sad"—more like a cool, confident strut. That slightly raised 6th gives it swagger.',
    promptTip: 'Use "dorian mode", "funky dorian groove", or "soulful dorian" for that smooth funk feel.',
  },
  'Mixolydian': {
    intervals: [0, 2, 4, 5, 7, 9, 10],
    description: 'A major scale with a blues twist. The lowered 7th gives it a rocking, bluesy, unresolved edge. Think classic rock riffs, blues jams, and gospel shouts.',
    mood: 'Bluesy, rocking, confident, earthy, raw',
    usedIn: 'Blues-rock, Classic rock, Country, Gospel, Grateful Dead, AC/DC',
    howToHear: 'Play all white keys G to G. Sounds like Major, but the ending feels like it wants to keep going rather than stop. That\'s the lowered 7th refusing to resolve.',
    promptTip: 'Use "mixolydian", "bluesy major", or "rock mode" for that classic rock/blues vibe.',
  },
  'Phrygian': {
    intervals: [0, 1, 3, 5, 7, 8, 10],
    description: 'The most exotic-sounding mode. That half-step between the 1st and 2nd note creates instant drama. It\'s flamenco guitars, metal breakdowns, and Middle Eastern mystique.',
    mood: 'Dark, exotic, Spanish, aggressive, mystical',
    usedIn: 'Flamenco, Metal, Trap, Drill, Middle Eastern music, Film scores',
    howToHear: 'Play all white keys E to E. That very first step (E to F) is tiny—just one key apart—and it immediately sounds "foreign" and tense. That\'s Phrygian\'s signature.',
    promptTip: 'Use "phrygian mode", "dark phrygian", or "Spanish phrygian" for dark, exotic vibes.',
  },
  'Lydian': {
    intervals: [0, 2, 4, 6, 7, 9, 11],
    description: 'The "dreamer" scale. By raising the 4th note of Major, everything floats and shimmers. It\'s the sound of wonder, magic, and sci-fi soundtracks (think The Simpsons theme).',
    mood: 'Dreamy, ethereal, magical, floating, wonderous',
    usedIn: 'Film scores (Spielberg/Williams), Dream pop, Ambient, Prog rock, The Simpsons',
    howToHear: 'Play all white keys F to F. That raised 4th (B natural instead of Bb) makes everything feel weightless, like you\'re floating above the clouds.',
    promptTip: 'Use "lydian mode", "dreamy lydian", or "ethereal floating" for magical, airy textures.',
  },
  'Pentatonic Major': {
    intervals: [0, 2, 4, 7, 9],
    description: 'The universal scale—found in music from every culture on Earth, from Chinese folk to African tribal songs to Bobby McFerrin. Only 5 notes, and they ALL sound good together. Impossible to play a wrong note.',
    mood: 'Universal, warm, simple, folk, accessible',
    usedIn: 'Folk worldwide, Pop melodies, Country, Children\'s songs, African music, Chinese music',
    howToHear: 'Play only the black keys on a piano. Seriously—just hit random black keys and it sounds musical. That\'s Pentatonic Major. It\'s the ultimate "safe" scale.',
    promptTip: 'Use "pentatonic melody", "simple folk melody", or "universal pentatonic" for accessible tunes.',
  },
  'Pentatonic Minor': {
    intervals: [0, 3, 5, 7, 10],
    description: 'The rock and blues soloist\'s best friend. Only 5 notes, but they carry ALL the emotion. Every guitar solo you\'ve ever air-guitared probably uses this scale. It\'s raw, soulful, and powerful.',
    mood: 'Bluesy, raw, soulful, powerful, gritty',
    usedIn: 'Blues, Rock solos, R&B, Hip-Hop melodies, West African music',
    howToHear: 'Think of the opening riff of "Smoke on the Water" or any classic guitar solo. Those big, expressive bends? Almost always Pentatonic Minor.',
    promptTip: 'Use "pentatonic minor solo", "bluesy pentatonic", or "rock guitar solo" for soulful leads.',
  },
  'Blues': {
    intervals: [0, 3, 5, 6, 7, 10],
    description: 'Pentatonic Minor with one extra "blue note" (the flat 5th/sharp 4th). That one added note is the entire difference between "nice solo" and "soul-crushing solo." It\'s the sound of pain, grit, and raw human emotion.',
    mood: 'Soulful, gritty, expressive, painful, raw, authentic',
    usedIn: 'Blues, Jazz, Rock, Gospel, R&B, Soul',
    howToHear: 'Take Pentatonic Minor and add one note right in the middle—that "wrong" note that bends and cries. B.B. King\'s guitar weeping? That\'s the blue note.',
    promptTip: 'Use "blues scale", "soulful blues", or "gritty blues licks" for authentic blues feel.',
  },
  'Whole Tone': {
    intervals: [0, 2, 4, 6, 8, 10],
    description: 'Every note is the same distance apart (whole steps only). This creates a floating, disorienting, dreamlike quality. No sense of "home" or resolution. Pure ambiguity.',
    mood: 'Dreamy, disorienting, impressionist, surreal, floating',
    usedIn: 'Debussy, Film dream sequences, Transition effects, Wayne Shorter jazz',
    howToHear: 'Play C-D-E-F#-G#-A#. Nothing feels like "home." It\'s like being in a dream where nothing quite makes sense. Debussy used it to paint impressionist sound-pictures.',
    promptTip: 'Use "whole tone scale", "dreamy impressionist", or "surreal floating" for dream-like passages.',
  },
  'Chromatic': {
    intervals: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    description: 'ALL 12 notes. Not really a "scale" you write melodies in, but essential for understanding tension, passing tones, and chromatic runs. Jazz players use chromatic notes to add spice between scale tones.',
    mood: 'Tense, dramatic, chaotic, intense, building',
    usedIn: 'Jazz improvisation, Horror film scores, Chromatic runs, Transition passages',
    howToHear: 'Play every single key (black and white) going up. That rapid, building tension? That\'s chromatic movement. It\'s the sound of "something is about to happen."',
    promptTip: 'Use "chromatic run", "chromatic tension", or "all 12 tones" for dramatic effect.',
  },
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
  { name: 'Pop Classic (I-V-vi-IV)', numerals: ['I', 'V', 'vi', 'IV'], description: 'Used in literally hundreds of hit songs—"Let It Be," "No Woman No Cry," "Someone Like You." It works because the vi (minor) chord creates a brief emotional dip before the IV chord lifts you back up. If you only learn ONE progression, learn this one.', genre: 'Pop' },
  { name: '12-Bar Blues', numerals: ['I', 'I', 'I', 'I', 'IV', 'IV', 'I', 'I', 'V', 'IV', 'I', 'V'], description: 'The DNA of Western popular music. Blues, rock, jazz—they all started here. The movement from I to IV feels like "leaving home," and V creates tension that pulls you back. Every musician should feel this in their bones.', genre: 'Blues' },
  { name: 'Jazz ii-V-I', numerals: ['ii', 'V', 'I'], description: 'The most important progression in jazz. The ii chord sets up tension, V intensifies it, and I resolves it—like asking a question and getting a satisfying answer. Add 7th chords for authentic jazz color.', genre: 'Jazz' },
  { name: 'Sad Progression (vi-IV-I-V)', numerals: ['vi', 'IV', 'I', 'V'], description: 'Starting on the minor chord makes everything feel melancholic from the first note. Used in "Africa" by Toto, "Zombie" by Cranberries. It\'s the Pop Classic reordered to start sad instead of bright.', genre: 'Pop/Rock' },
  { name: 'Andalusian Cadence', numerals: ['i', 'VII', 'VI', 'V'], description: 'The sound of Spain—flamenco guitars, dramatic tension, descending passion. The bass line walks down step by step, creating a hypnotic pull. Also used in "Hit the Road Jack" and Amapiano bass patterns.', genre: 'World' },
  { name: 'Doo-Wop (I-vi-IV-V)', numerals: ['I', 'vi', 'IV', 'V'], description: 'The 1950s in four chords. "Stand By Me," "Earth Angel," every doo-wop song ever. The vi chord adds sweetness, IV adds warmth, and V sets up the loop. Simple, timeless, and endlessly satisfying.', genre: 'Rock' },
  { name: 'Canon (Pachelbel)', numerals: ['I', 'V', 'vi', 'iii', 'IV', 'I', 'IV', 'V'], description: 'Pachelbel wrote this in the 1600s and it\'s STILL being used—"Graduation" by Vitamin C, "Basket Case" by Green Day, countless wedding songs. The longer length gives it an epic, narrative quality.', genre: 'Classical' },
  { name: 'Trap / Hip-Hop', numerals: ['i', 'VI', 'III', 'VII'], description: 'Dark, moody, modern. All minor-rooted with big jumps between chords. The VI and VII create that ominous, spacious feel you hear in Travis Scott, Future, and Metro Boomin productions.', genre: 'Hip-Hop' },
  { name: 'Afrobeats / Amapiano', numerals: ['I', 'IV', 'vi', 'V'], description: 'Warm, danceable, uplifting. The movement between I and IV creates a sunny, swaying feel. Add jazzy 7ths for Amapiano flavor. This progression drives Burna Boy, Wizkid, and Kabza De Small.', genre: 'Afrobeats' },
  { name: 'Gospel Turnaround', numerals: ['I', 'IV', 'I', 'V'], description: 'The church progression. Simple but POWERFUL with the right voicings. Add 7th, 9th, and 11th extensions and it becomes the rich, emotional foundation of gospel, soul, and R&B.', genre: 'Gospel' },
  { name: 'Reggae One-Drop', numerals: ['I', 'IV', 'V', 'I'], description: 'Bob Marley\'s bread and butter. The simplicity is the point—it lets the offbeat guitar skank and bass line groove shine. The I-IV-V-I is the oldest trick in music, and reggae proves it still works.', genre: 'Reggae' },
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
  // ===== GLOBAL & RURAL GENRES =====
  {
    name: 'Brazilian Funk (Funk Carioca)', bpm: '130-150', timeSignature: '4/4',
    commonScales: ['Natural Minor', 'Phrygian', 'Pentatonic Minor'],
    characteristics: ['Batida beat pattern', 'Heavy bass', 'Call and response', 'Tamborzão drum machine', 'MC vocals', 'Favela energy'],
    keyArtists: ['MC Kevin o Chris', 'Anitta', 'Ludmilla', 'DJ Dennis', 'MC Livinho'],
    description: 'Born in Rio de Janeiro\'s favelas in the late 80s. NOT related to American funk—it\'s built on Miami Bass and African-Brazilian rhythms. The "tamborzão" beat pattern is instantly recognizable. Now one of the biggest genres in the world, blending baile funk energy with pop, trap, and reggaeton.',
    promptTips: ['"Brazilian funk with tamborzão beat"', '"baile funk, favela energy, heavy bass"', '"funk carioca with MC vocals and call-response"', '"Anitta style Brazilian funk pop"'],
    sampleLinks: [
      { label: '🎵 Baile Funk Beat', url: 'https://cdn.pixabay.com/audio/2024/01/16/audio_3979e5ceab.mp3' },
    ],
    subgenres: ['Baile Funk', 'Funk Melody', 'Funk Consciente', 'Funk Pop', 'Brega Funk'],
  },
  {
    name: 'Highlife', bpm: '100-130', timeSignature: '4/4',
    commonScales: ['Major', 'Pentatonic Major', 'Dorian'],
    characteristics: ['Jazzy guitar', 'Brass arrangements', 'Palm wine guitar', 'Polyrhythmic percussion', 'Call and response vocals', 'Walking bass'],
    keyArtists: ['E.T. Mensah', 'Osibisa', 'Ebo Taylor', 'Pat Thomas', 'Gyedu-Blay Ambolley'],
    description: 'Ghana\'s signature genre, born in the 1920s from the fusion of traditional Akan music with Western instruments (brass, guitar, jazz). Called "highlife" because the music was originally played at elite social clubs. Its guitar patterns directly influenced Afrobeats, Afro-pop, and soukous.',
    promptTips: ['"highlife guitar with jazzy brass"', '"Ghanaian highlife, palm wine guitar"', '"modern highlife with Afrobeats influence"'],
    sampleLinks: [
      { label: '🎵 Highlife Guitar', url: 'https://cdn.pixabay.com/audio/2024/01/18/audio_cb73ddb46e.mp3' },
    ],
    subgenres: ['Burger Highlife', 'Gospel Highlife', 'Hiplife', 'Palm Wine'],
  },
  {
    name: 'Soukous / Congolese Rumba', bpm: '120-160', timeSignature: '4/4',
    commonScales: ['Major', 'Pentatonic Major', 'Mixolydian'],
    characteristics: ['Rapid guitar picking (sebene)', 'Dancing bass lines', 'Brass & saxophones', 'Polyrhythmic drums', 'Soaring vocals', 'Snare rolls'],
    keyArtists: ['Franco Luambo', 'Papa Wemba', 'Koffi Olomide', 'Fally Ipupa', 'Awilo Longomba'],
    description: 'Born in the Congo in the 1930s-40s when Cuban rumba records arrived in Central Africa. Musicians fused the rumba with traditional Congolese rhythms, creating rumba Congolaise. The "sebene" (rapid-fire guitar section) is the genre\'s most thrilling feature—fingers flying at impossible speed.',
    promptTips: ['"Congolese soukous with rapid guitar"', '"rumba Congolaise with sebene guitar solo"', '"African rumba with brass and dancing bass"'],
    sampleLinks: [
      { label: '🎵 Soukous Guitar', url: 'https://cdn.pixabay.com/audio/2024/01/18/audio_cb73ddb46e.mp3' },
    ],
    subgenres: ['Rumba Congolaise', 'Ndombolo', 'Sebene', 'Kwassa Kwassa'],
  },
  {
    name: 'Gqom', bpm: '120-130', timeSignature: '4/4',
    commonScales: ['Natural Minor', 'Phrygian'],
    characteristics: ['Dark, minimal beats', 'Heavy kick drums', 'Sparse percussion', 'Raw and unpolished', 'Repetitive hypnotic patterns', 'Zulu chants'],
    keyArtists: ['Babes Wodumo', 'DJ Lag', 'Distruction Boyz', 'Rudeboyz', 'Naked Boyz'],
    description: 'Pronounced "gom"—born in Durban, South Africa\'s townships. Raw, dark, and hypnotic, Gqom is the gritty cousin of house music. Made on basic software in bedrooms and community centers, it captures the energy of Durban\'s underground club scene. The name means "drum" or "bang" in Zulu.',
    promptTips: ['"gqom beat, dark and minimal"', '"Durban gqom with heavy kick and sparse percussion"', '"raw gqom, hypnotic and aggressive"'],
    sampleLinks: [
      { label: '🎵 Gqom Beat', url: 'https://cdn.pixabay.com/audio/2024/08/06/audio_69a61c5e14.mp3' },
    ],
    subgenres: ['Broken Gqom', 'Sgubhu', 'iKwekwezi'],
  },
  {
    name: 'Kwaito', bpm: '100-120', timeSignature: '4/4',
    commonScales: ['Natural Minor', 'Dorian', 'Pentatonic Minor'],
    characteristics: ['Slowed-down house beats', 'Deep bass', 'Township vocals', 'Repetitive hooks', 'Spoken word elements', 'Isicathamiya influence'],
    keyArtists: ['Mandoza', 'Arthur Mafokate', 'Boom Shaka', 'Trompies', 'Mdu Masilela'],
    description: 'South Africa\'s post-apartheid soundtrack. Born in Johannesburg\'s townships in the early 90s, Kwaito slowed down house music to 100-120 BPM and added township slang lyrics. It was the first genre to truly represent Black South African youth culture after apartheid ended.',
    promptTips: ['"kwaito beat, slowed house groove"', '"South African kwaito with deep bass and township vocals"', '"90s kwaito style, Mandoza influenced"'],
    sampleLinks: [
      { label: '🎵 Kwaito Groove', url: 'https://cdn.pixabay.com/audio/2024/08/06/audio_69a61c5e14.mp3' },
    ],
    subgenres: ['Old School Kwaito', 'New Kwaito', 'Kwaito House'],
  },
  {
    name: 'Bongo Flava', bpm: '90-120', timeSignature: '4/4',
    commonScales: ['Major', 'Pentatonic Major', 'Natural Minor'],
    characteristics: ['Swahili lyrics', 'R&B influences', 'Taarab elements', 'Danceable grooves', 'Melodic hooks', 'Diverse instrumentation'],
    keyArtists: ['Diamond Platnumz', 'Harmonize', 'Ali Kiba', 'Zuchu', 'Rayvanny'],
    description: 'Tanzania\'s dominant pop genre, blending hip-hop, R&B, dancehall, and traditional taarab music. Named after "bongo" (brains, referring to street smarts needed in Dar es Salaam). It\'s become East Africa\'s biggest music export, with Diamond Platnumz reaching billions of views.',
    promptTips: ['"bongo flava with Swahili vocals"', '"Tanzanian bongo flava, Diamond Platnumz style"', '"East African pop with taarab influences"'],
    sampleLinks: [
      { label: '🎵 Bongo Flava Beat', url: 'https://cdn.pixabay.com/audio/2024/01/18/audio_cb73ddb46e.mp3' },
    ],
    subgenres: ['Singeli', 'Bongo Hip-Hop', 'Bongo R&B'],
  },
  {
    name: 'Cumbia', bpm: '80-110', timeSignature: '4/4',
    commonScales: ['Major', 'Pentatonic Major', 'Mixolydian'],
    characteristics: ['Shuffling rhythm', 'Accordion', 'Gaita flute', 'Steady percussion', 'Call and response', 'Dancing bass'],
    keyArtists: ['Celso Piña', 'Los Ángeles Azules', 'Bomba Estéreo', 'Lucho Bermúdez', 'Andrés Landero'],
    description: 'Born on Colombia\'s Caribbean coast from the fusion of African drums, Indigenous flutes, and Spanish melodies. Cumbia spread across ALL of Latin America, each country creating its own version. It\'s the mother rhythm of Latin American popular music—older and more widespread than salsa or reggaeton.',
    promptTips: ['"cumbia with accordion and shuffling rhythm"', '"Colombian cumbia, gaita flute"', '"modern digital cumbia, Bomba Estéreo style"', '"Mexican cumbia with synth accordion"'],
    sampleLinks: [
      { label: '🎵 Cumbia Rhythm', url: 'https://cdn.pixabay.com/audio/2023/04/04/audio_5bfb8b2a77.mp3' },
    ],
    subgenres: ['Cumbia Villera', 'Cumbia Sonidera', 'Digital Cumbia', 'Cumbia Colombiana', 'Chicha'],
  },
  {
    name: 'Sega / Maloya', bpm: '100-140', timeSignature: '6/8',
    commonScales: ['Major', 'Pentatonic Major', 'Mixolydian'],
    characteristics: ['Ravanne drum', 'Swaying rhythm', 'Creole lyrics', 'Triangle percussion', 'Call and response', 'Island groove'],
    keyArtists: ['Ti Frère', 'Kaya', 'Cassiya', 'Danyèl Waro', 'Grup Latanier'],
    description: 'The music of the Indian Ocean islands—Mauritius, Réunion, Seychelles. Sega was born from enslaved peoples\' musical traditions, played on the ravanne (goatskin drum). Maloya (Réunion\'s version) was actually BANNED by French colonial authorities until 1981 because of its connection to resistance. Now a UNESCO cultural heritage.',
    promptTips: ['"sega music with ravanne drum and island rhythm"', '"Mauritian sega, Creole vocals"', '"maloya rhythm, spiritual and earthy"'],
    sampleLinks: [
      { label: '🎵 Island Groove', url: 'https://cdn.pixabay.com/audio/2022/05/16/audio_1bfdb6ec64.mp3' },
    ],
    subgenres: ['Seggae (Sega + Reggae)', 'Sega Tipik', 'Maloya Électrique'],
  },
  {
    name: 'Gnawa / Moroccan', bpm: '80-130', timeSignature: '4/4, 6/8',
    commonScales: ['Phrygian', 'Natural Minor', 'Harmonic Minor'],
    characteristics: ['Guembri bass lute', 'Iron castanets (qraqeb)', 'Spiritual chanting', 'Trance-inducing repetition', 'Call and response'],
    keyArtists: ['Maalem Mahmoud Guinia', 'Hassan Hakmoun', 'Tinariwen', 'Bombino'],
    description: 'North African spiritual music with Sub-Saharan roots, brought to Morocco by enslaved peoples from West Africa. Gnawa ceremonies (lila) use repetitive bass patterns and iron castanets to induce trance states. The guembri (3-string bass lute) produces a deep, buzzy tone unlike anything else in world music.',
    promptTips: ['"gnawa trance music with guembri bass"', '"Moroccan gnawa, spiritual chanting"', '"desert blues, Tinariwen inspired"', '"North African trance with castanets"'],
    sampleLinks: [
      { label: '🎵 Desert Blues', url: 'https://cdn.pixabay.com/audio/2023/08/10/audio_a0e6c557e1.mp3' },
    ],
    subgenres: ['Gnawa Fusion', 'Desert Blues', 'Tuareg Guitar', 'Chaabi'],
  },
  {
    name: 'Kuduro', bpm: '130-140', timeSignature: '4/4',
    commonScales: ['Natural Minor', 'Pentatonic Minor'],
    characteristics: ['Hard electronic beats', 'Zouk bass', 'Portuguese/Kimbundu lyrics', 'Frenetic energy', 'Raw production', 'Dance-focused'],
    keyArtists: ['Buraka Som Sistema', 'DJ Marfox', 'Puto Prata', 'Titica', 'Os Lambas'],
    description: 'Angola\'s electronic dance music, born in Luanda\'s musseques (informal settlements) in the late 80s. The name means "hard ass" in Portuguese slang, referring to the dance style. Made with basic equipment, it\'s raw, frenetic, and impossible not to dance to. Spread to Portugal and influenced global bass music.',
    promptTips: ['"kuduro beat, hard electronic and frenetic"', '"Angolan kuduro with zouk bass"', '"kuduro with raw production and fast rhythm"'],
    sampleLinks: [
      { label: '🎵 Kuduro Energy', url: 'https://cdn.pixabay.com/audio/2024/06/13/audio_e5f8b31b81.mp3' },
    ],
    subgenres: ['Kuduro Progressivo', 'Batida', 'Afro-House'],
  },
  {
    name: 'Calypso / Soca', bpm: '130-160', timeSignature: '4/4',
    commonScales: ['Major', 'Mixolydian', 'Pentatonic Major'],
    characteristics: ['Steel pan', 'Brass section', 'Energetic percussion', 'Social commentary lyrics', 'Carnival energy', 'Call and response'],
    keyArtists: ['Mighty Sparrow', 'Machel Montano', 'Bunji Garlin', 'Destra Garcia', 'Lord Kitchener'],
    description: 'Trinidad & Tobago\'s gift to the world. Calypso evolved from West African call-and-response traditions and was historically used for political commentary and social protest. Soca ("soul of calypso") is its high-energy, party-focused evolution, powering Caribbean Carnival celebrations globally.',
    promptTips: ['"soca with steel pan and carnival energy"', '"calypso with social commentary vocals"', '"Trinidad soca, Machel Montano style"'],
    sampleLinks: [
      { label: '🎵 Carnival Rhythm', url: 'https://cdn.pixabay.com/audio/2022/05/16/audio_1bfdb6ec64.mp3' },
    ],
    subgenres: ['Power Soca', 'Groovy Soca', 'Parang Soca', 'Chutney Soca'],
  },
  // ===== EAST AFRICAN GENRES =====
  {
    name: 'Kidandali', bpm: '110-130', timeSignature: '4/4',
    commonScales: ['Major', 'Pentatonic Major', 'Mixolydian'],
    characteristics: ['Live band energy', 'Guitar-driven melodies', 'Luganda lyrics', 'Call and response', 'Wedding/party vibes', 'Horn sections', 'Danceable grooves'],
    keyArtists: ['Mesach Semakula', 'Afrigo Band', 'Chameleone', 'Irene Ntale', 'Bobi Wine'],
    description: 'Uganda\'s party music, meaning "let\'s celebrate" in Luganda. Born from the live band tradition of Kampala\'s social clubs, Kidandali fuses traditional Baganda rhythms with modern instrumentation. It\'s the music you hear at every Ugandan wedding, graduation, and kwanjula (introduction ceremony). The guitar riffs and horn arrangements are distinctly East African.',
    promptTips: ['"Kidandali with live band guitar and Luganda vocals"', '"Ugandan party music, celebratory and danceable"', '"East African Kidandali, horn section and guitar"', '"festive Kidandali groove, wedding celebration vibes"'],
    sampleLinks: [
      { label: '🎵 Kidandali Groove', url: 'https://cdn.pixabay.com/audio/2024/01/18/audio_cb73ddb46e.mp3' },
    ],
    subgenres: ['Modern Kidandali', 'Band Kidandali', 'Gospel Kidandali'],
  },
  {
    name: 'Kadongo Kamu', bpm: '80-110', timeSignature: '4/4',
    commonScales: ['Major', 'Pentatonic Major', 'Natural Minor'],
    characteristics: ['Solo acoustic guitar', 'Storytelling lyrics', 'Luganda/Lusoga vocals', 'Proverbs and wisdom', 'Minimal instrumentation', 'Narrative structure', 'Social commentary'],
    keyArtists: ['Elly Wamala', 'Fred Masagazi', 'Herman Basudde', 'Dan Mugula', 'Paulo Kafeero'],
    description: 'Literally "one guitar" in Luganda — Uganda\'s oldest and most beloved folk genre. A solo performer with one acoustic guitar tells stories of love, loss, morality, and social issues using Buganda proverbs and metaphors. Paulo Kafeero is considered the greatest Kadongo Kamu artist ever. The genre is the soul of Buganda culture.',
    promptTips: ['"Kadongo Kamu solo acoustic guitar, storytelling"', '"Ugandan folk music, one guitar, narrative lyrics"', '"East African acoustic ballad, Kadongo Kamu style"', '"contemplative African folk with solo guitar and deep vocals"'],
    sampleLinks: [
      { label: '🎵 Acoustic Folk', url: 'https://cdn.pixabay.com/audio/2023/12/07/audio_1c15e78a27.mp3' },
    ],
    subgenres: ['Classic Kadongo Kamu', 'Modern Kadongo Kamu', 'Gospel Kadongo Kamu'],
  },
  {
    name: 'Gengetone', bpm: '100-120', timeSignature: '4/4',
    commonScales: ['Natural Minor', 'Pentatonic Minor', 'Phrygian'],
    characteristics: ['Heavy bass', 'Sheng lyrics', 'Raw production', 'Street energy', 'Dancehall influence', 'Auto-tuned vocals', 'Provocative lyrics'],
    keyArtists: ['Ethic Entertainment', 'Sailors Gang', 'Boondocks Gang', 'Trio Mio', 'Mejja'],
    description: 'Kenya\'s raw street music born in Nairobi\'s estates (neighborhoods) around 2018. Made by young producers with basic equipment, Gengetone blends dancehall riddims, hip-hop bass, and Sheng (Nairobi slang mixing Swahili and English). Controversial for its explicit lyrics but undeniably the sound of Kenyan youth.',
    promptTips: ['"Gengetone with heavy bass and Sheng vocals"', '"Kenyan street music, raw and energetic"', '"Nairobi Gengetone, dancehall-influenced beat"', '"East African urban beat, Gengetone style"'],
    sampleLinks: [
      { label: '🎵 Gengetone Beat', url: 'https://cdn.pixabay.com/audio/2024/01/18/audio_cb73ddb46e.mp3' },
    ],
    subgenres: ['Mainstream Gengetone', 'Conscious Gengetone', 'Gengetone RnB'],
  },
  {
    name: 'Singeli', bpm: '200-300', timeSignature: '4/4',
    commonScales: ['Pentatonic Minor', 'Natural Minor'],
    characteristics: ['Extremely fast tempo', 'Frenetic energy', 'Swahili MC vocals', 'Digital production', 'Dance-focused', 'Polyrhythmic', 'Raw and chaotic'],
    keyArtists: ['DJ Kampire', 'Sisso', 'Dogo Janja', 'MC Muzik', 'MCZO'],
    description: 'The FASTEST genre in the world — born in Dar es Salaam\'s Manzese neighborhood. At 200-300 BPM, Singeli is so fast it makes drum & bass sound like a lullaby. Originally street party music with MCs rapping over frenetic beats on basic computer software. It\'s raw, underground, and absolutely electrifying.',
    promptTips: ['"Singeli, extremely fast African electronic, 200+ BPM"', '"Tanzanian Singeli, frenetic and chaotic"', '"ultra-fast African dance music, raw production"', '"Singeli rave music, Dar es Salaam underground"'],
    sampleLinks: [
      { label: '🎵 Fast Beat', url: 'https://cdn.pixabay.com/audio/2024/02/07/audio_d9eb886306.mp3' },
    ],
    subgenres: ['Classic Singeli', 'Singeli Fusion', 'Global Singeli'],
  },
  {
    name: 'Taarab', bpm: '70-100', timeSignature: '4/4',
    commonScales: ['Harmonic Minor', 'Phrygian', 'Major'],
    characteristics: ['Arabic-influenced melodies', 'Swahili poetry', 'String orchestra', 'Qanun (zither)', 'Oud', 'Slow and romantic', 'Coastal Swahili culture'],
    keyArtists: ['Bi Kidude', 'Siti binti Saad', 'Culture Musical Club', 'Khadija Kopa', 'East African Melody'],
    description: 'The classical music of the Swahili coast — born in Zanzibar from Arab, Indian, and African musical traditions. Taarab means "ecstasy" in Arabic. Features orchestras with ouds, qanuns, violins, and Swahili poetic lyrics about love and social commentary. Bi Kidude performed until age 100+. UNESCO intangible heritage.',
    promptTips: ['"Taarab with oud and string orchestra, Zanzibari"', '"Swahili coast music, Arabic-influenced melodies"', '"romantic Taarab, Bi Kidude style"', '"East African classical with oud and poetic vocals"'],
    sampleLinks: [
      { label: '🎵 Arabic Strings', url: 'https://cdn.pixabay.com/audio/2023/08/10/audio_a0e6c557e1.mp3' },
    ],
    subgenres: ['Classical Taarab', 'Modern Taarab', 'Kidumbak'],
  },
  {
    name: 'Benga', bpm: '100-130', timeSignature: '4/4',
    commonScales: ['Major', 'Pentatonic Major', 'Dorian'],
    characteristics: ['Electric guitar leads', 'Luo nyatiti influence', 'Cycling bass patterns', 'Polyrhythmic drums', 'Call and response vocals', 'Danceable grooves'],
    keyArtists: ['Shirati Jazz', 'D.O. Misiani', 'Victoria Jazz', 'George Ramogi', 'Ochieng Nelly'],
    description: 'Kenya\'s original popular music — born in the 1940s-60s among the Luo people around Lake Victoria. Benga adapted the rhythms and melodies of the traditional nyatiti (8-string lyre) to electric guitar. The cycling guitar patterns and bass lines are hypnotic and heavily influenced Congolese soukous and all East African pop music that followed.',
    promptTips: ['"Benga with cycling electric guitar patterns"', '"Kenyan Benga, Luo-influenced guitar music"', '"East African Benga groove, polyrhythmic drums"', '"retro Benga guitar style, Lake Victoria vibes"'],
    sampleLinks: [
      { label: '🎵 Benga Guitar', url: 'https://cdn.pixabay.com/audio/2024/01/18/audio_cb73ddb46e.mp3' },
    ],
    subgenres: ['Luo Benga', 'Kikuyu Benga', 'Kamba Benga', 'Modern Benga'],
  },
  {
    name: 'Zilizopendwa', bpm: '90-120', timeSignature: '4/4',
    commonScales: ['Major', 'Pentatonic Major', 'Dorian'],
    characteristics: ['Nostalgic melodies', 'Rumba influence', 'Swahili lyrics', 'Guitar-driven', 'Golden-era production', 'Danceable and romantic'],
    keyArtists: ['Daudi Kabaka', 'Fadhili Williams', 'Maroon Commandos', 'Them Mushrooms', 'Les Wanyika'],
    description: 'Meaning "those that were loved" in Swahili — this is East Africa\'s golden-era music from the 1960s-80s. A blend of Congolese rumba, Kenyan benga, and coastal influences that defined the post-independence sound. Every East African knows these songs — they\'re played at every family gathering, and radio stations dedicate entire programs to them.',
    promptTips: ['"Zilizopendwa style, classic East African rumba"', '"retro Swahili pop, golden era 1970s"', '"nostalgic East African music, guitar and brass"', '"vintage Kenyan pop, Congolese rumba influence"'],
    sampleLinks: [
      { label: '🎵 Classic East African', url: 'https://cdn.pixabay.com/audio/2024/01/18/audio_cb73ddb46e.mp3' },
    ],
    subgenres: ['Kenyan Rumba', 'Swahili Pop', 'East African Oldies'],
  },
  // ===== MORE RURAL & UNDERREPRESENTED GENRES =====
  {
    name: 'Mbalax', bpm: '120-140', timeSignature: '4/4',
    commonScales: ['Major', 'Pentatonic Major', 'Dorian'],
    characteristics: ['Sabar drum patterns', 'Tama (talking drum)', 'Wolof lyrics', 'Complex polyrhythms', 'Guitar and synth', 'Energetic dancing'],
    keyArtists: ['Youssou N\'Dour', 'Baaba Maal', 'Viviane Chidid', 'Wally Seck'],
    description: 'Senegal\'s national music. Built around the sabar drum ensemble — the most complex drum tradition in West Africa. Youssou N\'Dour made it globally famous. The talking drum (tama) literally "speaks" Wolof tonal language. Every drum pattern corresponds to a specific dance move.',
    promptTips: ['"Mbalax with sabar drums, Senegalese rhythm"', '"Youssou N\'Dour style Mbalax"', '"West African polyrhythmic dance music"', '"Senegalese Mbalax with talking drum"'],
    sampleLinks: [
      { label: '🎵 Mbalax Drums', url: 'https://cdn.pixabay.com/audio/2024/01/18/audio_cb73ddb46e.mp3' },
    ],
    subgenres: ['Traditional Mbalax', 'Pop Mbalax', 'Mbalax Fusion'],
  },
  {
    name: 'Chimurenga', bpm: '100-130', timeSignature: '4/4, 12/8',
    commonScales: ['Major', 'Pentatonic Major', 'Mixolydian'],
    characteristics: ['Mbira (thumb piano)', 'Liberation lyrics', 'Shona language', 'Polyrhythmic patterns', 'Hosho (shaker)', 'Spiritual connection'],
    keyArtists: ['Thomas Mapfumo', 'Oliver Mtukudzi', 'Stella Chiweshe', 'Chiwoniso Maraire'],
    description: 'Zimbabwe\'s revolutionary music — chimurenga means "struggle" in Shona. Thomas Mapfumo electrified the ancient mbira (thumb piano) patterns and used them in protest songs against colonial rule. The mbira is considered sacred in Shona culture, connecting the living with ancestral spirits. The music helped fuel Zimbabwe\'s independence movement.',
    promptTips: ['"Chimurenga with electric mbira patterns"', '"Zimbabwean liberation music, Thomas Mapfumo style"', '"Shona mbira rhythms, spiritual and political"'],
    sampleLinks: [
      { label: '🎵 Mbira Pattern', url: 'https://cdn.pixabay.com/audio/2024/01/18/audio_cb73ddb46e.mp3' },
    ],
    subgenres: ['Chimurenga Reggae', 'Jit', 'Sungura'],
  },
  {
    name: 'Maskandi', bpm: '100-130', timeSignature: '4/4',
    commonScales: ['Major', 'Pentatonic Major', 'Natural Minor'],
    characteristics: ['Acoustic guitar (ukupika)', 'Zulu vocals', 'Concertina', 'Rural storytelling', 'Foot stomping rhythm', 'Deep bass guitar'],
    keyArtists: ['Phuzushukela', 'Ihashi Elimhlophe', 'Shwi noMtekhala', 'Imithente'],
    description: 'The folk music of rural Zulu South Africa — "maskandi" comes from the Afrikaans "musikant" (musician). Traveling musicians would walk between rural communities performing songs about love, migrant labor, and Zulu culture. The guitar playing style (ukupika) is uniquely Zulu, with rapid fingerpicking patterns that imitate traditional bow instruments.',
    promptTips: ['"Maskandi with Zulu guitar fingerpicking"', '"South African rural folk, acoustic and stomping"', '"Zulu Maskandi, concertina and deep bass"'],
    sampleLinks: [
      { label: '🎵 Maskandi Guitar', url: 'https://cdn.pixabay.com/audio/2023/12/07/audio_1c15e78a27.mp3' },
    ],
    subgenres: ['Traditional Maskandi', 'Modern Maskandi', 'Maskandi Gospel'],
  },
  {
    name: 'Jùjú Music', bpm: '100-130', timeSignature: '4/4',
    commonScales: ['Major', 'Pentatonic Major', 'Dorian'],
    characteristics: ['Talking drum (dùndún)', 'Pedal steel guitar', 'Layered percussion', 'Yoruba praise singing', 'Extended jam sessions', 'Shekere'],
    keyArtists: ['King Sunny Ade', 'Ebenezer Obey', 'Shina Peters', 'Sir Shina Adewale'],
    description: 'Nigeria\'s Yoruba party music — jùjú emerged in the 1920s and was electrified in the 60s-70s. King Sunny Ade is the genre\'s global ambassador, called "the chairman of fuji." Extended live performances can last hours, with the talking drum engaging in conversation with the lead singer. The pedal steel guitar gives it a unique, shimmering quality.',
    promptTips: ['"Jùjú music with talking drum and pedal steel guitar"', '"Yoruba praise music, King Sunny Ade style"', '"Nigerian Jùjú, layered percussion and guitar"'],
    sampleLinks: [
      { label: '🎵 Jùjú Groove', url: 'https://cdn.pixabay.com/audio/2024/01/18/audio_cb73ddb46e.mp3' },
    ],
    subgenres: ['Classic Jùjú', 'Afro-Jùjú', 'Gospel Jùjú'],
  },
  // ===== ORIGINAL GENRE BY KITARA KID =====
  {
    name: 'Neon Griot Streetwave', bpm: '85-110', timeSignature: '4/4',
    commonScales: ['Phrygian', 'Harmonic Minor', 'Dorian', 'Pentatonic Minor'],
    characteristics: ['Metallic scrap percussion', 'Warm sub-bass pulses', 'Glitchy neon synths', 'Half-spoken half-sung vocals', 'Ghostly echo harmonies', 'Distant chant layers', 'Body-motion rhythm', 'Hypnotic evolving groove', 'Street-poet delivery', 'Broken hologram textures'],
    keyArtists: ['Kitara Kid'],
    description: 'An entirely new genre created by Kitara Kid — Neon Griot Streetwave fuses deep urban wisdom with surreal sonic textures. The sound is futuristic, street-smart, and otherworldly: metallic, scrap-like percussion clatters and shifts unpredictably over warm sub-bass pulses, while glitchy neon synths shimmer like broken holograms. Vocals are half-spoken, half-sung in a confident street-poet style, delivering cryptic lines about movement, intuition, and survival. Ghostly background echoes and distant chant harmonies create a sense of ancient knowledge inside a digital city. The rhythm follows body motion rather than conventional tempo, creating an evolving, hypnotic groove that feels alive. Not hip-hop, not amapiano, not electronic — something entirely new.',
    promptTips: ['"Neon Griot Streetwave — metallic scrap percussion, glitchy neon synths, sub-bass"', '"Street-poet half-spoken vocals over broken hologram textures"', '"Hypnotic body-motion groove with ghostly chant echoes, Kitara Kid style"', '"Futuristic urban griot storytelling, surreal digital city atmosphere"', '"Ancient wisdom meets neon streets, evolving rhythm, genre-breaking"'],
    sampleLinks: [
      { label: '🎵 Kitara Kid on Mdundo', url: 'https://www.mdundo.com/artist/kitara-kid' },
    ],
    subgenres: ['Raw Streetwave', 'Neon Griot Acoustic', 'Digital Griot'],
  },
];
