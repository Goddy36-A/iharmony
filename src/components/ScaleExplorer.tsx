import { useState } from 'react';
import { ALL_NOTES, SCALES, getScaleNotes, getScaleNoteNames, playSequence } from '@/lib/music-data';
import PianoKeyboard from './PianoKeyboard';
import { Play, Sparkles } from 'lucide-react';

const ScaleExplorer = () => {
  const [selectedRoot, setSelectedRoot] = useState('C');
  const [selectedScale, setSelectedScale] = useState('Major');
  const [isPlaying, setIsPlaying] = useState(false);

  const scaleNoteNames = getScaleNoteNames(selectedRoot, selectedScale);
  const scaleInfo = SCALES[selectedScale];

  const handlePlayScale = async () => {
    if (isPlaying) return;
    setIsPlaying(true);
    const notes = getScaleNotes(selectedRoot, selectedScale, 4);
    // Add octave note at end
    const rootOctaveUp = `${selectedRoot}5`;
    await playSequence([...notes, rootOctaveUp], 250);
    setIsPlaying(false);
  };

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Controls */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground font-mono uppercase tracking-wider">Root Note</label>
          <div className="flex flex-wrap gap-1.5">
            {ALL_NOTES.map(note => (
              <button
                key={note}
                onClick={() => setSelectedRoot(note)}
                className={`px-3 py-1.5 rounded-md text-sm font-mono transition-all ${
                  selectedRoot === note
                    ? 'bg-primary text-primary-foreground glow-primary'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                {note}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm text-muted-foreground font-mono uppercase tracking-wider">Scale</label>
        <div className="flex flex-wrap gap-1.5">
          {Object.keys(SCALES).map(scale => (
            <button
              key={scale}
              onClick={() => setSelectedScale(scale)}
              className={`px-3 py-1.5 rounded-md text-sm transition-all ${
                selectedScale === scale
                  ? 'bg-primary text-primary-foreground glow-primary'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {scale}
            </button>
          ))}
        </div>
      </div>

      {/* Scale info */}
      <div className="glass rounded-xl p-5 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground">{selectedRoot} {selectedScale}</h3>
            <p className="font-mono text-primary text-sm mt-1">
              {scaleNoteNames.join(' — ')}
            </p>
          </div>
          <button
            onClick={handlePlayScale}
            disabled={isPlaying}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all shrink-0 ${
              isPlaying
                ? 'bg-primary/30 text-primary cursor-wait'
                : 'bg-primary text-primary-foreground hover:glow-primary'
            }`}
          >
            <Play className="w-4 h-4" />
            {isPlaying ? 'Playing...' : 'Play Scale'}
          </button>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">{scaleInfo?.description}</p>

        {scaleInfo && 'mood' in scaleInfo && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
            <div className="p-3 rounded-lg bg-secondary/50 border border-border/50">
              <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider block mb-1">🎭 Mood</span>
              <p className="text-foreground text-xs">{(scaleInfo as any).mood}</p>
            </div>
            <div className="p-3 rounded-lg bg-secondary/50 border border-border/50">
              <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider block mb-1">🎵 Used In</span>
              <p className="text-foreground text-xs">{(scaleInfo as any).usedIn}</p>
            </div>
            <div className="p-3 rounded-lg bg-secondary/50 border border-border/50">
              <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider block mb-1">👂 How to Hear It</span>
              <p className="text-foreground text-xs">{(scaleInfo as any).howToHear}</p>
            </div>
          </div>
        )}

        {scaleInfo && 'promptTip' in scaleInfo && (
          <div className="flex items-start gap-2 p-3 rounded-lg bg-primary/5 border border-primary/10">
            <Sparkles className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
            <p className="text-xs text-primary/90 font-mono">{(scaleInfo as any).promptTip}</p>
          </div>
        )}
      </div>

      {/* Piano */}
      <div className="glass rounded-xl p-4">
        <PianoKeyboard highlightedNotes={scaleNoteNames} />
      </div>
    </div>
  );
};

export default ScaleExplorer;
