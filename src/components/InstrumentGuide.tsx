import { useState, useRef } from 'react';
import { INSTRUMENTS, INSTRUMENT_CATEGORIES, playInstrumentDemo, type InstrumentInfo } from '@/lib/instruments-data';
import { Search, Play, Square, Volume2, Sparkles, Filter } from 'lucide-react';

const InstrumentGuide = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [playingInstrument, setPlayingInstrument] = useState<string | null>(null);
  const playerRef = useRef<{ stop: () => void } | null>(null);

  const togglePlay = (instrument: InstrumentInfo) => {
    if (playingInstrument === instrument.name) {
      playerRef.current?.stop();
      playerRef.current = null;
      setPlayingInstrument(null);
    } else {
      playerRef.current?.stop();
      const player = playInstrumentDemo(instrument);
      playerRef.current = player;
      setPlayingInstrument(instrument.name);
      // Auto-clear after demo finishes
      const notes = instrument.synth.notes || [1];
      const duration = notes.length * 350 + 300;
      setTimeout(() => {
        setPlayingInstrument(prev => prev === instrument.name ? null : prev);
      }, duration);
    }
  };

  const filtered = INSTRUMENTS.filter(inst => {
    const matchesCat = !selectedCategory || inst.category === selectedCategory;
    if (!search) return matchesCat;
    const q = search.toLowerCase();
    return matchesCat && (
      inst.name.toLowerCase().includes(q) ||
      inst.category.toLowerCase().includes(q) ||
      inst.genres.some(g => g.toLowerCase().includes(q)) ||
      inst.description.toLowerCase().includes(q) ||
      inst.soundCharacter.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Header */}
      <div className="glass rounded-xl p-5">
        <h2 className="text-lg font-semibold text-foreground mb-1">
          🎵 Instrument Encyclopedia — {INSTRUMENTS.length} Instruments
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Learn how every instrument sounds, where it's used, and how to describe it in AI prompts. Click play to hear a synthesized demo.
        </p>
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search instruments, genres, sounds... (e.g., djembe, brass, African)"
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        {/* Category pills */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              !selectedCategory
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80'
            }`}
          >
            All
          </button>
          {INSTRUMENT_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Instrument cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(inst => {
          const isPlaying = playingInstrument === inst.name;
          return (
            <div key={inst.name} className="glass rounded-xl p-5 space-y-3 hover:border-primary/30 transition-all">
              {/* Title */}
              <div className="flex items-start gap-3">
                <span className="text-2xl">{inst.icon}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-foreground">{inst.name}</h3>
                  <span className="text-xs font-mono text-primary/80 bg-primary/10 px-2 py-0.5 rounded-full">
                    {inst.category}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed">{inst.description}</p>

              {/* Sound Character */}
              <div className="p-3 rounded-lg bg-secondary/50 border border-border/50 space-y-2">
                <div className="flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs font-semibold text-foreground uppercase tracking-wider">Sound Character</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{inst.soundCharacter}</p>
              </div>

              {/* How It Sounds */}
              <div className="p-3 rounded-lg bg-accent/5 border border-accent/10 space-y-2">
                <span className="text-xs font-semibold text-accent uppercase tracking-wider">🎧 How It Actually Sounds</span>
                <p className="text-xs text-accent/80 leading-relaxed italic">{inst.howItSounds}</p>
              </div>

              {/* Genres */}
              <div>
                <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Found In</span>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {inst.genres.map(g => (
                    <span key={g} className="px-2 py-0.5 text-xs rounded-full bg-primary/15 text-primary border border-primary/20">
                      {g}
                    </span>
                  ))}
                </div>
              </div>

              {/* Prompt Tip */}
              <div className="p-3 rounded-lg bg-primary/5 border border-primary/10 space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">AI Prompt Tip</span>
                </div>
                <p className="text-xs text-primary/80 font-mono">{inst.promptTip}</p>
              </div>

              {/* Play Demo */}
              <button
                onClick={() => togglePlay(inst)}
                className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-medium transition-all border ${
                  isPlaying
                    ? 'bg-primary/15 border-primary/30 text-primary animate-pulse'
                    : 'bg-secondary/50 border-border hover:bg-secondary text-muted-foreground hover:text-foreground'
                }`}
              >
                {isPlaying ? (
                  <>
                    <Square className="w-3.5 h-3.5 shrink-0" />
                    <span>Stop — Playing {inst.name} demo</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 shrink-0" />
                    <span>▶ Play {inst.name} Sound Demo</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Filter className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p>No instruments match "{search}"</p>
        </div>
      )}
    </div>
  );
};

export default InstrumentGuide;
