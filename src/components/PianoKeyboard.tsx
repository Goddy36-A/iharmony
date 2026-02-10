import { useState, useCallback } from 'react';
import { ALL_NOTES, getScaleNoteNames, playNote } from '@/lib/music-data';

interface PianoKeyboardProps {
  highlightedNotes?: string[];
  startOctave?: number;
  octaves?: number;
  onNotePlay?: (note: string) => void;
}

const PianoKeyboard = ({ highlightedNotes = [], startOctave = 4, octaves = 2, onNotePlay }: PianoKeyboardProps) => {
  const [activeNote, setActiveNote] = useState<string | null>(null);

  const handleNoteClick = useCallback((note: string) => {
    setActiveNote(note);
    playNote(note, 0.5);
    onNotePlay?.(note);
    setTimeout(() => setActiveNote(null), 300);
  }, [onNotePlay]);

  const isBlackKey = (note: string) => note.includes('#');

  const getNoteName = (note: string) => note.replace(/\d/, '');

  const isHighlighted = (note: string) => {
    const noteName = getNoteName(note);
    return highlightedNotes.includes(noteName);
  };

  const keys: { note: string; fullNote: string }[] = [];
  for (let oct = startOctave; oct < startOctave + octaves; oct++) {
    ALL_NOTES.forEach(note => {
      keys.push({ note, fullNote: `${note}${oct}` });
    });
  }
  // Add the final C
  keys.push({ note: 'C', fullNote: `C${startOctave + octaves}` });

  const whiteKeys = keys.filter(k => !isBlackKey(k.note));
  const totalWhiteKeys = whiteKeys.length;

  return (
    <div className="relative select-none" style={{ height: '160px' }}>
      {/* White keys */}
      <div className="flex h-full gap-[2px]">
        {whiteKeys.map((key, i) => {
          const highlighted = isHighlighted(key.fullNote);
          const active = activeNote === key.fullNote;
          return (
            <button
              key={key.fullNote}
              className={`flex-1 relative flex items-end justify-center pb-2 text-xs font-mono transition-all duration-75 rounded-b-lg border border-border/30 ${
                active
                  ? 'piano-key-white-active'
                  : highlighted
                  ? 'bg-primary/30 hover:bg-primary/50 cursor-pointer'
                  : 'piano-key-white'
              }`}
              onClick={() => handleNoteClick(key.fullNote)}
            >
              <span className={`${highlighted || active ? 'text-primary-foreground font-semibold' : 'text-muted-foreground/50'}`}>
                {key.note}
              </span>
            </button>
          );
        })}
      </div>
      {/* Black keys */}
      <div className="absolute top-0 left-0 right-0 h-[60%] pointer-events-none">
        {keys.map((key, i) => {
          if (!isBlackKey(key.note)) return null;
          // Find position relative to white keys
          const whiteKeysBefore = keys.slice(0, i).filter(k => !isBlackKey(k.note)).length;
          const leftPercent = ((whiteKeysBefore - 0.3) / totalWhiteKeys) * 100;
          const widthPercent = (0.6 / totalWhiteKeys) * 100;

          const highlighted = isHighlighted(key.fullNote);
          const active = activeNote === key.fullNote;

          return (
            <button
              key={key.fullNote}
              className={`absolute h-full z-10 pointer-events-auto rounded-b-md transition-all duration-75 ${
                active
                  ? 'piano-key-black-active'
                  : highlighted
                  ? 'bg-primary/70 hover:bg-primary cursor-pointer'
                  : 'piano-key-black'
              }`}
              style={{ left: `${leftPercent}%`, width: `${widthPercent}%` }}
              onClick={() => handleNoteClick(key.fullNote)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PianoKeyboard;
