import { useState, useRef, useMemo } from 'react';
import { INSTRUMENTS, INSTRUMENT_CATEGORIES, playInstrumentDemo, type InstrumentInfo } from '@/lib/instruments-data';
import { Search, Play, Square, Volume2, Sparkles, Filter } from 'lucide-react';
import CopyableText from './CopyableText';

import stringsImg from '@/assets/instruments/strings.jpg';
import keysImg from '@/assets/instruments/keys.jpg';
import brassImg from '@/assets/instruments/brass.jpg';
import woodwindsImg from '@/assets/instruments/woodwinds.jpg';
import percussionImg from '@/assets/instruments/percussion.jpg';
import bassImg from '@/assets/instruments/bass.jpg';
import electronicImg from '@/assets/instruments/electronic.jpg';
import worldImg from '@/assets/instruments/world.jpg';

const CATEGORY_IMAGES: Record<string, string> = {
  'Strings': stringsImg,
  'Keys & Mallets': keysImg,
  'Brass': brassImg,
  'Woodwinds': woodwindsImg,
  'Percussion': percussionImg,
  'Bass': bassImg,
  'Electronic': electronicImg,
  'World / Folk': worldImg,
};

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

  // Group filtered instruments by category
  const grouped = useMemo(() => {
    const groups: Record<string, InstrumentInfo[]> = {};
    for (const inst of filtered) {
      if (!groups[inst.category]) groups[inst.category] = [];
      groups[inst.category].push(inst);
    }
    return groups;
  }, [filtered]);

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

      {/* Grouped by category with banner images */}
      {Object.entries(grouped).map(([category, instruments]) => (
        <div key={category} className="space-y-4">
          {/* Category banner */}
          <div className="relative rounded-xl overflow-hidden h-36">
            <img
              src={CATEGORY_IMAGES[category]}
              alt={category}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
            <div className="absolute inset-0 flex items-center px-6">
              <div>
                <h3 className="text-xl font-bold text-foreground tracking-tight">{category}</h3>
                <p className="text-sm text-muted-foreground mt-0.5">{instruments.length} instrument{instruments.length !== 1 ? 's' : ''}</p>
              </div>
            </div>
          </div>

          {/* Instrument cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {instruments.map(inst => {
              const isPlaying = playingInstrument === inst.name;
              return (
                <div key={inst.name} className="glass rounded-xl p-5 space-y-3 hover:border-primary/30 transition-all">
                  {/* Title */}
                  <div className="flex items-start gap-3">
                    <span className="text-3xl leading-none">{inst.icon}</span>
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
        </div>
      ))}

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
