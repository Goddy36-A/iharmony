import { useState } from 'react';
import { ALL_NOTES, SCALES, getScaleNotes, getScaleNoteNames, playSequence } from '@/lib/music-data';
import PianoKeyboard from './PianoKeyboard';
import { Play } from 'lucide-react';

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
      <div className="glass rounded-xl p-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{selectedRoot} {selectedScale}</h3>
          <p className="text-muted-foreground text-sm">{scaleInfo?.description}</p>
          <p className="font-mono text-primary text-sm mt-1">
            {scaleNoteNames.join(' — ')}
          </p>
        </div>
        <button
          onClick={handlePlayScale}
          disabled={isPlaying}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all ${
            isPlaying
              ? 'bg-primary/30 text-primary cursor-wait'
              : 'bg-primary text-primary-foreground hover:glow-primary'
          }`}
        >
          <Play className="w-4 h-4" />
          {isPlaying ? 'Playing...' : 'Play Scale'}
        </button>
      </div>

      {/* Piano */}
      <div className="glass rounded-xl p-4">
        <PianoKeyboard highlightedNotes={scaleNoteNames} />
      </div>
    </div>
  );
};

export default ScaleExplorer;
