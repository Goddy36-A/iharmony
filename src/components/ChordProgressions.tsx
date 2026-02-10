import { useState } from 'react';
import { ALL_NOTES, CHORD_PROGRESSIONS, getChordNotes, playChord, type ChordProgression } from '@/lib/music-data';
import { Play, Music } from 'lucide-react';

const ChordProgressions = () => {
  const [selectedKey, setSelectedKey] = useState('C');
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  const handlePlayProgression = async (progression: ChordProgression, progIndex: number) => {
    if (playingIndex !== null) return;
    setPlayingIndex(progIndex);

    for (let i = 0; i < progression.numerals.length; i++) {
      const notes = getChordNotes(selectedKey, progression.numerals[i], 4);
      if (notes.length) playChord(notes, 0.7);
      await new Promise(resolve => setTimeout(resolve, 600));
    }

    setPlayingIndex(null);
  };

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Key selector */}
      <div className="space-y-2">
        <label className="text-sm text-muted-foreground font-mono uppercase tracking-wider">Key</label>
        <div className="flex flex-wrap gap-1.5">
          {ALL_NOTES.map(note => (
            <button
              key={note}
              onClick={() => setSelectedKey(note)}
              className={`px-3 py-1.5 rounded-md text-sm font-mono transition-all ${
                selectedKey === note
                  ? 'bg-primary text-primary-foreground glow-primary'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {note}
            </button>
          ))}
        </div>
      </div>

      {/* Progressions grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CHORD_PROGRESSIONS.map((prog, i) => (
          <div key={prog.name} className="glass rounded-xl p-5 space-y-3 group hover:border-primary/30 transition-all">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-foreground">{prog.name}</h3>
                <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-accent/20 text-accent mt-1">
                  {prog.genre}
                </span>
              </div>
              <button
                onClick={() => handlePlayProgression(prog, i)}
                disabled={playingIndex !== null}
                className={`p-2.5 rounded-lg transition-all ${
                  playingIndex === i
                    ? 'bg-primary/30 text-primary animate-pulse-glow'
                    : 'bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground'
                }`}
              >
                <Play className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground">{prog.description}</p>
            <div className="flex flex-wrap gap-2">
              {prog.numerals.map((numeral, j) => (
                <span
                  key={j}
                  className="px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground font-mono text-sm"
                >
                  {numeral}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChordProgressions;
