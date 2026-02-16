export interface InstrumentInfo {
  name: string;
  category: string;
  icon: string;
  description: string;
  soundCharacter: string;
  howItSounds: string;
  genres: string[];
  promptTip: string;
  // Synth params for Web Audio demo
  synth: {
    type: OscillatorType;
    baseFreq: number;
    envelope: { attack: number; decay: number; sustain: number; release: number };
    filterFreq?: number;
    detune?: number;
    notes?: number[]; // frequency multipliers for a short phrase
  };
}

export const INSTRUMENT_CATEGORIES = [
  'Strings', 'Keys & Mallets', 'Brass', 'Woodwinds', 'Percussion', 'Bass', 'Electronic', 'World / Folk'
] as const;

export const INSTRUMENTS: InstrumentInfo[] = [
  // ─── STRINGS ───
  {
    name: 'Acoustic Guitar',
    category: 'Strings',
    icon: '🎸',
    description: 'Six-stringed instrument played by plucking or strumming. The foundation of folk, rock, country, and pop music worldwide.',
    soundCharacter: 'Warm, woody, bright attack with a mellow sustain. Steel strings are brighter; nylon strings are softer and rounder.',
    howItSounds: 'Think of a campfire song — that warm, strummy sound that fills the room without being overpowering. Each string rings out individually when picked.',
    genres: ['Folk', 'Country', 'Pop', 'Rock', 'Bossa Nova', 'Flamenco'],
    promptTip: 'Use "fingerpicked acoustic guitar" for intimate feel, "strummed acoustic" for energy.',
    synth: { type: 'triangle', baseFreq: 220, envelope: { attack: 0.01, decay: 0.3, sustain: 0.2, release: 0.5 }, notes: [1, 1.25, 1.5, 1.33, 1, 0.75] }
  },
  {
    name: 'Electric Guitar',
    category: 'Strings',
    icon: '🎸',
    description: 'Amplified guitar using magnetic pickups. Can produce clean tones, crunchy overdrive, or heavy distortion depending on effects and amp settings.',
    soundCharacter: 'Versatile — clean tones are glassy and bell-like; distorted tones are thick, gritty, and sustain for days.',
    howItSounds: 'Clean sounds like a crisp, shimmering bell. With distortion, it growls and screams — imagine the roaring sound at a rock concert.',
    genres: ['Rock', 'Blues', 'Metal', 'Jazz', 'Funk', 'Indie'],
    promptTip: 'Specify "clean electric guitar" vs "distorted electric guitar" or "overdriven guitar" for different vibes.',
    synth: { type: 'sawtooth', baseFreq: 330, envelope: { attack: 0.01, decay: 0.2, sustain: 0.6, release: 0.4 }, filterFreq: 2000, notes: [1, 1.25, 1.5, 2, 1.5, 1] }
  },
  {
    name: 'Violin',
    category: 'Strings',
    icon: '🎻',
    description: 'Bowed string instrument with the highest range in the string family. Central to orchestras and widely used in folk music from Ireland to India.',
    soundCharacter: 'Singing, expressive, and capable of incredible emotion. Can be sweet and delicate or fiery and intense.',
    howItSounds: 'Like a human voice singing without words — it can cry, whisper, or shout. The bow creates a continuous flowing sound unlike plucked instruments.',
    genres: ['Classical', 'Folk', 'Bollywood', 'Celtic', 'Tango'],
    promptTip: 'Use "solo violin" for emotional passages, "string section" for orchestral fullness.',
    synth: { type: 'sawtooth', baseFreq: 440, envelope: { attack: 0.1, decay: 0.1, sustain: 0.8, release: 0.3 }, filterFreq: 3000, detune: 5, notes: [1, 1.125, 1.25, 1.5, 1.25, 1] }
  },
  {
    name: 'Cello',
    category: 'Strings',
    icon: '🎻',
    description: 'Deep-voiced bowed string instrument. Sits between viola and double bass in range. Known for rich, warm, resonant tones.',
    soundCharacter: 'Rich, warm, and deeply resonant. Often described as the instrument closest to the human voice.',
    howItSounds: 'Imagine a deep, warm hug in sound form. It has a velvety low range and a singing upper range that can bring tears to your eyes.',
    genres: ['Classical', 'Film Scores', 'Neo-Soul', 'Ambient'],
    promptTip: 'Use "cello" for emotional depth. "Pizzicato cello" for plucked rhythmic parts.',
    synth: { type: 'sawtooth', baseFreq: 130, envelope: { attack: 0.15, decay: 0.1, sustain: 0.7, release: 0.5 }, filterFreq: 1500, detune: 3, notes: [1, 1.25, 1.5, 1.33, 1.125, 1] }
  },
  {
    name: 'Harp',
    category: 'Strings',
    icon: '🪕',
    description: 'Large stringed instrument played by plucking with fingers. Creates ethereal, cascading sounds. Used in orchestras and Celtic music.',
    soundCharacter: 'Shimmering, ethereal, and angelic. Each note rings out clearly with a gentle decay.',
    howItSounds: 'Like raindrops made of light — cascading, sparkling tones that float in the air. Think of a fairy tale or dream sequence.',
    genres: ['Classical', 'Celtic', 'New Age', 'Film Scores'],
    promptTip: 'Use "harp arpeggios" for dreamy passages, "celtic harp" for folk feel.',
    synth: { type: 'sine', baseFreq: 523, envelope: { attack: 0.01, decay: 0.5, sustain: 0.1, release: 0.8 }, notes: [1, 0.75, 0.6, 0.5, 0.6, 0.75, 1, 1.25] }
  },
  // ─── KEYS & MALLETS ───
  {
    name: 'Piano',
    category: 'Keys & Mallets',
    icon: '🎹',
    description: 'Hammered string instrument with 88 keys covering a huge range. The most versatile and widely taught instrument in the world.',
    soundCharacter: 'Clear, full-bodied, and dynamic. Can be gentle and intimate or thunderous and powerful.',
    howItSounds: 'Bright, clear notes that ring out and gradually fade. Lower notes rumble and resonate; higher notes sparkle and tinkle.',
    genres: ['Classical', 'Jazz', 'Pop', 'R&B', 'Gospel', 'Hip-Hop'],
    promptTip: 'Specify "grand piano" for rich classical tone, "upright piano" for lo-fi warmth, "honky-tonk piano" for vintage.',
    synth: { type: 'triangle', baseFreq: 262, envelope: { attack: 0.01, decay: 0.4, sustain: 0.3, release: 0.6 }, notes: [1, 1.25, 1.5, 2, 1.5, 1.25, 1] }
  },
  {
    name: 'Rhodes / Electric Piano',
    category: 'Keys & Mallets',
    icon: '🎹',
    description: 'Electric keyboard using tines struck by hammers. Iconic warm, bell-like tone heard in soul, R&B, and jazz fusion.',
    soundCharacter: 'Warm, bell-like, slightly fuzzy. Has a characteristic "bark" when played hard and a silky smoothness played soft.',
    howItSounds: 'Like a piano made of velvet and bells — softer and dreamier than acoustic piano, with a gentle wobble (tremolo) that makes it float.',
    genres: ['Neo-Soul', 'R&B', 'Jazz', 'Lo-Fi Hip-Hop', 'Funk'],
    promptTip: 'Use "Rhodes piano" or "electric piano" for smooth neo-soul vibes. Add "tremolo" for extra warmth.',
    synth: { type: 'sine', baseFreq: 330, envelope: { attack: 0.01, decay: 0.5, sustain: 0.4, release: 0.6 }, detune: 2, notes: [1, 1.2, 1.4, 1.33, 1.125, 1] }
  },
  {
    name: 'Marimba',
    category: 'Keys & Mallets',
    icon: '🪘',
    description: 'Wooden percussion instrument struck with mallets. Produces warm, resonant tones. Common in African, Latin, and contemporary music.',
    soundCharacter: 'Warm, woody, and resonant with a rounded attack. Deeper and mellower than xylophone.',
    howItSounds: 'Like someone tapping on hollow wooden bowls filled with warmth — each note blooms and hums. Think of the gentle "bonk" of a wooden wind chime.',
    genres: ['Afrobeat', 'Classical', 'Latin', 'Ambient', 'Soukous'],
    promptTip: 'Use "marimba" for African/Latin warmth. "Marimba melody" for a distinctive organic lead sound.',
    synth: { type: 'sine', baseFreq: 294, envelope: { attack: 0.005, decay: 0.3, sustain: 0.05, release: 0.4 }, notes: [1, 1.33, 1.5, 1.33, 1, 0.75, 1] }
  },
  {
    name: 'Kalimba (Thumb Piano)',
    category: 'Keys & Mallets',
    icon: '🎵',
    description: 'African instrument with metal tines mounted on a wooden board, played with thumbs. Creates a tinkling, music-box-like sound.',
    soundCharacter: 'Crystalline, delicate, and mesmerizing. Each note has a pure, bell-like quality with natural sustain.',
    howItSounds: 'Imagine tiny bells inside a wooden box — bright, pure tones that ring out like musical raindrops. It\'s the sound of a lullaby from another world.',
    genres: ['Afrobeat', 'Ambient', 'Lo-Fi', 'World Music', 'Chimurenga'],
    promptTip: 'Use "kalimba" or "thumb piano" for dreamy African-inspired textures.',
    synth: { type: 'sine', baseFreq: 587, envelope: { attack: 0.005, decay: 0.4, sustain: 0.1, release: 0.6 }, notes: [1, 0.84, 1, 1.19, 1, 0.84, 0.67] }
  },
  // ─── BRASS ───
  {
    name: 'Trumpet',
    category: 'Brass',
    icon: '🎺',
    description: 'Bright, powerful brass instrument played with a cup-shaped mouthpiece. Cuts through any mix with its brilliant tone.',
    soundCharacter: 'Bright, piercing, and heroic. Can be muted for a softer, "wah-wah" effect used in jazz.',
    howItSounds: 'Like a call to attention — bold, brassy, and impossible to ignore. Muted trumpet sounds like someone talking through a metal cup, mysterious and smoky.',
    genres: ['Jazz', 'Salsa', 'Mariachi', 'Funk', 'Ska', 'Classical'],
    promptTip: 'Use "muted trumpet" for jazz noir feel, "brass section" for big band energy.',
    synth: { type: 'sawtooth', baseFreq: 466, envelope: { attack: 0.05, decay: 0.1, sustain: 0.7, release: 0.2 }, filterFreq: 2500, notes: [1, 1, 1.25, 1.5, 1.25, 1] }
  },
  {
    name: 'Trombone',
    category: 'Brass',
    icon: '🎺',
    description: 'Brass instrument with a slide instead of valves. Known for its smooth glissando effect and rich, warm tone.',
    soundCharacter: 'Full, round, and powerful. The slide allows unique smooth pitch bends (glissando) no other brass instrument can do.',
    howItSounds: 'A deeper, more mellow version of the trumpet — imagine a warm golden tone that can slide smoothly between notes like butter.',
    genres: ['Jazz', 'Ska', 'Funk', 'Classical', 'New Orleans Brass'],
    promptTip: 'Use "trombone" for jazz warmth, "brass ensemble" for power.',
    synth: { type: 'sawtooth', baseFreq: 233, envelope: { attack: 0.06, decay: 0.1, sustain: 0.6, release: 0.3 }, filterFreq: 1800, notes: [1, 1.125, 1.25, 1.5, 1.25, 1] }
  },
  {
    name: 'French Horn',
    category: 'Brass',
    icon: '📯',
    description: 'Coiled brass instrument with a wide bell. Produces a warm, noble tone. Essential in orchestral and film score music.',
    soundCharacter: 'Noble, majestic, and warm. Softer and more rounded than trumpet. Can be heroic or hauntingly beautiful.',
    howItSounds: 'Think of sunrise over mountains in a movie — that soaring, majestic sound that swells with grandeur. Warm and powerful but never harsh.',
    genres: ['Classical', 'Film Scores', 'Epic Orchestral'],
    promptTip: 'Use "french horn" or "horn section" for epic, cinematic moments.',
    synth: { type: 'sawtooth', baseFreq: 311, envelope: { attack: 0.12, decay: 0.1, sustain: 0.7, release: 0.4 }, filterFreq: 1200, detune: 2, notes: [1, 1.25, 1.5, 1.33, 1.125, 1] }
  },
  // ─── WOODWINDS ───
  {
    name: 'Flute',
    category: 'Woodwinds',
    icon: '🪈',
    description: 'Air-blown instrument producing pure, high-pitched tones. One of the oldest instruments in human history, found in every culture.',
    soundCharacter: 'Pure, airy, and bright. Has a breathy quality in lower register and a piercing clarity up high.',
    howItSounds: 'Like wind singing — pure, clear notes that float effortlessly. Imagine a bird\'s song translated into music. In lower notes, you can hear the breath itself.',
    genres: ['Classical', 'Folk', 'Andean Music', 'Jazz', 'Celtic'],
    promptTip: 'Use "bamboo flute" for Asian/Andean feel, "concert flute" for classical, "pan flute" for folk.',
    synth: { type: 'sine', baseFreq: 698, envelope: { attack: 0.08, decay: 0.05, sustain: 0.6, release: 0.3 }, notes: [1, 1.125, 1.25, 1.125, 1, 0.89, 1] }
  },
  {
    name: 'Saxophone',
    category: 'Woodwinds',
    icon: '🎷',
    description: 'Single-reed brass-bodied woodwind. Incredibly expressive — can whisper, shout, cry, or laugh. The voice of jazz and soul.',
    soundCharacter: 'Rich, expressive, and soulful. Alto is brighter; tenor is warmer and darker; baritone is deep and growly.',
    howItSounds: 'The most "human" of all instruments — it literally sounds like someone singing with incredible emotion. Smooth and silky or raw and gritty.',
    genres: ['Jazz', 'R&B', 'Soul', 'Funk', 'Smooth Jazz', 'Rock'],
    promptTip: 'Specify "alto sax" (bright), "tenor sax" (warm), or "baritone sax" (deep). "Saxophone solo" for expressive moments.',
    synth: { type: 'sawtooth', baseFreq: 370, envelope: { attack: 0.05, decay: 0.1, sustain: 0.7, release: 0.3 }, filterFreq: 2200, detune: 4, notes: [1, 1.125, 1.25, 1.33, 1.25, 1.125, 1] }
  },
  {
    name: 'Clarinet',
    category: 'Woodwinds',
    icon: '🎵',
    description: 'Single-reed instrument with a wide range. Warm in lower register, brilliant up high. Key in jazz, classical, and klezmer.',
    soundCharacter: 'Warm and woody in the low range, bright and piercing up high. Has a unique hollow quality in the middle.',
    howItSounds: 'Like a warm wooden voice — darker and mellower than flute but not as brassy as saxophone. The low notes purr; the high notes soar.',
    genres: ['Jazz', 'Classical', 'Klezmer', 'Swing', 'Folk'],
    promptTip: 'Use "clarinet" for vintage jazz or classical warmth. "Bass clarinet" for mysterious low textures.',
    synth: { type: 'square', baseFreq: 294, envelope: { attack: 0.04, decay: 0.1, sustain: 0.6, release: 0.3 }, filterFreq: 1800, notes: [1, 1.19, 1.33, 1.5, 1.33, 1.19, 1] }
  },
  // ─── PERCUSSION ───
  {
    name: 'Drum Kit',
    category: 'Percussion',
    icon: '🥁',
    description: 'Collection of drums and cymbals: kick, snare, hi-hat, toms, crash, ride. The rhythmic backbone of modern music.',
    soundCharacter: 'Punchy kick thump, crisp snare crack, sizzling hi-hats, booming toms, shimmering cymbals.',
    howItSounds: 'The heartbeat of a song. Kick drum is the deep thump you feel in your chest. Snare is the sharp crack. Hi-hats are the ticking shimmer on top.',
    genres: ['Rock', 'Pop', 'Jazz', 'Funk', 'Metal', 'Hip-Hop'],
    promptTip: 'Specify "live drums" vs "programmed drums" vs "808 drums". "Breakbeat" for chopped-up patterns.',
    synth: { type: 'triangle', baseFreq: 100, envelope: { attack: 0.005, decay: 0.15, sustain: 0.0, release: 0.1 }, notes: [1, 2, 1, 2, 1, 3, 1, 2] }
  },
  {
    name: 'Djembe',
    category: 'Percussion',
    icon: '🪘',
    description: 'West African goblet drum played with bare hands. Produces three main sounds: bass (center), tone (edge), and slap (sharp edge hit).',
    soundCharacter: 'Deep bass in center, bright tone at edge, sharp slap for accents. Incredibly dynamic and expressive.',
    howItSounds: 'The bass sounds like a deep heartbeat from the earth. The tone rings out warmly. The slap is a sharp crack like a whip. Together they create a conversation.',
    genres: ['Afrobeat', 'West African', 'World Music', 'Drum Circle'],
    promptTip: 'Use "djembe" or "African hand drums" for organic percussive energy.',
    synth: { type: 'triangle', baseFreq: 80, envelope: { attack: 0.005, decay: 0.25, sustain: 0.02, release: 0.2 }, notes: [1, 2.5, 2.5, 1, 1, 2.5, 1, 3] }
  },
  {
    name: 'Congas',
    category: 'Percussion',
    icon: '🪘',
    description: 'Tall Afro-Cuban drums played with hands. Usually played in pairs or sets of three. Essential to salsa, Latin jazz, and Afro-Cuban music.',
    soundCharacter: 'Warm, resonant bass with crisp open tones and muted slaps. More melodic and sustained than djembe.',
    howItSounds: 'Like warm, talking drums — each hit sings a different note. The open tone rings out melodically while muted hits provide rhythmic punctuation.',
    genres: ['Salsa', 'Latin Jazz', 'Afro-Cuban', 'Funk', 'Bossa Nova'],
    promptTip: 'Use "congas" or "Latin percussion" for Afro-Cuban groove.',
    synth: { type: 'triangle', baseFreq: 150, envelope: { attack: 0.005, decay: 0.2, sustain: 0.05, release: 0.3 }, notes: [1, 1.5, 1, 1.5, 1.33, 1, 1.5, 1] }
  },
  {
    name: 'Tabla',
    category: 'Percussion',
    icon: '🪘',
    description: 'Pair of Indian hand drums (dayan and bayan). Incredibly complex and melodic. Each stroke has a specific syllable and sound.',
    soundCharacter: 'Extremely varied — from deep bass booms to sharp metallic rings to crisp snapping sounds. The most melodic drums in the world.',
    howItSounds: 'Like a tiny orchestra of drums — it can sing, speak, and dance. Rapid-fire patterns sound like someone speaking a rhythmic language. The bass drum hums and bends pitch.',
    genres: ['Indian Classical', 'Bollywood', 'Fusion', 'Ambient'],
    promptTip: 'Use "tabla" for Indian rhythmic texture. "Tabla loops" for modern fusion.',
    synth: { type: 'sine', baseFreq: 200, envelope: { attack: 0.005, decay: 0.15, sustain: 0.02, release: 0.15 }, detune: 10, notes: [1, 1.5, 1.25, 1.5, 1, 2, 1.25, 1] }
  },
  {
    name: 'Steel Pan',
    category: 'Percussion',
    icon: '🪘',
    description: 'Melodic percussion from Trinidad, made from oil drums. Each dimple produces a different note. The sound of Caribbean carnival.',
    soundCharacter: 'Bright, metallic, and singing. Each note rings with overtones that shimmer and dance.',
    howItSounds: 'Like sunshine turned into sound — bright, ringing, and joyful. Imagine bells made of metal that sing tropical melodies. Instantly transports you to a beach.',
    genres: ['Calypso', 'Soca', 'Reggae', 'Caribbean'],
    promptTip: 'Use "steel drums" or "steel pan" for instant Caribbean vibes.',
    synth: { type: 'sine', baseFreq: 523, envelope: { attack: 0.005, decay: 0.3, sustain: 0.15, release: 0.5 }, detune: 8, notes: [1, 1.25, 1, 0.75, 1, 1.25, 1.5, 1] }
  },
  // ─── BASS ───
  {
    name: 'Electric Bass',
    category: 'Bass',
    icon: '🎸',
    description: 'Four-stringed instrument providing the low-end foundation. The bridge between rhythm (drums) and harmony (chords).',
    soundCharacter: 'Deep, round, and punchy. Fingerstyle is warm and smooth; slap bass is funky and percussive; picked bass is aggressive and bright.',
    howItSounds: 'The deep rumble you feel more than hear — it\'s the groove that makes your body move. Slap bass adds percussive pops and thumps like a funky conversation.',
    genres: ['Funk', 'Rock', 'Jazz', 'R&B', 'Pop', 'Reggae'],
    promptTip: 'Specify "fingerstyle bass" (smooth), "slap bass" (funky), or "picked bass" (aggressive).',
    synth: { type: 'sawtooth', baseFreq: 82, envelope: { attack: 0.01, decay: 0.2, sustain: 0.5, release: 0.3 }, filterFreq: 800, notes: [1, 1, 1.33, 1.5, 1.33, 1, 0.75, 1] }
  },
  {
    name: 'Upright / Double Bass',
    category: 'Bass',
    icon: '🎻',
    description: 'Large acoustic bowed/plucked bass. Warm, woody tone. Essential in jazz, classical, and rockabilly.',
    soundCharacter: 'Warm, woody, and resonant. Plucked (pizzicato) has a satisfying thump; bowed (arco) is rich and sustaining.',
    howItSounds: 'Plucked: a deep, woody "thump" with each note — like a heartbeat with pitch. Bowed: a rich, rumbling warmth that fills the room from the floor up.',
    genres: ['Jazz', 'Classical', 'Rockabilly', 'Folk', 'Tango'],
    promptTip: 'Use "upright bass" or "double bass" for acoustic warmth. "Pizzicato bass" for jazz walking lines.',
    synth: { type: 'triangle', baseFreq: 73, envelope: { attack: 0.02, decay: 0.3, sustain: 0.3, release: 0.5 }, notes: [1, 1.33, 1.5, 1.33, 1, 0.89, 0.75, 1] }
  },
  {
    name: '808 Bass',
    category: 'Bass',
    icon: '💥',
    description: 'Synthesized bass from the Roland TR-808 drum machine. Deep, booming sub-bass that defines trap, hip-hop, and modern pop.',
    soundCharacter: 'Deep, booming, and sub-heavy. Long sustain that shakes speakers. Often pitched to play melodies.',
    howItSounds: 'The deepest sound you can imagine — more felt in your chest than heard with your ears. Like thunder rolling through the floor. It bends and slides between notes.',
    genres: ['Trap', 'Hip-Hop', 'Drill', 'Phonk', 'Brazilian Funk'],
    promptTip: 'Use "808 bass" or "808 sub bass" for modern hip-hop. "Sliding 808" for trap melodic bass.',
    synth: { type: 'sine', baseFreq: 55, envelope: { attack: 0.01, decay: 0.1, sustain: 0.8, release: 0.6 }, notes: [1, 1, 1.33, 1, 0.89, 1, 1.33, 1] }
  },
  // ─── ELECTRONIC ───
  {
    name: 'Synthesizer (Lead)',
    category: 'Electronic',
    icon: '🎛️',
    description: 'Electronic instrument generating sounds through oscillators, filters, and modulators. Infinite sonic possibilities — the backbone of electronic music.',
    soundCharacter: 'Varies infinitely — can be buzzy, smooth, harsh, ethereal, or anything in between. Defined by waveform, filter, and modulation.',
    howItSounds: 'From laser beams to ocean waves — synths can sound like literally anything. A lead synth cuts through a mix like a neon light cuts through darkness.',
    genres: ['EDM', 'Synthwave', 'Pop', 'Hip-Hop', 'Techno'],
    promptTip: 'Be specific: "saw lead synth" (buzzy), "square lead" (retro), "supersaw" (huge EDM sound).',
    synth: { type: 'sawtooth', baseFreq: 440, envelope: { attack: 0.02, decay: 0.1, sustain: 0.6, release: 0.3 }, filterFreq: 3000, detune: 7, notes: [1, 1.25, 1.5, 1.25, 1.33, 1.5, 1.25, 1] }
  },
  {
    name: 'Synth Pad',
    category: 'Electronic',
    icon: '🎛️',
    description: 'Sustained, evolving synthesizer sound used for atmospheric backgrounds and harmonic beds. Creates space and mood.',
    soundCharacter: 'Slow-building, lush, and expansive. Often uses chorus, reverb, and slow filter sweeps. Feels like an ambient cloud.',
    howItSounds: 'Like being wrapped in a warm blanket of sound — it fills all the empty space in a track without being noticeable. Slow, evolving, and atmospheric.',
    genres: ['Ambient', 'Synthwave', 'Chillout', 'EDM', 'Film Scores'],
    promptTip: 'Use "synth pad" or "ambient pad" for atmosphere. "Warm pad" for comfort, "dark pad" for tension.',
    synth: { type: 'sine', baseFreq: 220, envelope: { attack: 0.5, decay: 0.2, sustain: 0.8, release: 1.0 }, detune: 5, notes: [1, 1.25, 1.5, 1.25] }
  },
  // ─── WORLD / FOLK ───
  {
    name: 'Kora',
    category: 'World / Folk',
    icon: '🎵',
    description: '21-stringed West African harp played by griots (storytellers). Made from a large calabash gourd. One of Africa\'s most beautiful instruments.',
    soundCharacter: 'Bright, cascading, and harp-like but with a distinctive African warmth. Creates flowing, intricate patterns.',
    howItSounds: 'Like a waterfall of golden notes — cascading, sparkling, and endlessly flowing. Brighter and more rhythmic than a Western harp, with a warm, organic tone.',
    genres: ['Mandé Music', 'Afrobeat', 'World Music', 'Ambient'],
    promptTip: 'Use "kora" for West African texture. Pairs beautifully with modern beats.',
    synth: { type: 'triangle', baseFreq: 523, envelope: { attack: 0.005, decay: 0.3, sustain: 0.1, release: 0.5 }, notes: [1, 0.84, 0.67, 0.75, 0.84, 1, 1.19, 1] }
  },
  {
    name: 'Sitar',
    category: 'World / Folk',
    icon: '🎵',
    description: 'Indian stringed instrument with sympathetic strings that resonate and create a shimmering "buzz." Central to Indian classical music.',
    soundCharacter: 'Twangy, buzzy, and hypnotic. The sympathetic strings create a shimmering halo around each note. Lots of pitch bending.',
    howItSounds: 'A metallic, buzzy twang that shimmers and bends — like a guitar from another dimension. The sympathetic strings create a halo of harmonics around every note.',
    genres: ['Indian Classical', 'Psychedelic Rock', 'Bollywood', 'Fusion'],
    promptTip: 'Use "sitar" for instant Indian character. Works surprisingly well in electronic/psychedelic contexts.',
    synth: { type: 'sawtooth', baseFreq: 330, envelope: { attack: 0.01, decay: 0.4, sustain: 0.2, release: 0.5 }, filterFreq: 4000, detune: 15, notes: [1, 1.06, 1.125, 1.33, 1.5, 1.33, 1.125, 1] }
  },
  {
    name: 'Balafon',
    category: 'World / Folk',
    icon: '🪘',
    description: 'West African wooden xylophone with gourd resonators. Predecessor to the marimba. Buzzy, warm tone from small membranes on the gourds.',
    soundCharacter: 'Bright and woody with a distinctive buzz from the mirliton membranes. Warmer than a xylophone but with an extra layer of harmonic complexity.',
    howItSounds: 'Like a marimba with a bee living inside it — warm wooden tones with a characteristic buzzy rattle that gives it life and energy.',
    genres: ['Mandé Music', 'West African', 'Afrobeat', 'World Music'],
    promptTip: 'Use "balafon" for authentic West African mallet percussion.',
    synth: { type: 'square', baseFreq: 392, envelope: { attack: 0.005, decay: 0.2, sustain: 0.05, release: 0.3 }, filterFreq: 2500, notes: [1, 1.25, 1.5, 1.25, 1, 0.84, 1, 1.25] }
  },
  {
    name: 'Berimbau',
    category: 'World / Folk',
    icon: '🏹',
    description: 'Brazilian single-string instrument used in capoeira. A wooden bow with a gourd resonator. Produces hypnotic, rhythmic patterns.',
    soundCharacter: 'Metallic, percussive, and hypnotic. Two main pitches controlled by pressing a stone against the string. Rhythmic and trance-inducing.',
    howItSounds: 'A twangy, metallic "boing" that shifts between two pitches — like a musical bow that talks. The gourd adds a wah-wah effect as it opens and closes.',
    genres: ['Capoeira', 'Brazilian', 'World Music', 'Experimental'],
    promptTip: 'Use "berimbau" for authentic Brazilian/capoeira feel.',
    synth: { type: 'triangle', baseFreq: 196, envelope: { attack: 0.005, decay: 0.2, sustain: 0.15, release: 0.3 }, notes: [1, 1.33, 1, 1.33, 1, 1, 1.33, 1] }
  },
  {
    name: 'Oud',
    category: 'World / Folk',
    icon: '🎵',
    description: 'Ancient fretless stringed instrument from the Middle East/North Africa. Ancestor of the European lute. Rich, ornamental melodic style.',
    soundCharacter: 'Deep, warm, and resonant with a slight buzz. The fretless neck allows for smooth ornaments and microtonal playing.',
    howItSounds: 'Like a deeper, rounder guitar with endless ornamentation — notes slide and shimmer into each other. Warm, ancient, and deeply expressive.',
    genres: ['Arabic Music', 'Turkish', 'Gnawa', 'Mediterranean', 'Fusion'],
    promptTip: 'Use "oud" for Middle Eastern/North African character. "Oud melody" for ornamental phrases.',
    synth: { type: 'triangle', baseFreq: 196, envelope: { attack: 0.01, decay: 0.3, sustain: 0.3, release: 0.4 }, detune: 3, notes: [1, 1.06, 1.125, 1.33, 1.5, 1.33, 1.125, 1] }
  },
  {
    name: 'Didgeridoo',
    category: 'World / Folk',
    icon: '🎵',
    description: 'Aboriginal Australian wind instrument made from eucalyptus trunks. One of the oldest instruments on Earth (~1500+ years). Produces a deep drone.',
    soundCharacter: 'Deep, resonant drone with rich overtones. Circular breathing allows continuous playing. Rhythmic tongue and vocal techniques add texture.',
    howItSounds: 'Like the earth itself humming — a deep, continuous drone that vibrates in your bones. Overtones float on top like auroras over a dark landscape.',
    genres: ['Aboriginal', 'Ambient', 'Psytrance', 'Meditation', 'World Fusion'],
    promptTip: 'Use "didgeridoo" for deep droning bass texture. Works well in ambient and psychedelic contexts.',
    synth: { type: 'sawtooth', baseFreq: 65, envelope: { attack: 0.2, decay: 0.1, sustain: 0.9, release: 0.5 }, filterFreq: 400, notes: [1, 1, 1.02, 1, 0.98, 1, 1.02, 1] }
  },
  {
    name: 'Erhu',
    category: 'World / Folk',
    icon: '🎻',
    description: 'Chinese two-stringed fiddle with a small resonator covered in snakeskin. Known as the "Chinese violin" for its expressive, singing tone.',
    soundCharacter: 'Hauntingly beautiful, nasal, and incredibly expressive. Slides between notes with great emotion.',
    howItSounds: 'Like a voice crying or singing from far away — nasal, penetrating, and deeply emotional. It bends and slides between notes like a human wail.',
    genres: ['Chinese Classical', 'Chinese Pop', 'Film Scores', 'World Fusion'],
    promptTip: 'Use "erhu" for East Asian emotional character. Beautiful in slow, expressive passages.',
    synth: { type: 'sawtooth', baseFreq: 440, envelope: { attack: 0.08, decay: 0.1, sustain: 0.7, release: 0.3 }, filterFreq: 2000, detune: 6, notes: [1, 1.06, 1.125, 1.25, 1.125, 1.06, 1] }
  },
  {
    name: 'Accordion',
    category: 'World / Folk',
    icon: '🪗',
    description: 'Bellows-driven free-reed instrument. Found in folk music from France to Colombia to Nigeria. Both melody and harmony capable.',
    soundCharacter: 'Rich, reedy, and full. The bellows give dynamic control. Can be sweet and romantic or wild and energetic.',
    howItSounds: 'A warm, wheezy, full-bodied sound — like a small organ you can hug. It breathes in and out, giving the music a living, pulsing quality.',
    genres: ['Tango', 'Zydeco', 'Vallenato', 'Musette', 'Forró', 'Folk'],
    promptTip: 'Use "accordion" for European/Latin folk feel. "Bandoneon" specifically for tango.',
    synth: { type: 'square', baseFreq: 330, envelope: { attack: 0.08, decay: 0.05, sustain: 0.8, release: 0.2 }, filterFreq: 1500, detune: 4, notes: [1, 1.125, 1.25, 1.33, 1.25, 1.125, 1] }
  },

  // ─── STRINGS (expanded) ───
  {
    name: 'Banjo',
    category: 'Strings',
    icon: '🪕',
    description: 'Five-stringed instrument with a bright, twangy tone. Central to bluegrass, country, and Appalachian folk music.',
    soundCharacter: 'Bright, metallic, percussive attack with rapid decay. The open-back has a mellower tone; resonator backs project loudly.',
    howItSounds: 'A rapid, plucky, almost "plinky" sound — like a guitar but much brighter and more percussive, with notes that pop out sharply.',
    genres: ['Bluegrass', 'Country', 'Folk', 'Dixieland Jazz', 'Celtic'],
    promptTip: 'Use "banjo rolls" for fast fingerpicking patterns, "clawhammer banjo" for old-time folk.',
    synth: { type: 'triangle', baseFreq: 392, envelope: { attack: 0.005, decay: 0.15, sustain: 0.1, release: 0.3 }, notes: [1, 1.25, 1.5, 1.25, 1, 1.5, 1.25, 1] }
  },
  {
    name: 'Mandolin',
    category: 'Strings',
    icon: '🪕',
    description: 'Small, eight-stringed instrument (four pairs) with a bright, shimmering tone. Used in bluegrass, classical, and Mediterranean music.',
    soundCharacter: 'Bright, chiming, with a characteristic tremolo effect when notes are rapidly alternated. Sweet and clear in the upper register.',
    howItSounds: 'Like a tiny, sparkling guitar — notes shimmer and ring with a silvery quality. When tremolo-picked, it creates a sustained, shivering sound.',
    genres: ['Bluegrass', 'Classical', 'Irish Folk', 'Italian Folk', 'Country'],
    promptTip: 'Use "mandolin tremolo" for sustained shimmering notes, "mandolin chop" for rhythmic accents.',
    synth: { type: 'triangle', baseFreq: 440, envelope: { attack: 0.005, decay: 0.12, sustain: 0.15, release: 0.25 }, detune: 3, notes: [1, 1.125, 1.25, 1.5, 1.25, 1.125, 1] }
  },
  {
    name: 'Pedal Steel Guitar',
    category: 'Strings',
    icon: '🎸',
    description: 'Table-mounted guitar with foot pedals and knee levers that bend notes smoothly. The defining sound of classic country.',
    soundCharacter: 'Smooth, crying, with signature sliding pitch bends. Warm and liquid, with notes that glide seamlessly into each other.',
    howItSounds: 'A weeping, swooping sound — notes seem to cry and moan as they slide between pitches. Like a guitar made of liquid honey.',
    genres: ['Country', 'Western Swing', 'Americana', 'Ambient', 'Shoegaze'],
    promptTip: 'Use "pedal steel" or "crying steel guitar" for that classic country weeping sound.',
    synth: { type: 'sine', baseFreq: 330, envelope: { attack: 0.05, decay: 0.1, sustain: 0.7, release: 0.6 }, notes: [1, 1.06, 1.125, 1.25, 1.125, 1] }
  },
  {
    name: 'Ukulele',
    category: 'Strings',
    icon: '🪕',
    description: 'Small four-stringed Hawaiian instrument. Cheerful, bright tone that evokes tropical and feel-good vibes.',
    soundCharacter: 'Light, bright, and cheerful with a quick, gentle attack. Nylon strings give it a soft, friendly quality.',
    howItSounds: 'A tiny, happy-sounding guitar — like sunshine turned into music. Light strumming creates an instant feel-good island vibe.',
    genres: ['Hawaiian', 'Pop', 'Indie Folk', 'Children\'s Music'],
    promptTip: 'Use "ukulele strumming" for cheerful, tropical energy. Great for lighthearted and playful moods.',
    synth: { type: 'sine', baseFreq: 440, envelope: { attack: 0.01, decay: 0.2, sustain: 0.15, release: 0.3 }, notes: [1, 1.25, 1.5, 1.33, 1, 1.25] }
  },

  // ─── KEYS & MALLETS (expanded) ───
  {
    name: 'Organ (Hammond)',
    category: 'Keys & Mallets',
    icon: '🎹',
    description: 'Tonewheel organ with rotating Leslie speaker. Essential in gospel, jazz, blues, and classic rock.',
    soundCharacter: 'Rich, full, buzzy harmonics with rotating speaker effect. Can be mellow or screaming depending on drawbar settings.',
    howItSounds: 'A big, swirling, buzzy tone — like a choir of bees singing in harmony. The Leslie speaker adds a dreamy, rotating wobble.',
    genres: ['Gospel', 'Blues', 'Jazz', 'Classic Rock', 'Soul', 'Reggae'],
    promptTip: 'Use "Hammond organ" or "B3 organ" for soulful/rock. Add "Leslie speaker" for the swirling effect.',
    synth: { type: 'square', baseFreq: 262, envelope: { attack: 0.02, decay: 0.05, sustain: 0.85, release: 0.15 }, filterFreq: 2500, detune: 6, notes: [1, 1.25, 1.5, 1, 1.25, 1.5, 1.33, 1] }
  },
  {
    name: 'Vibraphone',
    category: 'Keys & Mallets',
    icon: '🎵',
    description: 'Metal-barred percussion instrument with motor-driven resonators that create a pulsing vibrato. A staple of cool jazz.',
    soundCharacter: 'Bell-like, shimmering, with a distinctive wobbling vibrato. Metallic but warm, notes sustain beautifully.',
    howItSounds: 'Imagine a xylophone made of silver — notes ring out with a warm, glowing shimmer, gently pulsing with a dreamy vibrato.',
    genres: ['Jazz', 'Easy Listening', 'Film Scores', 'Neo-Soul', 'Ambient'],
    promptTip: 'Use "vibraphone" or "vibes" for sophisticated jazz texture. "Mallet instrument" for a more general bell-like tone.',
    synth: { type: 'sine', baseFreq: 440, envelope: { attack: 0.01, decay: 0.8, sustain: 0.3, release: 1.0 }, detune: 2, notes: [1, 1.25, 1.5, 1.33, 1, 0.75] }
  },
  {
    name: 'Celesta',
    category: 'Keys & Mallets',
    icon: '✨',
    description: 'Keyboard instrument with hammers striking metal plates. Produces a delicate, bell-like sparkle. Famous from "Dance of the Sugar Plum Fairy."',
    soundCharacter: 'Ethereal, glassy, crystalline. Like tiny bells being played by a fairy — magical and delicate.',
    howItSounds: 'Twinkling, music-box-like notes that sparkle and float. Each note sounds like a tiny star chiming.',
    genres: ['Classical', 'Film Scores', 'Fantasy Soundtracks', 'Holiday Music'],
    promptTip: 'Use "celesta" for magical, fairy-tale sparkle. Great for fantasy or whimsical moods.',
    synth: { type: 'sine', baseFreq: 523, envelope: { attack: 0.005, decay: 0.4, sustain: 0.1, release: 0.6 }, notes: [1, 1.25, 1.5, 1.75, 2, 1.5, 1] }
  },

  // ─── BRASS (expanded) ───
  {
    name: 'Tuba',
    category: 'Brass',
    icon: '🎺',
    description: 'The largest and lowest brass instrument. Provides the bass foundation in brass bands, orchestras, and marching bands.',
    soundCharacter: 'Deep, round, and resonant. Warm and powerful in the low register, with a surprisingly agile character.',
    howItSounds: 'A deep, booming "oom-pah" sound — like a giant blowing into a massive golden pipe. Rich and rumbling.',
    genres: ['Classical', 'Marching Band', 'Brass Band', 'Polka', 'New Orleans Jazz'],
    promptTip: 'Use "tuba" for bass brass lines. "Sousaphone" for marching band feel.',
    synth: { type: 'sawtooth', baseFreq: 65, envelope: { attack: 0.06, decay: 0.1, sustain: 0.7, release: 0.3 }, filterFreq: 400, notes: [1, 1.33, 1, 0.75, 1, 1.33, 1] }
  },

  // ─── WOODWINDS (expanded) ───
  {
    name: 'Oboe',
    category: 'Woodwinds',
    icon: '🎵',
    description: 'Double-reed woodwind with a penetrating, nasal tone. Often carries the melody in orchestral music and tunes the orchestra.',
    soundCharacter: 'Reedy, nasal, penetrating, and bittersweet. Highly expressive with a vocal, almost human quality.',
    howItSounds: 'A plaintive, slightly nasal singing voice — like someone humming through their nose in the most beautiful way. Piercing but sweet.',
    genres: ['Classical', 'Baroque', 'Film Scores', 'Chamber Music'],
    promptTip: 'Use "oboe" for pastoral, melancholic, or noble melodies. Perfect for expressing longing.',
    synth: { type: 'sawtooth', baseFreq: 440, envelope: { attack: 0.04, decay: 0.08, sustain: 0.7, release: 0.2 }, filterFreq: 1800, notes: [1, 1.125, 1.25, 1.33, 1.25, 1.125, 1] }
  },
  {
    name: 'Harmonica',
    category: 'Woodwinds',
    icon: '🎵',
    description: 'Free-reed instrument played by blowing and drawing air. Essential in blues, folk, country, and rock.',
    soundCharacter: 'Wailing, bending, raw and expressive. Can be sweet and folksy or gritty and bluesy depending on technique.',
    howItSounds: 'A wailing, moaning, human-like cry — notes bend and slide like a voice. Sounds lonely on a train platform at midnight.',
    genres: ['Blues', 'Folk', 'Country', 'Rock', 'Americana'],
    promptTip: 'Use "blues harmonica" or "blues harp" for gritty feel. "Chromatic harmonica" for jazz/classical.',
    synth: { type: 'square', baseFreq: 392, envelope: { attack: 0.03, decay: 0.05, sustain: 0.8, release: 0.15 }, filterFreq: 2000, notes: [1, 1.125, 1, 0.89, 1, 1.125, 1.25, 1] }
  },
  {
    name: 'Bagpipes',
    category: 'Woodwinds',
    icon: '🎵',
    description: 'Reed instrument with a constant drone supplied by an air bag. Iconic in Scottish, Irish, and various folk traditions.',
    soundCharacter: 'Loud, droning, piercing, and majestic. The continuous drone creates a hypnotic bed under the melody.',
    howItSounds: 'A loud, buzzing wail over a constant humming drone — like a swarm of noble bees marching into battle. Impossible to ignore.',
    genres: ['Celtic', 'Scottish Folk', 'Military', 'Medieval', 'World Fusion'],
    promptTip: 'Use "bagpipes" for dramatic, Celtic, or military atmosphere. Pair with "drone" for authenticity.',
    synth: { type: 'sawtooth', baseFreq: 370, envelope: { attack: 0.1, decay: 0.05, sustain: 0.9, release: 0.1 }, filterFreq: 1200, detune: 5, notes: [1, 1.125, 1.25, 1.33, 1.25, 1, 1] }
  },

  // ─── PERCUSSION (expanded) ───
  {
    name: 'Cajón',
    category: 'Percussion',
    icon: '🪘',
    description: 'Wooden box drum originating from Peru. Played by slapping the front face while sitting on it. Popular in acoustic and flamenco settings.',
    soundCharacter: 'Warm, woody bass tones from the center; sharp, snappy highs from the edges. A full drum kit in a single box.',
    howItSounds: 'Like a kick drum and snare combined in a wooden box — deep thump when you hit the middle, crisp slap on the edges.',
    genres: ['Flamenco', 'Acoustic Pop', 'Latin', 'Singer-Songwriter', 'Unplugged'],
    promptTip: 'Use "cajón" for acoustic/unplugged percussion. Great alternative to a full drum kit.',
    synth: { type: 'triangle', baseFreq: 80, envelope: { attack: 0.005, decay: 0.15, sustain: 0.05, release: 0.1 }, notes: [1, 2, 1, 2.5, 1, 1, 2, 1] }
  },
  {
    name: 'Tambourine',
    category: 'Percussion',
    icon: '🪩',
    description: 'Frame drum with metal jingles. Adds brightness and rhythm to almost any music style. Shaken, struck, or played with fingers.',
    soundCharacter: 'Bright, shimmery, jangling metallic rattle. Adds sparkle and energy to rhythms.',
    howItSounds: 'A shaking, jingling brightness — like shaking a handful of tiny bells. Adds an instant party feel to any beat.',
    genres: ['Pop', 'Rock', 'Gospel', 'Folk', 'Dance', 'R&B'],
    promptTip: 'Use "tambourine" for rhythmic shimmer. "Tambourine hits" for accents on 2 and 4.',
    synth: { type: 'square', baseFreq: 800, envelope: { attack: 0.001, decay: 0.08, sustain: 0.02, release: 0.1 }, filterFreq: 3000, notes: [1, 0, 1, 0, 1, 1, 0, 1] }
  },
  {
    name: 'Talking Drum',
    category: 'Percussion',
    icon: '🪘',
    description: 'West African hourglass-shaped drum that can mimic the tones of speech by squeezing the tension cords while playing.',
    soundCharacter: 'Melodic, pitch-bending percussion. The tone sweeps up and down, creating a "talking" effect unique to this drum.',
    howItSounds: 'A drum that speaks — the pitch slides up and down as the player squeezes it, making it sound like it\'s having a conversation.',
    genres: ['West African', 'Afrobeat', 'World Fusion', 'Experimental'],
    promptTip: 'Use "talking drum" for pitch-bending African percussion. Adds vocal-like rhythmic texture.',
    synth: { type: 'triangle', baseFreq: 200, envelope: { attack: 0.01, decay: 0.2, sustain: 0.3, release: 0.15 }, notes: [1, 1.5, 0.75, 1.25, 1, 1.75, 1.25, 1] }
  },

  // ─── BASS (expanded) ───
  {
    name: 'Synth Bass',
    category: 'Bass',
    icon: '🎛️',
    description: 'Synthesized bass sounds ranging from wobbly dubstep to punchy funk. The backbone of electronic music.',
    soundCharacter: 'Thick, powerful, and infinitely variable. Can be smooth sub-bass, gritty acid bass, or wobbly dubstep growl.',
    howItSounds: 'A deep, throbbing electronic pulse you feel in your chest more than hear. Can wobble, growl, or punch depending on style.',
    genres: ['EDM', 'Dubstep', 'House', 'Drum & Bass', 'Synthwave', 'Funk'],
    promptTip: 'Specify style: "acid bass" (squelchy), "sub bass" (deep), "reese bass" (detuned), "wobble bass" (dubstep).',
    synth: { type: 'sawtooth', baseFreq: 55, envelope: { attack: 0.01, decay: 0.15, sustain: 0.6, release: 0.2 }, filterFreq: 300, detune: 8, notes: [1, 1, 1.33, 1, 1.5, 1, 1.33, 1] }
  },
  {
    name: 'Fretless Bass',
    category: 'Bass',
    icon: '🎸',
    description: 'Bass guitar without frets, allowing smooth slides between notes. Famous from Jaco Pastorius\' revolutionary playing.',
    soundCharacter: 'Smooth, singing, "mwah" quality with vocal-like slides. Warm and expressive with endless sustain.',
    howItSounds: 'A bass that sings — notes slide smoothly into each other like a voice, with a distinctive "mwah" buzz on each note.',
    genres: ['Jazz Fusion', 'R&B', 'Progressive Rock', 'World Music'],
    promptTip: 'Use "fretless bass" for smooth, singing bass lines. "Jaco-style bass" for jazz fusion.',
    synth: { type: 'sine', baseFreq: 82, envelope: { attack: 0.03, decay: 0.1, sustain: 0.7, release: 0.4 }, notes: [1, 1.125, 1.25, 1.33, 1.5, 1.33, 1.25, 1] }
  },

  // ─── ELECTRONIC (expanded) ───
  {
    name: 'Arpeggiator / Synth Arp',
    category: 'Electronic',
    icon: '🎛️',
    description: 'Automatically plays notes of a chord in sequence. Creates hypnotic, cascading patterns central to electronic and synth-pop music.',
    soundCharacter: 'Rhythmic, cascading, hypnotic sequences. Can be bubbly, dark, soaring, or mechanical depending on sound design.',
    howItSounds: 'A rapid, repeating cascade of notes running up and down — like musical stairs being climbed at high speed, over and over.',
    genres: ['Synthwave', 'Trance', 'Synth-Pop', 'Italo Disco', 'Ambient'],
    promptTip: 'Use "synth arpeggio" or "arp sequence" for pulsing electronic patterns. Specify "fast arp" or "slow arp".',
    synth: { type: 'sawtooth', baseFreq: 262, envelope: { attack: 0.005, decay: 0.1, sustain: 0.3, release: 0.15 }, filterFreq: 3000, notes: [1, 1.25, 1.5, 2, 1.5, 1.25, 1, 0.75] }
  },
  {
    name: 'Vocoder',
    category: 'Electronic',
    icon: '🤖',
    description: 'Encodes a voice signal onto a synthesizer, creating robotic vocal effects. Iconic in funk, electronic, and experimental music.',
    soundCharacter: 'Robotic, choir-like, alien. Human speech becomes musical — vowels turn into chords, words become melodies.',
    howItSounds: 'A robot choir singing — human words processed through a synthesizer so they sound mechanical and harmonized simultaneously.',
    genres: ['Funk', 'Electronic', 'Hip-Hop', 'Synthwave', 'Experimental'],
    promptTip: 'Use "vocoder vocals" or "talk box" for robotic singing. "Daft Punk style vocals" for the classic effect.',
    synth: { type: 'sawtooth', baseFreq: 220, envelope: { attack: 0.02, decay: 0.05, sustain: 0.8, release: 0.1 }, filterFreq: 1500, detune: 10, notes: [1, 1, 1.25, 1.25, 1.5, 1.5, 1.33, 1] }
  },

  // ─── WORLD / FOLK (expanded) ───
  {
    name: 'Mbira',
    category: 'World / Folk',
    icon: '🎵',
    description: 'Zimbabwean thumb piano with metal tines mounted on a wooden board, often inside a gourd resonator. Sacred instrument of the Shona people.',
    soundCharacter: 'Delicate, crystalline, buzzy-sweet. The metal tines create interlocking patterns with a characteristic buzzing overtone.',
    howItSounds: 'Like a music box from the forest — bright, plinking metallic notes with a mysterious buzzing rattle underneath. Hypnotic and ancient.',
    genres: ['Zimbabwean', 'Afro-Pop', 'World Music', 'Ambient', 'Neo-Folk'],
    promptTip: 'Use "mbira" for Zimbabwean/Shona texture. Different from kalimba — mbira has a buzzier, more complex resonance.',
    synth: { type: 'triangle', baseFreq: 523, envelope: { attack: 0.005, decay: 0.3, sustain: 0.15, release: 0.4 }, detune: 3, notes: [1, 0.75, 1.25, 1, 0.89, 1.125, 0.75, 1] }
  },
  {
    name: 'Guzheng',
    category: 'World / Folk',
    icon: '🎵',
    description: 'Chinese 21-string zither with a 2,500-year history. Plucked with fingerpicks, producing cascading, shimmering arpeggios.',
    soundCharacter: 'Bright, resonant, cascading. Strings vibrate with a silky shimmer. Bends and slides give it an expressive, vocal quality.',
    howItSounds: 'Imagine a waterfall made of silk threads — cascading, glittering notes that flow and shimmer, with dramatic bends between pitches.',
    genres: ['Chinese Classical', 'Chinese Pop', 'World Fusion', 'Film Scores', 'New Age'],
    promptTip: 'Use "guzheng" or "Chinese zither" for East Asian atmosphere. Great for sweeping, dramatic moments.',
    synth: { type: 'triangle', baseFreq: 392, envelope: { attack: 0.01, decay: 0.4, sustain: 0.2, release: 0.6 }, notes: [1, 1.125, 1.25, 1.5, 1.75, 2, 1.5, 1] }
  },
  {
    name: 'Bouzouki',
    category: 'World / Folk',
    icon: '🪕',
    description: 'Long-necked lute central to Greek music. Also widely adopted in Irish folk. Bright, metallic, and rhythmically driving.',
    soundCharacter: 'Bright, metallic, ringing. Steel strings create a sharp, trebly shimmer. Tremolo picking is a signature technique.',
    howItSounds: 'A bright, jangling cascade of metallic notes — like a mandolin\'s sharper, more intense cousin. Rings with Mediterranean sunshine.',
    genres: ['Rebetiko', 'Greek Folk', 'Irish Folk', 'Mediterranean', 'World Fusion'],
    promptTip: 'Use "bouzouki" for Greek/Mediterranean feel. "Irish bouzouki" for Celtic arrangements.',
    synth: { type: 'triangle', baseFreq: 370, envelope: { attack: 0.005, decay: 0.15, sustain: 0.2, release: 0.3 }, detune: 2, notes: [1, 1.25, 1.5, 1.25, 1, 0.89, 1, 1.25] }
  },
  {
    name: 'Hang Drum / Handpan',
    category: 'World / Folk',
    icon: '🛸',
    description: 'Steel UFO-shaped instrument played with hands. Produces ethereal, bell-like, meditative tones. Invented in 2000 in Switzerland.',
    soundCharacter: 'Ethereal, bell-like, warm, and resonant. Each note blooms with rich overtones. Deeply calming and meditative.',
    howItSounds: 'Like a steel drum married a singing bowl — warm, resonant notes that bloom and hover in the air. Deeply peaceful and otherworldly.',
    genres: ['Ambient', 'Meditation', 'World Fusion', 'Busking', 'New Age', 'Yoga Music'],
    promptTip: 'Use "handpan" or "hang drum" for ethereal, meditative atmosphere. Perfect for calm, spiritual moods.',
    synth: { type: 'sine', baseFreq: 294, envelope: { attack: 0.01, decay: 0.6, sustain: 0.25, release: 0.8 }, notes: [1, 1.2, 1.33, 1.5, 1.33, 1.2, 1, 0.89] }
  },
  {
    name: 'Shamisen',
    category: 'World / Folk',
    icon: '🎵',
    description: 'Japanese three-stringed lute with a percussive, sharp tone. Used in kabuki theater, folk music, and modern rock fusion.',
    soundCharacter: 'Sharp, percussive, twangy attack with a raw, buzzing resonance. Aggressive and rhythmic — surprisingly punk.',
    howItSounds: 'A sharp, snapping twang — each note hits hard with a buzzy slap, like an aggressive banjo with attitude. Raw and exciting.',
    genres: ['Japanese Traditional', 'Kabuki', 'Tsugaru-jamisen', 'J-Rock Fusion', 'World'],
    promptTip: 'Use "shamisen" for Japanese traditional or modern fusion. "Tsugaru-jamisen" for aggressive, fast style.',
    synth: { type: 'sawtooth', baseFreq: 330, envelope: { attack: 0.005, decay: 0.15, sustain: 0.15, release: 0.2 }, filterFreq: 2500, notes: [1, 1.33, 1, 1.5, 1.33, 1, 0.75, 1] }
  },
  {
    name: 'Pan Flute',
    category: 'World / Folk',
    icon: '🪈',
    description: 'Ancient wind instrument made of graduated tubes. Found in Andean, Romanian, and Chinese traditions. Pure, breathy tone.',
    soundCharacter: 'Breathy, pure, airy, with a natural wind-like quality. Each note has a soft, gentle attack with an ethereal sustain.',
    howItSounds: 'Like the wind itself learned to sing — pure, breathy notes that float and hover. Evokes mountain tops and misty valleys.',
    genres: ['Andean', 'Romanian Folk', 'New Age', 'World Music', 'Meditation'],
    promptTip: 'Use "pan flute" for Andean/mountainous atmosphere. "Zampoña" for South American specificity.',
    synth: { type: 'sine', baseFreq: 523, envelope: { attack: 0.06, decay: 0.05, sustain: 0.7, release: 0.3 }, notes: [1, 1.125, 1.25, 1.33, 1.25, 1, 0.89, 1] }
  },
];

