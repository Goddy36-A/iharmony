import { GENRES } from '@/lib/music-data';
import { Music, Clock, Gauge } from 'lucide-react';

const GenreGuide = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-slide-up">
      {GENRES.map(genre => (
        <div key={genre.name} className="glass rounded-xl p-5 space-y-4 hover:border-primary/30 transition-all">
          <h3 className="text-lg font-semibold text-foreground">{genre.name}</h3>

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

          <div>
            <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Key Artists</span>
            <p className="text-sm text-secondary-foreground mt-1">{genre.keyArtists.join(' · ')}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GenreGuide;
