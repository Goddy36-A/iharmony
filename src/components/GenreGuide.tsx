import { useState, useRef, useEffect } from 'react';
import { GENRES, type GenreInfo } from '@/lib/music-data';
import { playGenreBeat, getPatternBpm, type GenrePlayer } from '@/lib/genre-synth';
import { Music, Clock, Gauge, Play, Square, Sparkles, Search, Volume2 } from 'lucide-react';

const GenreGuide = () => {
  const [search, setSearch] = useState('');
  const [playingGenre, setPlayingGenre] = useState<string | null>(null);
  const playerRef = useRef<GenrePlayer | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      playerRef.current?.stop();
    };
  }, []);

  const togglePlay = (genreName: string) => {
    if (playingGenre === genreName) {
      playerRef.current?.stop();
      playerRef.current = null;
      setPlayingGenre(null);
    } else {
      playerRef.current?.stop();
      const player = playGenreBeat(genreName);
      playerRef.current = player;
      setPlayingGenre(genreName);

      // Poll for completion
      const check = setInterval(() => {
        if (!player.isPlaying()) {
          clearInterval(check);
          setPlayingGenre(prev => prev === genreName ? null : prev);
        }
      }, 200);
    }
  };

  const filteredGenres = GENRES.filter(g => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      g.name.toLowerCase().includes(q) ||
      g.characteristics.some(c => c.toLowerCase().includes(q)) ||
      g.keyArtists.some(a => a.toLowerCase().includes(q)) ||
      g.subgenres?.some(s => s.toLowerCase().includes(q)) ||
      g.description.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Header */}
      <div className="glass rounded-xl p-5">
        <h2 className="text-lg font-semibold text-foreground mb-1">
          🌍 Genre Knowledge Base — {GENRES.length} Genres
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Every genre with BPM, scales, prompt tips, and synthesized beat demos. Click play to hear each genre's signature rhythm pattern.
        </p>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search genres, artists, styles... (e.g., amapiano, funk, 808)"
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>

      {/* Genre cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredGenres.map(genre => {
          const isPlaying = playingGenre === genre.name;
          const demoBpm = getPatternBpm(genre.name);

          return (
            <div key={genre.name} className="glass rounded-xl p-5 space-y-4 hover:border-primary/30 transition-all">
              <div>
                <h3 className="text-lg font-semibold text-foreground">{genre.name}</h3>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{genre.description}</p>
              </div>

              <div className="flex flex-wrap gap-3 text-sm">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Gauge className="w-3.5 h-3.5 text-primary" />
                  <span className="font-mono">{genre.bpm} BPM</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  <span className="font-mono">{genre.timeSignature}</span>
                </div>
              </div>

              <div>
                <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Common Scales</span>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {genre.commonScales.map(scale => (
                    <span key={scale} className="px-2 py-0.5 text-xs rounded-full bg-primary/15 text-primary border border-primary/20">
                      {scale}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Characteristics</span>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {genre.characteristics.map(c => (
                    <span key={c} className="px-2 py-0.5 text-xs rounded-full bg-accent/10 text-accent border border-accent/20">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {genre.subgenres && genre.subgenres.length > 0 && (
                <div>
                  <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Subgenres</span>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {genre.subgenres.map(s => (
                      <span key={s} className="px-2 py-0.5 text-xs rounded-full bg-secondary text-secondary-foreground border border-border">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Key Artists</span>
                <p className="text-sm text-secondary-foreground mt-1">{genre.keyArtists.join(' · ')}</p>
              </div>

              {/* Prompt Tips */}
              {genre.promptTips && genre.promptTips.length > 0 && (
                <div className="p-3 rounded-lg bg-primary/5 border border-primary/10 space-y-1.5">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">AI Prompt Tips</span>
                  </div>
                  {genre.promptTips.map((tip, i) => (
                    <p key={i} className="text-xs text-primary/80 font-mono">{tip}</p>
                  ))}
                </div>
              )}

              {/* Beat Demo */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5 text-accent" />
                  <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Beat Demo — {demoBpm} BPM</span>
                </div>
                <button
                  onClick={() => togglePlay(genre.name)}
                  className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-medium transition-all border ${
                    isPlaying
                      ? 'bg-primary/15 border-primary/30 text-primary animate-pulse'
                      : 'bg-secondary/50 border-border hover:bg-secondary text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {isPlaying ? (
                    <>
                      <Square className="w-3.5 h-3.5 shrink-0" />
                      <span>Stop — Playing {genre.name} beat pattern</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 shrink-0" />
                      <span>▶ Play {genre.name} Beat Pattern</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredGenres.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Music className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p>No genres match "{search}"</p>
        </div>
      )}
    </div>
  );
};

export default GenreGuide;