// Play an instrument demo using Web Audio API
export function playInstrumentDemo(instrument: InstrumentInfo): { stop: () => void } {
  let ctx: AudioContext;
  try {
    ctx = new AudioContext();
  } catch (e) {
    console.error('[InstrumentDemo] Failed to create AudioContext:', e);
    return { stop: () => {} };
  }

  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }

  const { synth } = instrument;
  const notes = synth.notes || [1];
  const noteTime = 0.35;
  const totalTime = notes.length * noteTime;

  try {
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(1, ctx.currentTime);
    gainNode.connect(ctx.destination);

    let output: AudioNode = gainNode;
    if (synth.filterFreq) {
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = synth.filterFreq;
      filter.Q.value = 1;
      filter.connect(gainNode);
      output = filter;
    }

    const oscillators: OscillatorNode[] = [];
    const now = ctx.currentTime + 0.1;

    notes.forEach((mult, i) => {
      const startTime = now + i * noteTime;
      const freq = synth.baseFreq * mult;
      const { attack, decay, sustain, release } = synth.envelope;

      const osc = ctx.createOscillator();
      osc.type = synth.type;
      osc.frequency.setValueAtTime(freq, startTime);
      if (synth.detune) osc.detune.setValueAtTime(synth.detune, startTime);

      // Clamp envelope times to fit within noteTime
      const envAttack = Math.min(attack, noteTime * 0.3);
      const envDecay = Math.min(decay, noteTime * 0.3);
      const envRelease = Math.min(release, noteTime * 0.3);
      const sustainEnd = Math.max(startTime + envAttack + envDecay, startTime + noteTime - envRelease);

      const noteGain = ctx.createGain();
      noteGain.gain.setValueAtTime(0, startTime);
      noteGain.gain.linearRampToValueAtTime(0.3, startTime + envAttack);
      noteGain.gain.linearRampToValueAtTime(0.3 * sustain, startTime + envAttack + envDecay);
      noteGain.gain.setValueAtTime(0.3 * sustain, sustainEnd);
      noteGain.gain.linearRampToValueAtTime(0, startTime + noteTime);

      osc.connect(noteGain);
      noteGain.connect(output);
      osc.start(startTime);
      osc.stop(startTime + noteTime + 0.1);
      oscillators.push(osc);
    });

    

    let stopped = false;
    const stop = () => {
      if (stopped) return;
      stopped = true;
      console.log('[InstrumentDemo] Stopping demo');
      oscillators.forEach(o => { try { o.stop(); } catch {} });
      ctx.close().catch(() => {});
    };

    setTimeout(stop, totalTime * 1000 + 500);

    return { stop };
  } catch (e) {
    console.error('[InstrumentDemo] Error scheduling audio:', e);
    ctx.close().catch(() => {});
    return { stop: () => {} };
  }
}
