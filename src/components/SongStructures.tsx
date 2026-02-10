import { useState } from 'react';
import { SONG_STRUCTURES, type SongStructure } from '@/lib/music-data';

const sectionColorMap: Record<string, string> = {
  primary: 'bg-primary/60 border-primary/40',
  secondary: 'bg-secondary border-secondary',
  accent: 'bg-accent/50 border-accent/40',
  muted: 'bg-muted border-muted-foreground/20',
  warm: 'bg-warm/40 border-warm/30',
};

const SongStructures = () => {
  const [selected, setSelected] = useState(0);
  const structure = SONG_STRUCTURES[selected];
  const totalBars = structure.sections.reduce((sum, s) => sum + s.bars, 0);

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Genre tabs */}
      <div className="flex flex-wrap gap-2">
        {SONG_STRUCTURES.map((s, i) => (
          <button
            key={s.name}
            onClick={() => setSelected(i)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selected === i
                ? 'bg-primary text-primary-foreground glow-primary'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>

      {/* Structure info */}
      <div className="glass rounded-xl p-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold">{structure.name}</h3>
          <span className="text-sm text-muted-foreground font-mono">{totalBars} bars total</span>
        </div>
        <p className="text-sm text-muted-foreground mb-5">{structure.description}</p>

        {/* Visual timeline */}
        <div className="flex gap-1 h-16 rounded-lg overflow-hidden mb-4">
          {structure.sections.map((section, i) => (
            <div
              key={i}
              className={`${sectionColorMap[section.color] || 'bg-muted'} border rounded flex items-center justify-center text-xs font-medium transition-all hover:brightness-125 cursor-default`}
              style={{ flex: section.bars }}
              title={`${section.name} (${section.bars} bars)`}
            >
              <span className="truncate px-1 text-foreground">{section.name}</span>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
          {structure.sections.map((section, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <div className={`w-3 h-3 rounded-sm ${sectionColorMap[section.color]}`} />
              <span>{section.name} ({section.bars})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SongStructures;
